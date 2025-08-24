import { TableRow, TableCell, Stack } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Marca } from '../../types/marca';
import type { ClaseNiza } from '../../types/claseNiza';
import type { MarcaFormData } from '../organisms/MarcaWizard';
import { Logo } from '../atoms/Logo';
import { StatusChip } from '../atoms/StatusChip';
import { ActionButton } from '../atoms/ActionButton';

interface MarcaTableRowProps {
  marca: Marca;
  clasesNiza: ClaseNiza[];
  onDelete: (id: number) => void;
}

export const MarcaTableRow = ({ marca, clasesNiza, onDelete }: MarcaTableRowProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Convertir datos de marca a formato del wizard
    const editData: MarcaFormData = {
      nombre: marca.nombre,
      descripcion: marca.descripcion,
      pais_id: marca.pais_id.toString(),
      clase_niza_id: marca.clase_niza_id.toString(),
      logo_url: marca.logo_url,
      estado: marca.estado,
      titular: marca.titular
    };
    
    navigate(`/marcas/edit/${marca.id}`, { state: { editData } });
  };

  const handleView = () => {
    // Convertir datos de marca a formato del wizard para visualización
    const viewData: MarcaFormData = {
      nombre: marca.nombre,
      descripcion: marca.descripcion,
      pais_id: marca.pais_id.toString(),
      clase_niza_id: marca.clase_niza_id.toString(),
      logo_url: marca.logo_url,
      estado: marca.estado,
      titular: marca.titular
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
          <ActionButton
            icon={<Delete fontSize="small" />}
            tooltip="Eliminar marca"
            onClick={() => onDelete(marca.id)}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
};