import { useState, useEffect } from 'react';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Stack } from '@mui/material';
import { MarcasTable } from '../components/organisms/MarcasTable';
import { FiltersBar } from '../components/organisms/FiltersBar';
import { getMarcasPaginadas, deleteMarca } from '../services/marcaService';
import { getClasesNiza } from '../services/claseNizaService';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import { FormButton } from '../components/atoms/FormButton';
import { ConfirmationDialog } from '../components/atoms/ConfirmationDialog';
import type { Marca, MarcaPaginationResponse, MarcaFilterParams } from '../types/marca';
import type { ClaseNiza } from '../types/claseNiza';
import { useSnackbar } from '../hooks/useSnackbar';

export const HomeView = () => {
  const navigate = useNavigate();
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [clasesNiza, setClasesNiza] = useState<ClaseNiza[]>([]);
  const [filters, setFilters] = useState<MarcaFilterParams>({});
  const [paginationData, setPaginationData] = useState<{
    total: number;
    page: number;
    limit: number;
  }>({
    total: 0,
    page: 1,
    limit: 10
  });
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [marcaToDelete, setMarcaToDelete] = useState<number | null>(null);

  const loadMarcas = (page: number = 1, limit: number = 10) => {
    setLoading(true);
    getMarcasPaginadas(page - 1, limit, filters)
      .then((response: MarcaPaginationResponse) => {
        setMarcas(response.items);
        setPaginationData({
          total: response.total,
          page: page,
          limit: response.limit
        });
      })
      .catch(() => {
        showSnackbar('Error al cargar las marcas', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadClasesNiza = () => {
    getClasesNiza()
      .then(clases => {
        setClasesNiza(clases);
      })
      .catch(() => {
        showSnackbar('Error al cargar datos de Clases Niza', 'error');
      });
  };

  useEffect(() => {
    loadClasesNiza();
  }, []);

  useEffect(() => {
    loadMarcas(1, paginationData.limit);
  }, [filters]);

  const handlePageChange = (page: number) => {
    loadMarcas(page, paginationData.limit);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    loadMarcas(1, itemsPerPage);
  };

  const handleFiltersChange = (newFilters: MarcaFilterParams) => {
    setFilters(newFilters);
  };

  const handleDeleteRequest = (id: number) => {
    setMarcaToDelete(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (marcaToDelete === null) return;

    deleteMarca(marcaToDelete)
      .then(() => {
        showSnackbar('Marca eliminada exitosamente', 'success');
        loadMarcas(paginationData.page, paginationData.limit);
      })
      .catch((error) => {
        showSnackbar(error.response.data.detail || 'Error al eliminar la marca', 'error');
      })
      .finally(() => {
        setMarcaToDelete(null);
        setDialogOpen(false);
      });
  };

  const handleCancelDelete = () => {
    setMarcaToDelete(null);
    setDialogOpen(false);
  };

  const totalPages = Math.ceil(paginationData.total / paginationData.limit);

  const handleCreateMarca = () => {
    navigate('/marcas/crear');
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 1, sm: 2, md: 3 } }}>
      <Stack spacing={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', 
                mb: 1,
                fontWeight: 600
              }}
            >
              Marcas
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#888888'
              }}
            >
              Gestiona y visualiza el registro de marcas
            </Typography>
          </Box>
          <FormButton
            onClick={handleCreateMarca}
          >
            <Add sx={{ mr: 1, fontSize: '1rem' }} />
            Nueva Marca
          </FormButton>
        </Box>
        
        <FiltersBar onFiltersChange={handleFiltersChange} />
        
        {loading ? (
          <LoadingSpinner 
            message="Cargando marcas..." 
            fullHeight={true}
          />
        ) : (
          <MarcasTable 
            marcas={marcas}
            clasesNiza={clasesNiza}
            currentPage={paginationData.page}
            totalPages={totalPages}
            totalItems={paginationData.total}
            itemsPerPage={paginationData.limit}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            onDelete={handleDeleteRequest}
          />
        )}
      </Stack>
      <ConfirmationDialog
        open={dialogOpen}
        title="Confirmar Eliminación"
        content="¿Estás seguro de que deseas eliminar esta marca? Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Container>
  );
};