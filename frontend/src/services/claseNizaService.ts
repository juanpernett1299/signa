import type { ClaseNiza } from '../types/claseNiza';

// Simulación de llamada a servicio
export const getClasesNiza = async (): Promise<ClaseNiza[]> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      "codigo": "25",
      "descripcion": "Prendas de vestir, calzado y sombrerería",
      "id": 1
    },
    {
      "codigo": "30",
      "descripcion": "Productos alimenticios, café, té, cacao",
      "id": 2
    },
    {
      "codigo": "32",
      "descripcion": "Bebidas no alcohólicas y cervezas",
      "id": 3
    }
  ];
};