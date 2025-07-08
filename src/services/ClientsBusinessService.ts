// ===== src/services/ClientsBusinessService.ts =====

import { BaseApiService } from './BaseApiService';
import { API_CONFIG } from '../config/api';
import type { Client, ClientFormData, ClientBusinessApiData } from '../types/client';

export class ClientsBusinessService extends BaseApiService {
  constructor() {
    super('BUSINESS');
  }

  // Transformer les données API vers Client
  private transformApiToClient(apiClient: ClientBusinessApiData): Client {
    return {
      id: apiClient.idcltbusiness,
      nom: apiClient.raisoncltbusiness,    // La raison sociale devient le "nom"
      prenom: undefined,                   // Pas de prénom pour les entreprises
      email: apiClient.emailcltbusiness,
      telephone: apiClient.telcltbusiness,
      pays: apiClient.payscltbusiness,
      adresse: apiClient.adrcltbusiness,
      ville: apiClient.villecltbusiness,
      typeCompte: apiClient.typecomptcltbusiness,
      numCompte: apiClient.numcomptcltbusiness,
      raisonSociale: apiClient.raisoncltbusiness, // Champ spécifique business
      numFiscal: apiClient.numfisccltbusiness,    // Champ spécifique business
      type: 'business' as const
    };
  }

  // Transformer Client vers données API
  private transformClientToApi(client: ClientFormData): Omit<ClientBusinessApiData, 'idcltbusiness'> {
    return {
      raisoncltbusiness: client.raisonSociale || client.nom, // Utiliser raisonSociale ou nom
      adrcltbusiness: client.adresse,
      payscltbusiness: client.pays,
      villecltbusiness: client.ville || '',
      emailcltbusiness: client.email,
      telcltbusiness: client.telephone,
      numfisccltbusiness: client.numFiscal || '',
      numcomptcltbusiness: client.numCompte || '',
      typecomptcltbusiness: client.typeCompte || ''
    };
  }

  async getAll(): Promise<Client[]> {
    try {
      const data = await this.get<ClientBusinessApiData[]>(
        API_CONFIG.ENDPOINTS.CLIENTS_BUSINESS.ALL
      );
      
      return Array.isArray(data) ? data.map(client => this.transformApiToClient(client)) : [];
    } catch (error) {
      console.warn('Endpoint business non disponible ou vide:', error);
      return []; // Retourne un tableau vide si l'endpoint n'existe pas encore
    }
  }

  async getById(id: string): Promise<Client> {
    try {
      const response = await this.get<ClientBusinessApiData>(
        API_CONFIG.ENDPOINTS.CLIENTS_BUSINESS.BY_ID(id)
      );
      
      return this.transformApiToClient(response);
    } catch (error) {
      console.error(`Erreur lors de la récupération du client business ${id}:`, error);
      throw error;
    }
  }

  async create(clientData: ClientFormData): Promise<Client> {
    try {
      const apiData = this.transformClientToApi(clientData);
      const response = await this.post<ClientBusinessApiData>(
        API_CONFIG.ENDPOINTS.CLIENTS_BUSINESS.ADD,
        apiData
      );
      
      return this.transformApiToClient(response);
    } catch (error) {
      console.error('Erreur lors de la création du client business:', error);
      throw error;
    }
  }

  async update(id: string, clientData: ClientFormData): Promise<Client> {
    try {
      const apiData = this.transformClientToApi(clientData);
      const response = await this.put<ClientBusinessApiData>(
        API_CONFIG.ENDPOINTS.CLIENTS_BUSINESS.UPDATE(id),
        apiData
      );
      
      return this.transformApiToClient(response);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du client business ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.delete(API_CONFIG.ENDPOINTS.CLIENTS_BUSINESS.DELETE(id));
    } catch (error) {
      console.error(`Erreur lors de la suppression du client business ${id}:`, error);
      throw error;
    }
  }
}