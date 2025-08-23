import type { Pais } from '../types/pais';

// Simulación de llamada a servicio
export const getPaises = async (): Promise<Pais[]> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      "nombre": "Estados Unidos",
      "codigo_iso": "USA",
      "id": 1
    },
    {
      "nombre": "Alemania",
      "codigo_iso": "DEU",
      "id": 2
    },
    {
      "nombre": "Colombia",
      "codigo_iso": "COL",
      "id": 3
    }
  ];
};