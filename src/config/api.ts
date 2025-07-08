// ===== src/config/api.ts =====

// Configuration de l'API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_CLIENT_URL || 'http://localhost:3001',
  ENDPOINTS: {
    CLIENTS_REGULIERS: {
      ALL: '/clients-reguliers/all',
      BY_ID: (id: string) => `/clients-reguliers/${id}`,
      ADD: '/clients-reguliers/add',
      UPDATE: (id: string) => `/clients-reguliers/update/${id}`,
      DELETE: (id: string) => `/clients-reguliers/delete/${id}`,
    },
    CLIENTS_BUSINESS: {
      ALL: '/clients-business/all',
      BY_ID: (id: string) => `/clients-business/${id}`,
      ADD: '/clients-business/add',
      UPDATE: (id: string) => `/clients-business/update/${id}`,
      DELETE: (id: string) => `/clients-business/delete/${id}`,
    }
  }
};

// Headers par défaut
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  // Ajoutez ici d'autres headers globaux si nécessaire
};

// Fonction pour obtenir les headers avec authentification (si nécessaire)
export const getAuthHeaders = () => {
  // Remplacez par votre logique d'authentification
  // const token = localStorage.getItem('authToken');
  return {
    ...DEFAULT_HEADERS,
    // 'Authorization': token ? `Bearer ${token}` : '',
  };
};