import apiClient from './api';
import type { MarcaPaginationResponse, Marca } from '../types/marca';
import type { MarcaCreate, MarcaUpdate } from '../types/marca';

export const getMarcas = (page: number = 0, limit: number = 10): Promise<MarcaPaginationResponse> => {
  return apiClient.get('/api/v1/marcas/', {
    params: {
      skip: page * limit,
      limit: limit,
    },
  }).then(response => response.data);
};

export const getMarcaById = (id: number): Promise<Marca | null> => {
  return apiClient.get(`/api/v1/marcas/${id}`).then(response => response.data);
};

export const createMarca = (marcaData: MarcaCreate): Promise<Marca> => {
  return apiClient.post('/api/v1/marcas/', marcaData).then(response => response.data);
};

export const updateMarca = (id: number, marcaData: MarcaUpdate): Promise<Marca> => {
  return apiClient.put(`/api/v1/marcas/${id}`, marcaData).then(response => response.data);
};

export const deleteMarca = (id: number): Promise<void> => {
  return apiClient.delete(`/api/v1/marcas/${id}`).then(response => response.data);
};