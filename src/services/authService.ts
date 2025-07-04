import type { LoginCredentials, AuthResponse, User, ApiError } from '../types/auth';
import { storage } from '../utils/storage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const USE_FAKE_API = import.meta.env.VITE_USE_FAKE_API === 'true';

// Comptes fake pour les tests
const FAKE_ACCOUNTS = [
  { username: 'admin', password: 'admin123', user: { id: '1', username: 'admin', email: 'admin@test.com', role: 'admin' } },
  { username: 'user', password: 'user123', user: { id: '2', username: 'user', email: 'user@test.com', role: 'user' } },
  { username: 'demo', password: 'demo123', user: { id: '3', username: 'demo', email: 'demo@test.com', role: 'demo' } },
  { username: 'test', password: 'password', user: { id: '4', username: 'test', email: 'test@test.com', role: 'user' } },
];

class AuthService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add token to requests if available
    const token = storage.getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Une erreur inattendue s\'est produite');
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Mode fake API pour les tests
    if (USE_FAKE_API || !API_BASE_URL.includes('http')) {
      return this.fakeLogin(credentials);
    }

    const response = await this.makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store tokens and user data
    storage.setToken(response.accessToken);
    if (response.refreshToken) {
      storage.setRefreshToken(response.refreshToken);
    }
    storage.setUser(response.user);

    return response;
  }

  private async fakeLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 800));

    const account = FAKE_ACCOUNTS.find(
      acc => acc.username === credentials.username && acc.password === credentials.password
    );

    if (!account) {
      throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
    }

    const fakeToken = `fake-jwt-token-${Date.now()}-${account.user.id}`;
    const response: AuthResponse = {
      user: account.user,
      accessToken: fakeToken,
      refreshToken: `fake-refresh-token-${Date.now()}`
    };

    // Store tokens and user data
    storage.setToken(response.accessToken);
    storage.setRefreshToken(response.refreshToken!);
    storage.setUser(response.user);

    return response;
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint if your API has one
      await this.makeRequest('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Always clear local storage
      storage.clearAuthData();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (USE_FAKE_API || !API_BASE_URL.includes('http')) {
      return this.fakeGetCurrentUser();
    }

    try {
      const user = await this.makeRequest<User>('/auth/me');
      storage.setUser(user);
      return user;
    } catch (error) {
      // If token is invalid, clear storage
      storage.clearAuthData();
      return null;
    }
  }

  private async fakeGetCurrentUser(): Promise<User | null> {
    const token = storage.getToken();
    const storedUser = storage.getUser();
    
    if (!token || !storedUser) {
      return null;
    }

    // Vérifier si le token fake est valide (simulation)
    if (token.startsWith('fake-jwt-token-')) {
      return storedUser;
    }

    return null;
  }

  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = storage.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await this.makeRequest<{ accessToken: string }>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });

      storage.setToken(response.accessToken);
      return response.accessToken;
    } catch (error) {
      storage.clearAuthData();
      return null;
    }
  }

  isAuthenticated(): boolean {
    return storage.hasToken();
  }

  getStoredUser(): User | null {
    return storage.getUser();
  }
}

export const authService = new AuthService();