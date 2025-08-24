import api from './api';
import type { Marca, MarcaFilterParams, MarcaCreate, MarcaUpdate, MarcaPaginationResponse } from '../types/marca';

export const getMarcasPaginadas = async (
  page: number, 
  limit: number, 
  filters: MarcaFilterParams = {}
): Promise<MarcaPaginationResponse> => {
  try {
    const params: { [key: string]: any } = {
      skip: page * limit,
      limit,
    };

    const hasFilters = Object.values(filters).some(value => value !== undefined && value !== null && value !== '');
    if (hasFilters) {
      params.filters = JSON.stringify(filters);
    }

    const response = await api.get(`/api/v1/marcas/`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching marcas:', error);
    throw error;
  }
};

export const getMarcaById = (id: number): Promise<Marca | null> => {
  return api.get(`/api/v1/marcas/${id}`).then(response => response.data);
};

export const createMarca = (marcaData: MarcaCreate): Promise<Marca> => {
  return api.post('/api/v1/marcas/', marcaData).then(response => response.data);
};

export const updateMarca = (id: number, marcaData: MarcaUpdate): Promise<Marca> => {
  return api.put(`/api/v1/marcas/${id}`, marcaData).then(response => response.data);
};

export const deleteMarca = (id: number): Promise<void> => {
  return api.delete(`/api/v1/marcas/${id}`).then(response => response.data);
};