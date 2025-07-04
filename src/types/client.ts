// ===== src/types/client.ts =====

export interface ClientFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  pays: string;
  adresse: string;
  type: 'regulier' | 'business';
}

export interface Client extends ClientFormData {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

// Interface pour les réponses API
export interface ClientResponse {
  data: Client[];
  total: number;
  page: number;
  limit: number;
}

// Interface pour les erreurs API
export interface ClientError {
  message: string;
  field?: string;
  code?: string;
}