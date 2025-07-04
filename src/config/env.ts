// ===== src/config/env.ts =====

// Interface pour typer la configuration
interface EnvironmentConfig {
  // Configuration API
  API_BASE_URL: string;
  
  // Configuration des clés de stockage
  TOKEN_KEY: string;
  USER_DATA_KEY: string;
  
  // Configuration de l'environnement
  APP_ENV: 'development' | 'staging' | 'production';
}

// Fonction utilitaire pour récupérer les variables d'environnement
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Variable d'environnement manquante: ${key}`);
  }
  return value;
};

// Configuration exportée avec valeurs par défaut
export const env: EnvironmentConfig = {
  // URL de base de l'API (JSON Server ou vraie API)
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000'),
  
  // Clés pour le stockage local
  TOKEN_KEY: getEnvVar('VITE_TOKEN_KEY', 'auth_token'),
  USER_DATA_KEY: getEnvVar('VITE_USER_DATA_KEY', 'user_data'),
  
  // Environnement d'exécution
  APP_ENV: getEnvVar('VITE_APP_ENV', 'development') as EnvironmentConfig['APP_ENV'],
};

// Fonction de validation de l'environnement
export const validateEnvironment = (): void => {
  // Variables requises
  const requiredVars = [
    'VITE_API_BASE_URL'
  ];

  // Vérifier les variables manquantes
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `❌ Variables d'environnement manquantes:\n${missingVars.join('\n')}\n\n` +
      '📋 Créez un fichier .env à la racine avec ces variables.'
    );
  }

  // Logs en développement
  if (env.APP_ENV === 'development') {
    console.log('🔧 Configuration d\'environnement:', {
      apiUrl: env.API_BASE_URL,
      environment: env.APP_ENV,
      tokenKey: env.TOKEN_KEY,
      userDataKey: env.USER_DATA_KEY
    });
  }

  // Validation de l'URL API
  try {
    new URL(env.API_BASE_URL);
  } catch {
    console.warn('⚠️ URL API potentiellement invalide:', env.API_BASE_URL);
  }
};

// ===== Version étendue pour une vraie API =====

interface ExtendedEnvironmentConfig extends EnvironmentConfig {
  // Endpoints API
  AUTH_LOGIN_ENDPOINT: string;
  AUTH_REFRESH_ENDPOINT: string;
  AUTH_LOGOUT_ENDPOINT: string;
  AUTH_PROFILE_ENDPOINT: string;
  
  // Configuration de sécurité
  TOKEN_EXPIRY_BUFFER: number;
  SESSION_TIMEOUT: number;
  MAX_LOGIN_ATTEMPTS: number;
  LOCKOUT_DURATION: number;
  
  // Configuration réseau
  API_TIMEOUT: number;
  
  // Fonctionnalités
  ENABLE_REMEMBER_ME: boolean;
}

const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = import.meta.env[key];
  const parsed = value ? parseInt(value, 10) : defaultValue;
  return isNaN(parsed) ? defaultValue : parsed;
};

const getEnvBoolean = (key: string, defaultValue: boolean): boolean => {
  const value = import.meta.env[key];
  return value ? value.toLowerCase() === 'true' : defaultValue;
};

// Configuration étendue pour production
export const extendedEnv: ExtendedEnvironmentConfig = {
  // Configuration de base
  ...env,
  
  // Endpoints API
  AUTH_LOGIN_ENDPOINT: getEnvVar('VITE_AUTH_LOGIN_ENDPOINT', '/auth/login'),
  AUTH_REFRESH_ENDPOINT: getEnvVar('VITE_AUTH_REFRESH_ENDPOINT', '/auth/refresh'),
  AUTH_LOGOUT_ENDPOINT: getEnvVar('VITE_AUTH_LOGOUT_ENDPOINT', '/auth/logout'),
  AUTH_PROFILE_ENDPOINT: getEnvVar('VITE_AUTH_PROFILE_ENDPOINT', '/auth/profile'),
  
  // Configuration de sécurité
  TOKEN_EXPIRY_BUFFER: getEnvNumber('VITE_TOKEN_EXPIRY_BUFFER', 300000), // 5 minutes
  SESSION_TIMEOUT: getEnvNumber('VITE_SESSION_TIMEOUT', 86400000), // 24 heures
  MAX_LOGIN_ATTEMPTS: getEnvNumber('VITE_MAX_LOGIN_ATTEMPTS', 5),
  LOCKOUT_DURATION: getEnvNumber('VITE_LOCKOUT_DURATION', 900000), // 15 minutes
  
  // Configuration réseau
  API_TIMEOUT: getEnvNumber('VITE_API_TIMEOUT', 10000), // 10 secondes
  
  // Fonctionnalités
  ENABLE_REMEMBER_ME: getEnvBoolean('VITE_ENABLE_REMEMBER_ME', true),
};