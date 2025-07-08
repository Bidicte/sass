// ===== src/services/ClientsReguliersService.ts =====

import { BaseApiService } from './BaseApiService';
import { API_CONFIG } from '../config/api';
import type { Client, ClientFormData, ClientReguliersApiData } from '../types/client';

export class ClientsReguliersService extends BaseApiService {
  constructor() {
    super('REGULIERS');
  }

  // Transformer les données API vers Client
  private transformApiToClient(apiClient: ClientReguliersApiData): Client {
    return {
      id: apiClient.idcltreg,
      nom: apiClient.nomcltreg,
      prenom: apiClient.prenomcltreg,
      email: apiClient.emailcltreg,
      telephone: apiClient.telcltreg,
      pays: apiClient.payscltreg,
      adresse: apiClient.adressecltreg,
      ville: apiClient.villecltreg,
      typeCompte: apiClient.typecomptecltreg,
      numCompte: apiClient.numcomptcltreg,
      type: 'regulier' as const
    };
  }

  // Transformer Client vers données API
  private transformClientToApi(client: ClientFormData): Omit<ClientReguliersApiData, 'idcltreg'> {
    return {
      nomcltreg: client.nom,
      prenomcltreg: client.prenom,
      emailcltreg: client.email,
      telcltreg: client.telephone,
      payscltreg: client.pays,
      adressecltreg: client.adresse,
      villecltreg: client.ville || '',
      typecomptecltreg: client.typeCompte || '',
      numcomptcltreg: client.numCompte || ''
    };
  }

  async getAll(): Promise<Client[]> {
    try {
      const data = await this.get<ClientReguliersApiData[]>(
        API_CONFIG.ENDPOINTS.CLIENTS_REGULIERS.ALL
      );
      
      return Array.isArray(data) ? data.map(client => this.transformApiToClient(client)) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des clients reguliers:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Client> {
    try {
      const response = await this.get<ClientReguliersApiData>(
        API_CONFIG.ENDPOINTS.CLIENTS_REGULIERS.BY_ID(id)
      );
      
      return this.transformApiToClient(response);
    } catch (error) {
      console.error(`Erreur lors de la récupération du client regulier ${id}:`, error);
      throw error;
    }
  }

  async create(clientData: ClientFormData): Promise<Client> {
    try {
      const apiData = this.transformClientToApi(clientData);
      const response = await this.post<ClientReguliersApiData>(
        API_CONFIG.ENDPOINTS.CLIENTS_REGULIERS.ADD,
        apiData
      );
      
      return this.transformApiToClient(response);
    } catch (error) {
      console.error('Erreur lors de la création du client regulier:', error);
      throw error;
    }
  }

  async update(id: string, clientData: ClientFormData): Promise<Client> {
    try {
      const apiData = this.transformClientToApi(clientData);
      const response = await this.put<ClientReguliersApiData>(
        API_CONFIG.ENDPOINTS.CLIENTS_REGULIERS.UPDATE(id),
        apiData
      );
      
      return this.transformApiToClient(response);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du client regulier ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.delete(API_CONFIG.ENDPOINTS.CLIENTS_REGULIERS.DELETE(id));
    } catch (error) {
      console.error(`Erreur lors de la suppression du client regulier ${id}:`, error);
      throw error;
    }
  }
}