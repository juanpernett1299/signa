import type { Pais } from '../types/pais';
import apiClient from './api';

export const getPaises = (): Promise<Pais[]> => {
  return apiClient.get('/paises/').then(response => response.data);
};