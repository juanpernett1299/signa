import type { Pais } from '../types/pais';
import apiClient from './api';

export const getPaises = (): Promise<Pais[]> => {
  return apiClient.get('/api/v1/paises/').then(response => response.data);
};