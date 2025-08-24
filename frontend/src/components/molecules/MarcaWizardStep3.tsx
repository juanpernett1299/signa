import { useState } from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid'; // Direct import for Grid
import { FormButton } from '../atoms/FormButton';
import { Logo } from '../atoms/Logo';
import { StatusChip } from '../atoms/StatusChip';
import { EstadoMarca } from '../../types/estadoMarca';
import type { MarcaFormData } from '../organisms/MarcaWizard';

interface MarcaWizardStep3Props {
  marcaData: MarcaFormData;
  onBack: () => void;
  onSubmit?: (data: MarcaFormData) => void;
  paisOptions: Array<{ id: number; label: string; value: string }>;
  claseNizaOptions: Array<{ id: number; label: string; value: string }>;
  isEditing?: boolean;
  isViewOnly?: boolean;
  onEdit?: () => void;
}

export const MarcaWizardStep3 = ({ 
  marcaData,
  onBack, 
  onSubmit, 
  paisOptions, 
  claseNizaOptions,
  isEditing = false,
  isViewOnly = false,
  onEdit
}: MarcaWizardStep3Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!onSubmit) return;
    setIsSubmitting(true);
    try {
      await onSubmit(marcaData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPaisLabel = () => {
    const pais = paisOptions.find(p => p.value === marcaData.pais_id);
    return pais?.label || 'No seleccionado';
  };

  const getClaseNizaLabel = () => {
    const clase = claseNizaOptions.find(c => c.value === marcaData.clase_niza_id);
    return clase?.label || 'No seleccionado';
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Stack spacing={4}>
        {/* Sección: Datos de la Marca */}
        <Box>
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, fontWeight: 600, fontSize: '1rem' }}>
            Datos de la Marca
          </Typography>
          
          <Grid container spacing={3}>
            {/* Logo */}
            {marcaData.logo_url && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Logo src={marcaData.logo_url} alt={marcaData.nombre} size={60} />
                </Box>
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body2" sx={{ color: '#888888', mb: 0.5 }}>
                  Nombre de la Marca
                </Typography>
                <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 500 }}>
                  {marcaData.nombre}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body2" sx={{ color: '#888888', mb: 0.5 }}>
                  País
                </Typography>
                <Typography variant="body1" sx={{ color: '#ffffff' }}>
                  {getPaisLabel()}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <Typography variant="body2" sx={{ color: '#888888', mb: 0.5 }}>
                  Descripción
                </Typography>
                <Typography variant="body1" sx={{ color: '#ffffff' }}>
                  {marcaData.descripcion || 'Sin descripción'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <Typography variant="body2" sx={{ color: '#888888', mb: 0.5 }}>
                  Clase Niza
                </Typography>
                <Typography variant="body1" sx={{ color: '#ffffff' }}>
                  {getClaseNizaLabel()}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body2" sx={{ color: '#888888', mb: 0.5 }}>
                  Estado
                </Typography>
                <StatusChip estado={marcaData.estado as EstadoMarca} />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: '#333333' }} />

        {/* Sección: Datos del Titular */}
        <Box>
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, fontWeight: 600, fontSize: '1rem' }}>
            Datos del Titular
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <Typography variant="body2" sx={{ color: '#888888', mb: 0.5 }}>
                  Nombre del Titular
                </Typography>
                <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 500 }}>
                  {marcaData.titular}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: '#333333' }} />

        {!isViewOnly && (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <FormButton
              variant="outlined"
              onClick={onBack}
              disabled={isSubmitting}
            >
              Atrás
            </FormButton>
            <FormButton
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isEditing ? "Guardar" : "Registrar marca"}
            </FormButton>
          </Box>
        )}

        {isViewOnly && onEdit && (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <FormButton
              onClick={onEdit}
            >
              Editar
            </FormButton>
          </Box>
        )}
      </Stack>
    </Box>
  );
};