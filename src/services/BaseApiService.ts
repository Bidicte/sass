/* eslint-disable @typescript-eslint/no-explicit-any */
// ===== src/services/BaseApiService.ts =====

import { API_CONFIG, getAuthHeaders } from '../config/api';

export class BaseApiService {
  protected serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  protected async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    console.log(`🔗 [${this.serviceName}] Appel API:`, url);
    
    const config: RequestInit = {
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      console.log(`📡 [${this.serviceName}] Réponse:`, response.status, response.statusText);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          errorData.error || 
          `Erreur HTTP: ${response.status} ${response.statusText}`
        );
      }
      
      const data = await response.json();
      console.log(`📦 [${this.serviceName}] Données reçues:`, data);
      
      return data;
    } catch (error) {
      console.error(`❌ [${this.serviceName}] Erreur:`, error);
      throw error;
    }
  }

  protected async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  protected async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  protected async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}