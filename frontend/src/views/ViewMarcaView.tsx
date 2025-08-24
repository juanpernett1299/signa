import { Container, Box, Typography, Stack } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { MarcaWizardStep3 } from '../components/molecules/MarcaWizardStep3';
import { FormButton } from '../components/atoms/FormButton';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import { getClasesNiza } from '../services/claseNizaService';
import { getPaises } from '../services/paisService';
import { getMarcaById } from '../services/marcaService';
import { useEffect, useState } from 'react';
import type { ClaseNiza } from '../types/claseNiza';
import type { Pais } from '../types/pais';
import type { MarcaFormData } from '../components/organisms/MarcaWizard';
import { useSnackbar } from '../hooks/useSnackbar';

export const ViewMarcaView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { showSnackbar } = useSnackbar();

  const [marcaData, setMarcaData] = useState<MarcaFormData | null>(location.state?.viewData ?? null);
  const [clasesNiza, setClasesNiza] = useState<ClaseNiza[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const dependenciesPromise = Promise.all([
      getClasesNiza(),
      getPaises()
    ]);
    dependenciesPromise
      .then(([clasesData, paisesData]) => {
        setClasesNiza(clasesData);
        setPaises(paisesData);

        // Si no tenemos datos de la navegación, los buscamos por ID
        if (!location.state?.viewData && id) {
          return getMarcaById(parseInt(id, 10));
        }
        return Promise.resolve(null); // No es necesario buscar la marca
      })
      .then(fetchedMarca => {
        if (fetchedMarca) {
          // Transformamos los datos de la API al formato del Wizard
          const wizardData: MarcaFormData = {
            nombre: fetchedMarca.nombre,
            descripcion: fetchedMarca.descripcion || '',
            logo_url: fetchedMarca.logo_url || '',
            clase_niza_id: fetchedMarca.clase_niza_id?.toString() || '',
            pais_id: fetchedMarca.pais_id?.toString() || '',
            estado: fetchedMarca.estado,
            titular: fetchedMarca.titular,
          };
          setMarcaData(wizardData);
        }
      })
      .catch(error => {
        showSnackbar('Error al cargar los datos de la marca', 'error');
        setMarcaData(null); // Limpiar datos en caso de error
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate('/marcas');
  };

  const handleEdit = () => {
    if (id) {
      navigate(`/marcas/edit/${id}`, { state: { editData: marcaData } });
    }
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

  if (loading) {
    return (
      <LoadingSpinner 
        message="Cargando información de la marca..." 
        fullHeight={true}
      />
    );
  }

  if (!marcaData) {
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 3, md: 4 } }}>
        <Typography variant="h6" sx={{ color: '#ffffff' }}>
          No se encontraron datos de la marca
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 0.5, sm: 2, md: 3 } }}>
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
          <MarcaWizardStep3
            marcaData={marcaData}
            onBack={handleBack}
            paisOptions={paisOptions}
            claseNizaOptions={claseNizaOptions}
            isViewOnly={true}
            onEdit={handleEdit}
          />
        </Box>
      </Stack>
    </Container>
  );
};