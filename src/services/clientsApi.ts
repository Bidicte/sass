/* eslint-disable @typescript-eslint/no-explicit-any */
// services/apiService.js

// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_CLIENT_URL || 'http://localhost:3001/api';

// Headers par défaut
const defaultHeaders = {
  'Content-Type': 'application/json',
  // Ajoute ici ton token d'authentification si nécessaire
  // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
};

// Fonction utilitaire pour gérer les réponses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
  }
  return response.json();
};

// Service API réel
export const apiService = {
  // Récupérer tous les clients
  async getClients() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/clientinfo`, {
        method: 'GET',
        headers: defaultHeaders,
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
      throw error;
    }
  },

  // Récupérer un client par ID
  async getClientById(id: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
        method: 'GET',
        headers: defaultHeaders,
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la récupération du client:', error);
      throw error;
    }
  },

  // Créer un nouveau client
  async createClient(clientData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/clients`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(clientData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la création du client:', error);
      throw error;
    }
  },

  // Mettre à jour un client
  async updateClient(id: any, clientData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(clientData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client:', error);
      throw error;
    }
  },

  // Supprimer un client
  async deleteClient(id: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
        method: 'DELETE',
        headers: defaultHeaders,
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression du client:', error);
      throw error;
    }
  },

  // Rechercher des clients
  async searchClients(query: string, type = null) {
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (type) params.append('type', type);

      const response = await fetch(`${API_BASE_URL}/clients/search?${params}`, {
        method: 'GET',
        headers: defaultHeaders,
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la recherche de clients:', error);
      throw error;
    }
  },

  // Récupérer les clients par type
  async getClientsByType(type: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/clients?type=${type}`, {
        method: 'GET',
        headers: defaultHeaders,
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des clients par type:', error);
      throw error;
    }
  }
};

// Service Mock pour les tests
export const mockApiService = {
  // Données de test
  clients: [
    {
      id: 1,
      nom: "De la gloire",
      prenoms: "Paul",
      email: "paul@gmail.com",
      telephone: "0000000000",
      pays: "Côte d'Ivoire",
      adresse: "Abidjan, Angré",
      type: "regulier",
      dateCreation: "2024-01-15",
      entreprise: null
    },
    {
      id: 2,
      nom: "Kouassi",
      prenoms: "Marie",
      email: "marie.kouassi@business.com",
      telephone: "0101010101",
      pays: "Côte d'Ivoire",
      adresse: "Abidjan, Cocody",
      type: "business",
      dateCreation: "2024-02-20",
      entreprise: "TechCorp"
    },
    {
      id: 3,
      nom: "Bamba",
      prenoms: "Jean",
      email: "jean.bamba@email.com",
      telephone: "0202020202",
      pays: "Côte d'Ivoire",
      adresse: "Yamoussoukro, Centre",
      type: "regulier",
      dateCreation: "2024-03-10",
      entreprise: null
    }
  ],

  async getClients() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([...this.clients]);
      }, 500);
    });
  },

  async getClientById(id: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const client = this.clients.find(c => c.id === parseInt(id));
        if (client) {
          resolve({ ...client });
        } else {
          reject(new Error('Client non trouvé'));
        }
      }, 300);
    });
  },

  async createClient(clientData: any) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newClient = {
          ...clientData,
          id: Math.max(...this.clients.map(c => c.id)) + 1,
          dateCreation: new Date().toISOString().split('T')[0]
        };
        this.clients.push(newClient);
        resolve({ ...newClient });
      }, 400);
    });
  },

  async updateClient(id: string, clientData: { id: number; nom: string; prenoms: string; email: string; telephone: string; pays: string; adresse: string; type: string; dateCreation: string; entreprise: null; } | { id: number; nom: string; prenoms: string; email: string; telephone: string; pays: string; adresse: string; type: string; dateCreation: string; entreprise: string; }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.clients.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
          this.clients[index] = { ...this.clients[index], ...clientData };
          resolve({ ...this.clients[index] });
        } else {
          reject(new Error('Client non trouvé'));
        }
      }, 400);
    });
  },

  async deleteClient(id: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.clients.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
          this.clients.splice(index, 1);
          resolve({ success: true });
        } else {
          reject(new Error('Client non trouvé'));
        }
      }, 300);
    });
  },

  async searchClients(query: string, type = null) {
    return new Promise(resolve => {
      setTimeout(() => {
        const filtered = this.clients.filter(client => {
          const matchesQuery = !query || 
            client.nom.toLowerCase().includes(query.toLowerCase()) ||
            client.prenoms.toLowerCase().includes(query.toLowerCase()) ||
            client.email.toLowerCase().includes(query.toLowerCase()) ||
            client.telephone.includes(query);
          
          const matchesType = !type || client.type === type;
          
          return matchesQuery && matchesType;
        });
        resolve([...filtered]);
      }, 300);
    });
  },

  async getClientsByType(type: string) {
    return new Promise(resolve => {
      setTimeout(() => {
        const filtered = this.clients.filter(client => client.type === type);
        resolve([...filtered]);
      }, 300);
    });
  }
};

// Choix du service à utiliser (mock ou réel)
const USE_MOCK_API = import.meta.env.REACT_APP_USE_MOCK === 'true' || false;

export const clientService = USE_MOCK_API ? mockApiService : apiService;

// Configuration pour basculer entre mock et API réelle
export const setApiMode = (useMock = false) => {
  if (useMock) {
    return mockApiService;
  }
  return apiService;
};