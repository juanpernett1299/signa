import apiClient from './api';
import type { ClaseNiza } from '../types/claseNiza';

export const getClasesNiza = (): Promise<ClaseNiza[]> => {
  return apiClient.get('/api/v1/clases_niza/').then(response => response.data);
};