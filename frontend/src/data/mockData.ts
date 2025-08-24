import type { Marca } from '../types/marca';
import { EstadoMarca } from '../types/marca';

export const mockMarcas: Marca[] = [
  {
    id: 1,
    logo: 'https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    marca: 'TechFlow',
    titular: 'Innovaciones Digitales S.A.',
    estado: EstadoMarca.OTORGADA,
    fechaRegistro: '2024-01-15',
    claseNiza: 'Clase 42 - Servicios tecnológicos'
  },
  {
    id: 2,
    logo: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    marca: 'EcoVerde',
    titular: 'Productos Naturales Ltda.',
    estado: EstadoMarca.EXAMEN_FORMAL,
    fechaRegistro: '2024-02-20',
    claseNiza: 'Clase 3 - Cosméticos y productos de limpieza'
  },
  {
    id: 3,
    logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    marca: 'FastDelivery',
    titular: 'Logística Express Corp.',
    estado: EstadoMarca.PUBLICACION_GACETA,
    fechaRegistro: '2024-03-10',
    claseNiza: 'Clase 39 - Servicios de transporte'
  },
  {
    id: 4,
    logo: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    marca: 'HealthPlus',
    titular: 'Medicina Integral S.A.S.',
    estado: EstadoMarca.OPOSICIONES,
    fechaRegistro: '2024-01-05',
    claseNiza: 'Clase 44 - Servicios médicos'
  },
  {
    id: 5,
    logo: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    marca: 'StyleWear',
    titular: 'Moda Contemporánea Ltda.',
    estado: EstadoMarca.SOLICITUD_PRESENTADA,
    fechaRegistro: '2024-03-25',
    claseNiza: 'Clase 25 - Prendas de vestir'
  }
];