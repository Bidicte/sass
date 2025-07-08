// ===== src/types/client.ts =====

export interface Client {
  id: string; // UUID de l'API
  nom: string;
  prenom?: string; // Optionnel pour business (pas de prénom)
  email: string;
  telephone: string;
  pays: string;
  adresse: string;
  ville?: string;
  typeCompte?: string;
  numCompte?: string;
  type: 'regulier' | 'business';
  
  // Champs spécifiques aux clients business
  raisonSociale?: string; // Pour les entreprises
  numFiscal?: string;     // Numéro fiscal
}

export interface ClientFormData {
  nom: string;
  prenom?: string; // Optionnel pour business
  email: string;
  telephone: string;
  pays: string;
  adresse: string;
  ville?: string;
  typeCompte?: string;
  numCompte?: string;
  type: 'regulier' | 'business';
  
  // Champs spécifiques aux clients business
  raisonSociale?: string;
  numFiscal?: string;
}

export interface ClientFilter {
  type: 'regulier' | 'business';
  search: string;
}

export interface ClientCounts {
  regulier: number;
  business: number;
  total: number;
}

// Interfaces pour les données brutes de l'API
export interface ClientReguliersApiData {
  idcltreg: string;
  nomcltreg: string;
  prenomcltreg: string;
  adressecltreg: string;
  emailcltreg: string;
  telcltreg: string;
  typecomptecltreg: string;
  villecltreg: string;
  payscltreg: string;
  numcomptcltreg: string;
}

export interface ClientBusinessApiData {
  idcltbusiness: string;
  raisoncltbusiness: string;      // Raison sociale
  adrcltbusiness: string;
  payscltbusiness: string;
  villecltbusiness: string;
  emailcltbusiness: string;
  telcltbusiness: string;
  numfisccltbusiness: string;     // Numéro fiscal
  numcomptcltbusiness: string;
  typecomptcltbusiness: string;
}