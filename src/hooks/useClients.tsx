// ===== src/hooks/useClients.ts =====
import { useState, useEffect, useMemo } from 'react';
import type { Client, ClientFormData } from '../types/client';

interface ClientFilter {
  type: 'regulier' | 'business';
  search: string;
}

interface ClientCounts {
  regulier: number;
  business: number;
  total: number;
}

export const useClients = () => {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState<ClientFilter>({
    type: 'regulier',
    search: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Chargement initial des clients (vous pouvez remplacer par un appel API)
  useEffect(() => {
    loadClients();
  }, []);

  // Fonction pour charger les clients
  const loadClients = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulations de données - remplacez par votre appel API
      const mockClients: Client[] = [
        {
          id: 1,
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@email.com',
          telephone: '+225 01 02 03 04 05',
          pays: 'Côte d\'ivoire',
          adresse: 'Abidjan, Cocody',
          type: 'regulier'
        },
        {
          id: 2,
          nom: 'Martin',
          prenom: 'Sophie',
          email: 'sophie.martin@business.com',
          telephone: '+225 06 07 08 09 10',
          pays: 'Côte d\'ivoire',
          adresse: 'Abidjan, Plateau',
          type: 'business'
        }
      ];
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAllClients(mockClients);
    } catch (err) {
      setError('Erreur lors du chargement des clients');
      console.error('Erreur de chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clients filtrés selon le type et la recherche
  const clients = useMemo(() => {
    return allClients.filter(client => {
      const matchesType = client.type === filter.type;
      const matchesSearch = filter.search === '' || 
        client.nom.toLowerCase().includes(filter.search.toLowerCase()) ||
        client.prenom.toLowerCase().includes(filter.search.toLowerCase()) ||
        client.email.toLowerCase().includes(filter.search.toLowerCase()) ||
        client.telephone.includes(filter.search);
      
      return matchesType && matchesSearch;
    });
  }, [allClients, filter]);

  // Compteurs de clients par type
  const clientCounts = useMemo((): ClientCounts => {
    const regulier = allClients.filter(c => c.type === 'regulier').length;
    const business = allClients.filter(c => c.type === 'business').length;
    
    return {
      regulier,
      business,
      total: regulier + business
    };
  }, [allClients]);

  // Fonction pour ajouter un client
  const addClient = async (clientData: ClientFormData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simuler un appel API
      const newClient: Client = {
        id: Math.max(...allClients.map(c => c.id), 0) + 1,
        ...clientData
      };
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setAllClients(prev => [...prev, newClient]);
      
      // Ici vous feriez votre appel API réel :
      // const response = await clientsApi.create(clientData);
      // setAllClients(prev => [...prev, response.data]);
      
    } catch (err) {
      setError('Erreur lors de l\'ajout du client');
      console.error('Erreur d\'ajout:', err);
      throw err; // Re-throw pour que le composant puisse gérer l'erreur
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour modifier un client
  const updateClient = async (id: number, clientData: ClientFormData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setAllClients(prev => 
        prev.map(client => 
          client.id === id 
            ? { ...client, ...clientData }
            : client
        )
      );
      
      // Ici vous feriez votre appel API réel :
      // const response = await clientsApi.update(id, clientData);
      // setAllClients(prev => 
      //   prev.map(client => 
      //     client.id === id ? response.data : client
      //   )
      // );
      
    } catch (err) {
      setError('Erreur lors de la modification du client');
      console.error('Erreur de modification:', err);
      throw err; // Re-throw pour que le composant puisse gérer l'erreur
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un client
  const deleteClient = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setAllClients(prev => prev.filter(client => client.id !== id));
      
      // Ici vous feriez votre appel API réel :
      // await clientsApi.delete(id);
      
    } catch (err) {
      setError('Erreur lors de la suppression du client');
      console.error('Erreur de suppression:', err);
      throw err; // Re-throw pour que le composant puisse gérer l'erreur
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour recharger les clients
  const refreshClients = () => {
    loadClients();
  };

  return {
    clients,
    allClients,
    filter,
    clientCounts,
    loading,
    error,
    setFilter,
    addClient,
    updateClient,
    deleteClient,
    refreshClients
  };
};