// ===== src/services/index.ts =====

import { ClientsBusinessService } from './ClientsBusinessService';
import { ClientsReguliersService } from './ClientsReguliersService';

export { BaseApiService } from './BaseApiService';
export { ClientsReguliersService } from './ClientsReguliersService';
export { ClientsBusinessService } from './ClientsBusinessService';

// Instances pré-configurées pour faciliter l'utilisation
export const clientsReguliersService = new ClientsReguliersService();
export const clientsBusinessService = new ClientsBusinessService();