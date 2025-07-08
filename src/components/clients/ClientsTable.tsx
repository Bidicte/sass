// ===== src/components/clients/ClientsTable.tsx =====
import React from 'react';
import type { Client } from '../../types/client';
import { ClientRow } from './ClientRow';

interface ClientsTableProps {
  clients: Client[];
  onEdit: (id: string) => void;    // string au lieu de number
  onDelete: (id: string) => void;  // string au lieu de number
  loading?: boolean;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  onEdit,
  onDelete
}) => {
  const headers = [
    { key: '#', label: '#' },
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénoms' },
    { key: 'email', label: 'Email' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'pays', label: 'Pays' },
    { key: 'adresse', label: 'Adresse' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {clients.length > 0 ? (
              clients.map((client, index) => (
                <ClientRow
                  key={client.id}
                  client={client}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Aucun client trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
