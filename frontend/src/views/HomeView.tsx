import { useState, useEffect } from 'react';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Stack } from '@mui/material';
import { MarcasTable } from '../components/organisms/MarcasTable';
import { getMarcas } from '../services/marcaService';
import { getClasesNiza } from '../services/claseNizaService';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import { FormButton } from '../components/atoms/FormButton';
import type { Marca, MarcaPaginationResponse } from '../types/marca';
import type { ClaseNiza } from '../types/claseNiza';

export const HomeView = () => {
  const navigate = useNavigate();
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [clasesNiza, setClasesNiza] = useState<ClaseNiza[]>([]);
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
  const [error, setError] = useState<string | null>(null);

  const loadMarcas = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMarcas(page - 1, limit); // API usa 0-based indexing
      setMarcas(response.items);
      setPaginationData({
        total: response.total,
        page: page,
        limit: response.limit
      });
    } catch (err) {
      setError('Error al cargar las marcas');
      console.error('Error loading marcas:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadClasesNiza = async () => {
    try {
      const clases = await getClasesNiza();
      setClasesNiza(clases);
    } catch (err) {
      console.error('Error loading clases niza:', err);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([
        loadMarcas(paginationData.page, paginationData.limit),
        loadClasesNiza()
      ]);
    };
    
    loadInitialData();
  }, []);

  const handlePageChange = (page: number) => {
    loadMarcas(page, paginationData.limit);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    loadMarcas(1, itemsPerPage); // Reset to first page when changing items per page
  };

  const totalPages = Math.ceil(paginationData.total / paginationData.limit);

  const handleCreateMarca = () => {
    navigate('/marcas/crear');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Stack spacing={6}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
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
        </Box>
        <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'end', gap:'10px'}}>
          <FormButton
            onClick={handleCreateMarca}
          >
            <Add sx={{ mr: 1, fontSize: '1rem' }} />
            Nueva Marca
          </FormButton>
          
          {loading ? (
            <LoadingSpinner 
              message="Cargando marcas..." 
              fullHeight={true}
            />
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ color: '#ff6b6b' }}>
                {error}
              </Typography>
            </Box>
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
            />
          )}
        </Box>
        
      </Stack>
    </Container>
  );
};