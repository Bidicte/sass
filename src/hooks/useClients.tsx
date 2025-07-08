// ===== src/hooks/useClients.ts =====

import { useState, useEffect, useMemo } from 'react';
import { clientsReguliersService, clientsBusinessService } from '../services';
import type { Client, ClientFormData, ClientFilter, ClientCounts } from '../types/client';

export const useClients = () => {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState<ClientFilter>({
    type: 'regulier',
    search: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Chargement initial des clients
  useEffect(() => {
    loadClients();
  }, []);

  // Fonction pour charger TOUS les clients (reguliers + business)
  const loadClients = async () => {
    setLoading(true);
    setError(null);
    
    console.log('🔄 Chargement de tous les clients...');
    
    try {
      // Charger les deux types en parallèle
      const [reguliers, business] = await Promise.allSettled([
        clientsReguliersService.getAll(),
        clientsBusinessService.getAll()
      ]);

      const allLoadedClients: Client[] = [];
      
      // Ajouter les clients reguliers
      if (reguliers.status === 'fulfilled') {
        allLoadedClients.push(...reguliers.value);
        console.log('✅ Clients reguliers chargés:', reguliers.value.length);
      } else {
        console.error('❌ Erreur clients reguliers:', reguliers.reason);
      }
      
      // Ajouter les clients business
      if (business.status === 'fulfilled') {
        allLoadedClients.push(...business.value);
        console.log('✅ Clients business chargés:', business.value.length);
      } else {
        console.warn('⚠️ Pas de clients business ou erreur:', business.reason);
      }

      console.log('📊 Total clients chargés:', allLoadedClients.length);
      setAllClients(allLoadedClients);
      
      if (allLoadedClients.length === 0) {
        console.warn('⚠️ Aucun client trouvé dans les deux APIs');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des clients';
      setError(errorMessage);
      console.error('❌ Erreur générale de chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clients filtrés selon le type et la recherche
  const clients = useMemo(() => {
    console.log('🔍 Filtrage des clients...', { 
      total: allClients.length, 
      filterType: filter.type, 
      searchTerm: filter.search 
    });
    
    const filtered = allClients.filter(client => {
      const matchesType = client.type === filter.type;
      const matchesSearch = filter.search === '' || 
        client.nom?.toLowerCase().includes(filter.search.toLowerCase()) ||
        client.prenom?.toLowerCase().includes(filter.search.toLowerCase()) ||
        client.email?.toLowerCase().includes(filter.search.toLowerCase()) ||
        client.telephone?.includes(filter.search) ||
        client.raisonSociale?.toLowerCase().includes(filter.search.toLowerCase()) ||
        client.numFiscal?.includes(filter.search);
      
      return matchesType && matchesSearch;
    });
    
    console.log('📋 Clients après filtrage:', filtered.length);
    return filtered;
  }, [allClients, filter]);

  // Compteurs de clients par type
  const clientCounts = useMemo((): ClientCounts => {
    const regulier = allClients.filter(c => c.type === 'regulier').length;
    const business = allClients.filter(c => c.type === 'business').length;
    
    const counts = {
      regulier,
      business,
      total: regulier + business
    };
    
    console.log('📊 Compteurs mis à jour:', counts);
    return counts;
  }, [allClients]);

  // Fonction pour ajouter un client
  const addClient = async (clientData: ClientFormData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('➕ Ajout client type:', clientData.type);
      
      let newClient: Client;
      if (clientData.type === 'business') {
        newClient = await clientsBusinessService.create(clientData);
      } else {
        newClient = await clientsReguliersService.create(clientData);
      }
      
      // Mise à jour optimiste de l'état local
      setAllClients(prev => [...prev, newClient]);
      console.log('✅ Client ajouté avec succès:', newClient.id);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'ajout du client';
      setError(errorMessage);
      console.error('❌ Erreur d\'ajout:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour modifier un client
  const updateClient = async (id: string, clientData: ClientFormData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('✏️ Modification client:', id, 'type:', clientData.type);
      
      let updatedClient: Client;
      if (clientData.type === 'business') {
        updatedClient = await clientsBusinessService.update(id, clientData);
      } else {
        updatedClient = await clientsReguliersService.update(id, clientData);
      }
      
      // Mise à jour optimiste de l'état local
      setAllClients(prev => 
        prev.map(client => 
          client.id === id ? updatedClient : client
        )
      );
      console.log('✅ Client modifié avec succès:', id);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la modification du client';
      setError(errorMessage);
      console.error('❌ Erreur de modification:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un client
  const deleteClient = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Trouver le type de client pour utiliser la bonne API
      const client = allClients.find(c => c.id === id);
      if (!client) {
        throw new Error('Client non trouvé');
      }
      
      console.log('🗑️ Suppression client:', id, 'type:', client.type);
      
      if (client.type === 'business') {
        await clientsBusinessService.delete(id);
      } else {
        await clientsReguliersService.delete(id);
      }
      
      // Mise à jour optimiste de l'état local
      setAllClients(prev => prev.filter(c => c.id !== id));
      console.log('✅ Client supprimé avec succès:', id);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression du client';
      setError(errorMessage);
      console.error('❌ Erreur de suppression:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour recharger les clients
  const refreshClients = () => {
    console.log('🔄 Rechargement demandé');
    loadClients();
  };

  // Fonction pour obtenir un client par ID
  const getClientById = async (id: string): Promise<Client | null> => {
    try {
      const client = allClients.find(c => c.id === id);
      if (!client) {
        console.log('Client non trouvé dans le cache, recherche via API...');
        
        // Essayer d'abord l'API reguliers, puis business
        try {
          return await clientsReguliersService.getById(id);
        } catch {
          return await clientsBusinessService.getById(id);
        }
      }
      return client;
    } catch (err) {
      console.error('Erreur lors de la récupération du client:', err);
      return null;
    }
  };

  return {
    clients,              // Clients filtrés selon le type et la recherche
    allClients,          // Tous les clients (reguliers + business)
    filter,              // Filtre actuel
    clientCounts,        // Compteurs par type
    loading,             // État de chargement
    error,               // Erreur éventuelle
    setFilter,           // Fonction pour changer le filtre
    addClient,           // Ajouter un client
    updateClient,        // Modifier un client
    deleteClient,        // Supprimer un client
    refreshClients,      // Recharger tous les clients
    getClientById        // Récupérer un client par ID
  };
};