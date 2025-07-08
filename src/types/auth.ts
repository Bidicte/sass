// types/auth.ts
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

// Interface pour les données envoyées à l'API
export interface LoginRequest {
  client: string;      // "chkci" en dur
  username: string;
  Password: string;    // Avec majuscule selon votre API
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}