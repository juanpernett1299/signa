import { Container, Box, Typography, Stack } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { MarcaWizardStep3 } from '../components/molecules/MarcaWizardStep3';
import { FormButton } from '../components/atoms/FormButton';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import { getClasesNiza } from '../services/claseNizaService';
import { getPaises } from '../services/paisService';
import { useEffect, useState } from 'react';
import type { ClaseNiza } from '../types/claseNiza';
import type { Pais } from '../types/pais';
import type { MarcaWizardData } from '../components/organisms/MarcaWizard';

export const ViewMarcaView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [clasesNiza, setClasesNiza] = useState<ClaseNiza[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Obtener datos de visualización
  const viewData = location.state?.viewData as MarcaWizardData | undefined;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [clasesData, paisesData] = await Promise.all([
          getClasesNiza(),
          getPaises()
        ]);
        setClasesNiza(clasesData);
        setPaises(paisesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleBack = () => {
    navigate('/marcas');
  };

  const handleEdit = () => {
    // Obtener ID de la marca desde los parámetros o generar uno temporal
    const marcaId = 1; // En una app real, esto vendría de los datos de la marca
    navigate(`/marcas/edit/${marcaId}`, { state: { editData: viewData } });
  };

  const claseNizaOptions = clasesNiza.map(clase => ({
    id: clase.id,
    label: `Clase ${clase.codigo} - ${clase.descripcion}`,
    value: clase.id.toString()
  }));

  const paisOptions = paises.map(pais => ({
    id: pais.id,
    label: pais.nombre,
    value: pais.id.toString()
  }));

  if (!viewData) {
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 3, md: 4 } }}>
        <Typography variant="h6" sx={{ color: '#ffffff' }}>
          No se encontraron datos de la marca
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 3, md: 4 } }}>
      <Stack spacing={6}>
        <Box>
          <FormButton
            variant="outlined"
            onClick={handleBack}
            sx={{ mb: { xs: 2, sm: 3 } }}
          >
            <ArrowBack sx={{ mr: 1, fontSize: '1rem' }} />
            Volver
          </FormButton>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white', 
              mb: 1,
              fontWeight: 600,
              fontSize: { xs: '1.75rem', sm: '2rem' }
            }}
          >
            Detalles de la Marca
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#888888'
            }}
          >
            Información completa del registro de marca
          </Typography>
        </Box>
        
        <Box
          sx={{
            bgcolor: '#111111',
            border: '1px solid #333333',
            borderRadius: 2,
            overflow: 'hidden',
            maxWidth: { xs: '100%', sm: 800 },
            mx: { xs: 0, sm: 'auto' }
          }}
        >
          {loading ? (
            <LoadingSpinner 
              message="Cargando información de la marca..." 
              fullHeight={true}
            />
          ) : (
            <MarcaWizardStep3
              marcaData={viewData.marca}
              titularData={viewData.titular}
              onBack={handleBack}
              paisOptions={paisOptions}
              claseNizaOptions={claseNizaOptions}
              isViewOnly={true}
              onEdit={handleEdit}
            />
          )}
        </Box>
      </Stack>
    </Container>
  );
};