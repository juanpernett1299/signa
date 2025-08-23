import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material';
import type { Marca } from '../../types/marca';
import type { ClaseNiza } from '../../types/claseNiza';
import { MarcaTableRow } from '../molecules/MarcaTableRow';
import { MarcaCard } from '../molecules/MarcaCard';
import { PaginationComponent } from '../atoms/PaginationComponent';

interface MarcasTableProps {
  marcas: Marca[];
  clasesNiza: ClaseNiza[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const MarcasTable = ({ 
  marcas, 
  clasesNiza,
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange 
}: MarcasTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {marcas.map((marca) => (
            <MarcaCard key={marca.id} marca={marca} clasesNiza={clasesNiza} />
          ))}
        </Box>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: '#111111',
          border: '1px solid #333333',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 'none'
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  bgcolor: '#111111',
                  color: 'white',
                  fontWeight: 600,
                  borderBottom: '1px solid #333333',
                  fontSize: '0.875rem',
                  py: 2
                }
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Titular</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha Registro</TableCell>
              <TableCell>Clase Niza</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marcas.map((marca) => (
              <MarcaTableRow key={marca.id} marca={marca} clasesNiza={clasesNiza} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </Box>
  );
};