import { EstadoMarca } from './estadoMarca';

// Tipo para el objeto Marca completo (respuesta de la API)
export interface Marca {
  id: number;
  nombre: string;
  titular: string;
  descripcion: string;
  logo_url: string;
  clase_niza_id: number;
  pais_id: number;
  estado: EstadoMarca;
  fecha_registro: string;
}

// Tipo para el objeto de Paginación (respuesta de la API)
export interface MarcaPaginationResponse {
  items: Marca[];
  total: number;
  page: number;
  limit: number;
}

// Tipo para crear una nueva marca (payload de la petición POST)
// Omitimos 'id' y 'fecha_registro' que son generados por el backend
export type MarcaCreate = Omit<Marca, 'id' | 'fecha_registro'>;

// Tipo para actualizar una marca (payload de la petición PUT)
// Hacemos todos los campos opcionales
export type MarcaUpdate = Partial<MarcaCreate>;