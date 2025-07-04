// ===== src/data/mockData.ts (Mise à jour) =====
// ===== src/data/mockData.ts (Mise à jour) =====
import type { SalesData, DashboardStats, MenuItem } from '../types';
import { 
  Grid3X3, 
  Calendar, 
  CheckSquare,  
} from 'lucide-react';

export const salesData: SalesData[] = [
  { month: 'Jan', value: 150 },
  { month: 'Feb', value: 380 },
  { month: 'Mar', value: 200 },
  { month: 'Apr', value: 280 },
  { month: 'May', value: 180 },
  { month: 'Jun', value: 190 },
  { month: 'Jul', value: 280 },
  { month: 'Aug', value: 200 },
  { month: 'Sep', value: 380 },
  { month: 'Oct', value: 260 },
];

export const dashboardStats: DashboardStats = {
  customers: 3782,
  customerChange: 11.01,
  orders: 5359,
  orderChange: -9.05,
  monthlyTarget: 75.55,
  targetPercentage: 75.55,
  dailyEarnings: 3287
};

export const menuItems: MenuItem[] = [
  {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Grid3X3,
      path: '/',
      hasSubmenu: false
  },
  { 
    id: 'exploitations', 
    label: 'Exploitations', 
    icon: CheckSquare, 
    path: '/exploitations', 
    hasSubmenu: true,
    submenuItems: [
      { id: 'all-tasks', label: 'planning hebergement', path: '/tasks' },
      { id: 'completed', label: 'suivi hebergement', path: '/tasks/completed' }
    ]
  },
    { 
    id: 'clients', 
    label: 'Clients', 
    icon: Calendar, 
    path: '/dashboard/clients', 
    hasSubmenu: false 
  },
//   { 
//     id: 'calendar', 
//     label: 'Calendar', 
//     icon: Calendar, 
//     path: '/calendar', 
//     hasSubmenu: false 
//   },
//   { 
//     id: 'profile', 
//     label: 'User Profile', 
//     icon: UserIcon, 
//     path: '/profile', 
//     hasSubmenu: false 
//   },
//   { 
//     id: 'task', 
//     label: 'Task', 
//     icon: CheckSquare, 
//     path: '/tasks', 
//     hasSubmenu: true,
//     submenuItems: [
//       { id: 'all-tasks', label: 'All Tasks', path: '/tasks' },
//       { id: 'completed', label: 'Completed', path: '/tasks/completed' }
//     ]
//   },
//   { 
//     id: 'forms', 
//     label: 'Forms', 
//     icon: FileText, 
//     path: '/forms', 
//     hasSubmenu: true,
//     submenuItems: [
//       { id: 'form-builder', label: 'Form Builder', path: '/forms/builder' },
//       { id: 'form-validation', label: 'Validation', path: '/forms/validation' }
//     ]
//   },
//   { 
//     id: 'tables', 
//     label: 'Tables', 
//     icon: Table, 
//     path: '/tables', 
//     hasSubmenu: true,
//     submenuItems: [
//       { id: 'data-table', label: 'Data Table', path: '/tables/data' },
//       { id: 'responsive-table', label: 'Responsive', path: '/tables/responsive' }
//     ]
//   },
];
