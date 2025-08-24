import { TableRow, TableCell, Stack } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Marca } from '../../types/marca';
import type { ClaseNiza } from '../../types/claseNiza';
import type { MarcaWizardData } from '../organisms/MarcaWizard';
import { Logo } from '../atoms/Logo';
import { StatusChip } from '../atoms/StatusChip';
import { ActionButton } from '../atoms/ActionButton';

interface MarcaTableRowProps {
  marca: Marca;
  clasesNiza: ClaseNiza[];
}

export const MarcaTableRow = ({ marca, clasesNiza }: MarcaTableRowProps) => {
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
    <TableRow
      sx={{
        '&:hover': {
          bgcolor: '#1a1a1a',
        },
        '& td': {
          borderBottom: '1px solid #333333',
          color: '#ffffff',
          py: 2
        }
      }}
    >
      <TableCell sx={{ color: '#888888', fontSize: '0.875rem' }}>
        #{marca.id}
      </TableCell>
      <TableCell>
        <Logo src={marca.logo_url} alt={marca.nombre} />
      </TableCell>
      <TableCell sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
        {marca.nombre}
      </TableCell>
      <TableCell sx={{ color: '#cccccc', fontSize: '0.875rem' }}>
        {marca.titular}
      </TableCell>
      <TableCell>
        <StatusChip estado={marca.estado} />
      </TableCell>
      <TableCell sx={{ color: '#888888', fontSize: '0.875rem' }}>
        {new Date(marca.fecha_registro).toLocaleDateString()}
      </TableCell>
      <TableCell sx={{ color: '#888888', fontSize: '0.875rem' }}>
        {getClaseNizaLabel()}
      </TableCell>
      <TableCell>
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
      </TableCell>
    </TableRow>
  );
};