// ===== src/components/clients/ClientsHeader.tsx =====
import React from 'react';
import { Plus } from 'lucide-react';
import type { Tab } from '../../types/common';
import { TabNavigation } from '../ui/TabNavigation';
import { SearchInput } from '../ui/SearchInput';
import { Button } from '../ui/Button';

interface ClientsHeaderProps {
  tabs: Tab[];
  activeTab: string;
  searchValue: string;
  onTabChange: (tabId: string) => void;
  onSearchChange: (value: string) => void;
  onAddClient: () => void;
  onRefresh?: () => void;
  loading?: boolean;
}

export const ClientsHeader: React.FC<ClientsHeaderProps> = ({
  tabs,
  activeTab,
  searchValue,
  onTabChange,
  onSearchChange,
  onAddClient
}) => {
  return (
    <div className="space-y-4">
      {/* En-tête avec titre et bouton d'ajout */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des clients
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez vos clients réguliers et business
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={onAddClient}
        >
          Ajouter
        </Button>
      </div>

      {/* Navigation par onglets */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      {/* Barre de recherche */}
      <div className="flex justify-end">
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Rechercher un client"
          className="w-80"
        />
      </div>
    </div>
  );
};