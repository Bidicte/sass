// ===== src/pages/Clients.tsx =====
import React, { useState } from 'react';
import { ClientsHeader } from '../components/clients/ClientsHeader';
import { ClientsTable } from '../components/clients/ClientsTable';
import { AddClientModal } from '../components/clients/AddClientModal';
import { EditClientModal } from '../components/clients/EditClientModal';
import { useClients } from '../hooks/useClients';
import { useSearch } from '../hooks/useSearch';
import type { Tab } from '../types/common';
import type { ClientFormData, Client } from '../types/client';

export const Clients: React.FC = () => {
  const {
    clients,
    filter,
    clientCounts,
    loading,
    error,
    setFilter,
    addClient,
    updateClient,
    deleteClient,
    refreshClients,
  } = useClients();

  const { searchValue, handleSearchChange } = useSearch();
  
  // États pour les modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Configuration des onglets
  const tabs: Tab[] = [
    {
      id: 'regulier',
      label: 'Clients réguliers',
      count: clientCounts.regulier
    },
    {
      id: 'business',
      label: 'Clients business',
      count: clientCounts.business
    }
  ];

  // Gestion du changement d'onglet
  const handleTabChange = (tabId: string) => {
    setFilter(prev => ({
      ...prev,
      type: tabId as 'regulier' | 'business'
    }));
  };

  // Gestion de la recherche
  const handleSearch = (value: string) => {
    handleSearchChange(value);
    setFilter(prev => ({
      ...prev,
      search: value
    }));
  };

  // Gestion de l'ajout de client
  const handleAddClient = async (clientData: ClientFormData) => {
    try {
      // S'assurer que le type correspond à l'onglet actuel
      const clientDataWithType = {
        ...clientData,
        type: filter.type
      };
      
      await addClient(clientDataWithType);
      setIsAddModalOpen(false);
      
      // Optionnel : afficher une notification de succès
      console.log('✅ Client ajouté avec succès');
      
      // Si vous avez un système de notifications, utilisez-le ici
      // showNotification('Client ajouté avec succès', 'success');
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout du client:', error);
      // Optionnel : afficher une notification d'erreur
      // showNotification('Erreur lors de l\'ajout du client', 'error');
    }
  };

  // Gestion de l'ouverture du modal d'édition
  const handleEditClient = (id: string) => { // Changé de number à string
    // Trouver le client à modifier
    const clientToEdit = clients.find(client => client.id === id);
    
    if (clientToEdit) {
      setSelectedClient(clientToEdit);
      setIsEditModalOpen(true);
    } else {
      console.error('Client non trouvé:', id);
      // Optionnel : afficher une notification d'erreur
      // showNotification('Client non trouvé', 'error');
    }
  };

  // Gestion de la modification de client
  const handleUpdateClient = async (id: string, clientData: ClientFormData) => {
    try {
      await updateClient(id, clientData); // Supprimé Number(id) car id est déjà string
      setIsEditModalOpen(false);
      setSelectedClient(null);
      
      // Optionnel : afficher une notification de succès
      console.log('✅ Client modifié avec succès');
      
      // Si vous avez un système de notifications, utilisez-le ici
      // showNotification('Client modifié avec succès', 'success');
      
    } catch (error) {
      console.error('❌ Erreur lors de la modification du client:', error);
      // Optionnel : afficher une notification d'erreur
      // showNotification('Erreur lors de la modification du client', 'error');
    }
  };

  // Gestion de la fermeture du modal d'édition
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedClient(null);
  };

  // Gestion de la suppression de client
  const handleDeleteClient = async (id: string) => { // Changé de number à string
    // Trouver le client à supprimer pour afficher son nom dans la confirmation
    const clientToDelete = clients.find(client => client.id === id);
    const clientName = clientToDelete 
      ? `${clientToDelete.prenom} ${clientToDelete.nom}` 
      : 'ce client';

    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${clientName} ?\n\nCette action est irréversible.`)) {
      try {
        await deleteClient(id);
        
        // Optionnel : afficher une notification de succès
        console.log('✅ Client supprimé avec succès');
        
        // Si vous avez un système de notifications, utilisez-le ici
        // showNotification('Client supprimé avec succès', 'success');
        
      } catch (error) {
        console.error('❌ Erreur lors de la suppression du client:', error);
        // Optionnel : afficher une notification d'erreur
        // showNotification('Erreur lors de la suppression du client', 'error');
      }
    }
  };

  // Gestion du rafraîchissement
  const handleRefresh = () => {
    refreshClients();
  };

  // Affichage de l'état de chargement
  if (loading && clients.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">
          🔄 Chargement des clients...
        </div>
      </div>
    );
  }

  // Affichage des erreurs
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="text-red-600 text-xl">❌</div>
            <div>
              <h3 className="text-lg font-medium text-red-800">
                Erreur de chargement
              </h3>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            🔄 Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ClientsHeader
        tabs={tabs}
        activeTab={filter.type}
        searchValue={searchValue}
        onTabChange={handleTabChange}
        onSearchChange={handleSearch}
        onAddClient={() => setIsAddModalOpen(true)}
        onRefresh={handleRefresh} // Ajout du bouton refresh si votre header le supporte
        loading={loading}
      />

      <ClientsTable
        clients={clients}
        onEdit={handleEditClient}
        onDelete={handleDeleteClient}
        loading={loading}
      />

      {/* Modal d'ajout */}
      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddClient}
        clientType={filter.type} // Passer le type actuel au modal
      />

      {/* Modal de modification */}
      <EditClientModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdateClient}
        client={selectedClient}
      />

      {/* Indicateur de chargement pour les opérations */}
      {loading && clients.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          🔄 Opération en cours...
        </div>
      )}
    </div>
  );
};