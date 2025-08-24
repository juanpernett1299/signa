import { Chip } from '@mui/material';
import { EstadoMarca, estadoLabels } from '../../types/marca';

interface StatusChipProps {
  estado: EstadoMarca;
}

const getStatusColor = (estado: EstadoMarca) => {
  switch (estado) {
    case EstadoMarca.OTORGADA:
      return { 
        bgcolor: '#0f5132', 
        color: '#00ff88'
      };
    case EstadoMarca.EXAMEN_FORMAL:
      return { 
        bgcolor: '#664d03', 
        color: '#ffda6a'
      };
    case EstadoMarca.EXAMEN_FONDO:
      return { 
        bgcolor: '#0c4a6e', 
        color: '#7dd3fc'
      };
    case EstadoMarca.PUBLICACION_GACETA:
      return { 
        bgcolor: '#031633', 
        color: '#6ea8fe'
      };
    case EstadoMarca.OPOSICIONES:
      return { 
        bgcolor: '#653208', 
        color: '#fd7e14'
      };
    case EstadoMarca.RENOVACION:
      return { 
        bgcolor: '#59256e', 
        color: '#d63384'
      };
    default:
      return { 
        bgcolor: '#495057', 
        color: '#adb5bd'
      };
  }
};

export const StatusChip = ({ estado }: StatusChipProps) => {
  const statusStyle = getStatusColor(estado);
  
  return (
    <Chip
      label={estadoLabels[estado]}
      size="small"
      sx={{
        ...statusStyle,
        fontWeight: 500,
        fontSize: '0.75rem',
        height: 24,
        border: 'none'
      }}
    />
  );
};