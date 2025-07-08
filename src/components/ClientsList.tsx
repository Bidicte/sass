// ===== src/components/ClientsList.tsx =====
// Exemple d'utilisation du hook useClients

import React from 'react';
import { useClients } from '../hooks/useClients';

export const ClientsList: React.FC = () => {
  const {
    clients,
    clientCounts,
    filter,
    loading,
    error,
    setFilter,
    addClient,
    updateClient,
    deleteClient,
    refreshClients
  } = useClients();

  // Gestion du changement de type de client
  const handleTypeChange = (type: 'regulier' | 'business') => {
    setFilter(prev => ({ ...prev, type }));
  };

  // Gestion de la recherche
  const handleSearchChange = (search: string) => {
    setFilter(prev => ({ ...prev, search }));
  };

  if (loading) {
    return <div>Chargement des clients...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Erreur: {error}</p>
        <button onClick={refreshClients}>Réessayer</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Gestion des Clients</h1>
      
      {/* Compteurs */}
      <div>
        <p>Total: {clientCounts.total}</p>
        <p>Reguliers: {clientCounts.regulier}</p>
        <p>Business: {clientCounts.business}</p>
      </div>

      {/* Filtres */}
      <div>
        <button 
          onClick={() => handleTypeChange('regulier')}
          style={{ 
            backgroundColor: filter.type === 'regulier' ? '#007bff' : '#6c757d' 
          }}
        >
          Clients Reguliers ({clientCounts.regulier})
        </button>
        <button 
          onClick={() => handleTypeChange('business')}
          style={{ 
            backgroundColor: filter.type === 'business' ? '#007bff' : '#6c757d' 
          }}
        >
          Clients Business ({clientCounts.business})
        </button>
      </div>

      {/* Recherche */}
      <div>
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={filter.search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div>
        <button onClick={refreshClients}>Actualiser</button>
        <button onClick={() => {
          // Exemple d'ajout de client
          const newClient = {
            nom: 'Test',
            prenom: 'Client',
            email: 'test@example.com',
            telephone: '+225 01 02 03 04 05',
            pays: 'Côte d\'Ivoire',
            adresse: 'Abidjan',
            type: filter.type as 'regulier' | 'business'
          };
          addClient(newClient);
        }}>
          Ajouter un client {filter.type}
        </button>
      </div>

      {/* Liste des clients */}
      <div>
        <h2>
          Clients {filter.type} 
          {filter.search && ` (recherche: "${filter.search}")`}
        </h2>
        
        {clients.length === 0 ? (
          <p>Aucun client trouvé</p>
        ) : (
          <ul>
            {clients.map(client => (
              <li key={client.id} style={{ 
                border: '1px solid #ddd', 
                margin: '10px 0', 
                padding: '10px',
                borderRadius: '5px'
              }}>
                <div>
                  <strong>{client.prenom} {client.nom}</strong>
                  <span style={{ 
                    marginLeft: '10px', 
                    padding: '2px 6px', 
                    backgroundColor: client.type === 'regulier' ? '#28a745' : '#007bff',
                    color: 'white',
                    borderRadius: '3px',
                    fontSize: '12px'
                  }}>
                    {client.type}
                  </span>
                </div>
                <div>📧 {client.email}</div>
                <div>📞 {client.telephone}</div>
                <div>📍 {client.adresse}, {client.ville}, {client.pays}</div>
                {client.typeCompte && (
                  <div>🏦 Type compte: {client.typeCompte}</div>
                )}
                {client.numCompte && (
                  <div>🔢 N° compte: {client.numCompte}</div>
                )}
                
                <div style={{ marginTop: '10px' }}>
                  <button 
                    onClick={() => {
                      // Exemple de modification
                      const updatedData = {
                        ...client,
                        nom: client.nom + ' (modifié)'
                      };
                      updateClient(client.id, updatedData);
                    }}
                    style={{ 
                      marginRight: '5px',
                      backgroundColor: '#ffc107',
                      color: 'black',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    Modifier
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
                        deleteClient(client.id);
                      }
                    }}
                    style={{ 
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};