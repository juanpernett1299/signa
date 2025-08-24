export enum EstadoMarca {
  SOLICITUD_PRESENTADA = 'solicitud_presentada',
  EXAMEN_FORMAL = 'examen_formal',
  EXAMEN_FONDO = 'examen_fondo',
  PUBLICACION_GACETA = 'publicacion_gaceta',
  OPOSICIONES = 'oposiciones',
  OTORGADA = 'otorgada',
  RENOVACION = 'renovacion'
}

export const estadoLabels: Record<EstadoMarca, string> = {
  [EstadoMarca.SOLICITUD_PRESENTADA]: 'Solicitud Presentada',
  [EstadoMarca.EXAMEN_FORMAL]: 'Examen Formal',
  [EstadoMarca.EXAMEN_FONDO]: 'Examen de Fondo',
  [EstadoMarca.PUBLICACION_GACETA]: 'Publicación Gaceta',
  [EstadoMarca.OPOSICIONES]: 'Oposiciones',
  [EstadoMarca.OTORGADA]: 'Otorgada',
  [EstadoMarca.RENOVACION]: 'Renovación'
};
