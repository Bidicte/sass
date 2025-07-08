// ===== src/components/clients/ClientActions.tsx =====
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface ClientActionsProps {
  clientId: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ClientActions: React.FC<ClientActionsProps> = ({
  clientId,
  onEdit,
  onDelete
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onEdit(clientId)}
        className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        title="Modifier"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => onDelete(clientId)}
        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        title="Supprimer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
