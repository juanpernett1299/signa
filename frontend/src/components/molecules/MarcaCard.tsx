import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Marca } from '../../types/marca';
import type { ClaseNiza } from '../../types/claseNiza';
import type { MarcaWizardData } from '../organisms/MarcaWizard';
import { Logo } from '../atoms/Logo';
import { StatusChip } from '../atoms/StatusChip';
import { ActionButton } from '../atoms/ActionButton';

interface MarcaCardProps {
  marca: Marca;
  clasesNiza: ClaseNiza[];
}

export const MarcaCard = ({ marca, clasesNiza }: MarcaCardProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Convertir datos de marca a formato del wizard
    const editData: MarcaWizardData = {
      marca: {
        nombre: marca.nombre,
        descripcion: marca.descripcion,
        paisId: marca.pais_id.toString(),
        claseNizaId: marca.clase_niza_id.toString(),
        logoUrl: marca.logo_url,
        estado: marca.estado
      },
      titular: {
        nombre: marca.titular
      }
    };
    
    navigate(`/marcas/edit/${marca.id}`, { state: { editData } });
  };

  const handleView = () => {
    // Convertir datos de marca a formato del wizard para visualización
    const viewData: MarcaWizardData = {
      marca: {
        nombre: marca.nombre,
        descripcion: marca.descripcion,
        paisId: marca.pais_id.toString(),
        claseNizaId: marca.clase_niza_id.toString(),
        logoUrl: marca.logo_url,
        estado: marca.estado
      },
      titular: {
        nombre: marca.titular
      }
    };
    
    navigate(`/marcas/${marca.id}`, { state: { viewData } });
  };

  const getClaseNizaLabel = () => {
    const clase = clasesNiza.find(c => c.id === marca.clase_niza_id);
    return clase ? `Clase ${clase.codigo} - ${clase.descripcion}` : `Clase ${marca.clase_niza_id}`;
  };
  return (
    <Card
      sx={{
        bgcolor: '#111111',
        border: '1px solid #333333',
        borderRadius: 2,
        transition: 'all 0.3s ease-in-out',
        boxShadow: 'none',
        '&:hover': {
          bgcolor: '#1a1a1a',
          border: '1px solid #444444'
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          {/* Header con logo y acciones */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Logo src={marca.logo_url} alt={marca.nombre} size={50} />
            <Stack direction="row" spacing={1}>
              <ActionButton
                icon={<Visibility fontSize="small" />}
                tooltip="Ver detalles"
                onClick={handleView}
              />
              <ActionButton
                icon={<Edit fontSize="small" />}
                tooltip="Editar marca"
                onClick={handleEdit}
              />
            </Stack>
          </Box>

          {/* Información principal */}
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1, fontSize: '1.125rem' }}>
              {marca.nombre}
            </Typography>
            <Typography variant="body2" sx={{ color: '#cccccc', mb: 2, fontSize: '0.875rem' }}>
              {marca.titular}
            </Typography>
            <StatusChip estado={marca.estado} />
          </Box>

          {/* Información adicional */}
          <Stack spacing={1}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption" sx={{ color: '#888888', fontSize: '0.75rem' }}>
                ID:
              </Typography>
              <Typography variant="caption" sx={{ color: '#cccccc', fontSize: '0.75rem' }}>
                #{marca.id}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption" sx={{ color: '#888888', fontSize: '0.75rem' }}>
                Fecha:
              </Typography>
              <Typography variant="caption" sx={{ color: '#cccccc', fontSize: '0.75rem' }}>
                {new Date(marca.fecha_registro).toLocaleDateString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#888888', fontSize: '0.75rem' }}>
                Clase Niza:
              </Typography>
              <Typography variant="caption" sx={{ color: '#cccccc', display: 'block', fontSize: '0.75rem' }}>
                {getClaseNizaLabel()}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};