import { Container, Box, Typography, Stack } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { MarcaWizard } from '../components/organisms/MarcaWizard';
import { FormButton } from '../components/atoms/FormButton';
import type { MarcaFormData } from '../components/organisms/MarcaWizard';

export const CreateMarcaView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener datos de edición si existen
  const editData = location.state?.editData as MarcaFormData | undefined;
  const isEditing = !!editData;

  const handleBack = () => {
    navigate('/marcas');
  };

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
            {isEditing ? 'Editar Marca' : 'Nueva Marca'}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#888888'
            }}
          >
            {isEditing ? 'Modifica los datos de la marca' : 'Registra una nueva marca en el sistema'}
          </Typography>
        </Box>
        <MarcaWizard editData={editData} isEditing={isEditing} />
      </Stack>
    </Container>
  );
};