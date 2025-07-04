// ===== src/components/clients/ClientRow.tsx =====
import React from 'react';
import type { Client } from '../../types/client';
import { ClientActions } from './ClientActions';

interface ClientRowProps {
  client: Client;
  index: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ClientRow: React.FC<ClientRowProps> = ({
  client,
  index,
  onEdit,
  onDelete
}) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
        {client.nom}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {client.prenom}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 underline">
        <a href={`mailto:${client.email}`}>{client.email}</a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {client.telephone}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {client.pays}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {client.adresse}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        <ClientActions
          clientId={client.id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};