import type { Marca, MarcaPaginationResponse } from '../types/marca';
import { EstadoMarca } from '../types/marca';

// Simulación de llamada a servicio con paginación
export const getMarcas = async (page: number = 0, limit: number = 100): Promise<MarcaPaginationResponse> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Datos simulados expandidos para demostrar paginación
  const allMarcas: Marca[] = [
    {
      nombre: "Nike",
      titular: "Nike Inc.",
      descripcion: "Marca deportiva global",
      logo_url: "https://cdn.brandfetch.io/nike.com/w/399/h/399?c=1idspRmuJ6ovry8dTTI",
      clase_niza_id: 1,
      pais_id: 1,
      estado: EstadoMarca.SOLICITUD_PRESENTADA,
      id: 1,
      fecha_registro: "2025-08-21T22:53:24.478197"
    },
    {
      nombre: "Adidas",
      titular: "Adidas AG",
      descripcion: "Ropa y calzado deportivo",
      logo_url: "https://cdn.brandfetch.io/adidas.com/w/400/h/400?c=1idspRmuJ6ovry8dTTI",
      clase_niza_id: 1,
      pais_id: 2,
      estado: EstadoMarca.OTORGADA,
      id: 2,
      fecha_registro: "2025-08-21T22:53:24.478197"
    },
    {
      nombre: "Coca-Cola",
      titular: "The Coca-Cola Company",
      descripcion: "Bebidas gaseosas",
      logo_url: "https://cdn.brandfetch.io/postobon.com/w/400/h/400?c=1idspRmuJ6ovry8dTTI",
      clase_niza_id: 3,
      pais_id: 1,
      estado: EstadoMarca.OPOSICIONES,
      id: 3,
      fecha_registro: "2025-08-21T22:53:24.478197"
    },
    {
      nombre: "McDonald's",
      titular: "McDonald's Corporation",
      descripcion: "Cadena de restaurantes de comida rápida",
      logo_url: "https://cdn.brandfetch.io/mcdonalds.com/w/400/h/400?c=1idspRmuJ6ovry8dTTI",
      clase_niza_id: 2,
      pais_id: 1,
      estado: EstadoMarca.EXAMEN_FORMAL,
      id: 4,
      fecha_registro: "2025-08-21T22:53:24.478197"
    },
    {
      nombre: "Apple",
      titular: "Apple Inc.",
      descripcion: "Tecnología y dispositivos electrónicos",
      logo_url: "https://cdn.brandfetch.io/apple.com/w/400/h/400?c=1idspRmuJ6ovry8dTTI",
      clase_niza_id: 1,
      pais_id: 1,
      estado: EstadoMarca.PUBLICACION_GACETA,
      id: 5,
      fecha_registro: "2025-08-21T22:53:24.478197"
    },
    {
      nombre: "Samsung",
      titular: "Samsung Electronics Co., Ltd.",
      descripcion: "Electrónicos y tecnología",
      logo_url: "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      clase_niza_id: 1,
      pais_id: 3,
      estado: EstadoMarca.EXAMEN_FONDO,
      id: 6,
      fecha_registro: "2025-08-20T22:53:24.478197"
    },
    {
      nombre: "Microsoft",
      titular: "Microsoft Corporation",
      descripcion: "Software y servicios tecnológicos",
      logo_url: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      clase_niza_id: 1,
      pais_id: 1,
      estado: EstadoMarca.RENOVACION,
      id: 7,
      fecha_registro: "2025-08-19T22:53:24.478197"
    },
    {
      nombre: "Google",
      titular: "Google LLC",
      descripcion: "Servicios de internet y tecnología",
      logo_url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      clase_niza_id: 1,
      pais_id: 1,
      estado: EstadoMarca.OTORGADA,
      id: 8,
      fecha_registro: "2025-08-18T22:53:24.478197"
    },
    {
      nombre: "Amazon",
      titular: "Amazon.com, Inc.",
      descripcion: "Comercio electrónico y servicios en la nube",
      logo_url: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      clase_niza_id: 2,
      pais_id: 1,
      estado: EstadoMarca.SOLICITUD_PRESENTADA,
      id: 9,
      fecha_registro: "2025-08-17T22:53:24.478197"
    },
    {
      nombre: "Tesla",
      titular: "Tesla, Inc.",
      descripcion: "Vehículos eléctricos y energía sostenible",
      logo_url: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      clase_niza_id: 1,
      pais_id: 1,
      estado: EstadoMarca.EXAMEN_FORMAL,
      id: 10,
      fecha_registro: "2025-08-16T22:53:24.478197"
    }
  ];

  // Simular paginación
  const startIndex = page * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = allMarcas.slice(startIndex, endIndex);

  const mockData: MarcaPaginationResponse = {
    items: paginatedItems,
    total: allMarcas.length,
    page,
    limit
  };

  return mockData;
};

// Función para obtener una marca específica por ID
export const getMarcaById = async (id: number): Promise<Marca | null> => {
  const response = await getMarcas(0, 100); // Obtener todas para buscar por ID
  return response.items.find(marca => marca.id === id) || null;
};