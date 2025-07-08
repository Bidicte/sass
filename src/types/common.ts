/* eslint-disable @typescript-eslint/no-explicit-any */
// ===== src/types/common.ts =====
export interface Tab {
  id: string;
  label: string;
  count?: number;
}

export interface ActionButton {
  icon: React.ComponentType<any>;
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
}