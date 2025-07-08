/* eslint-disable react-refresh/only-export-components */
// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginCredentials, AuthContextType } from '../types/auth';
import { authService } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const initializeAuth = () => {
      console.log('🔄 Initialisation de l\'authentification...');
      
      try {
        const storedUser = authService.getUser();
        const token = authService.getToken();
        
        if (storedUser && token) {
          setUser(storedUser);
          console.log('✅ Utilisateur restauré:', storedUser.username);
        } else {
          console.log('ℹ️ Aucune session existante');
        }
      } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    console.log('🔑 Tentative de connexion pour:', credentials.username);
    setIsLoading(true);
    
    try {
      const result = await authService.login(credentials);
      setUser(result.user);
      console.log('✅ Connexion réussie - utilisateur connecté:', result.user.username);
    } catch (error) {
      console.error('❌ Échec de la connexion:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    console.log('🚪 Déconnexion en cours...');
    setIsLoading(true);
    
    try {
      authService.logout();
      setUser(null);
      console.log('✅ Déconnexion terminée');
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    console.log('📧 Demande de réinitialisation pour:', email);
    await authService.forgotPassword(email);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    forgotPassword,
    isLoading,
    isAuthenticated: !!user,
  };

  // Debug du state en temps réel
  useEffect(() => {
    console.log('🔄 État auth modifié:', {
      user: user?.username || 'non connecté',
      isLoading,
      isAuthenticated: !!user
    });
  }, [user, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};