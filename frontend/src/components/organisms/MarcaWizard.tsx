import { useState, useEffect } from 'react';
import { Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { MarcaWizardStep1 } from '../molecules/MarcaWizardStep1';
import { MarcaWizardStep2 } from '../molecules/MarcaWizardStep2';
import { MarcaWizardStep3 } from '../molecules/MarcaWizardStep3';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { getClasesNiza } from '../../services/claseNizaService';
import { getPaises } from '../../services/paisService';
import { createMarca, updateMarca } from '../../services/marcaService';
import { useSnackbar } from '../../hooks/useSnackbar';
import type { ClaseNiza } from '../../types/claseNiza';
import type { Pais } from '../../types/pais';
import type { MarcaCreate, MarcaUpdate } from '../../types/marca';
import { EstadoMarca } from '../../types/estadoMarca';


// Esta interfaz ahora coincide con los campos de la API
export interface MarcaFormData extends Omit<MarcaCreate, 'estado' | 'clase_niza_id' | 'pais_id'> {
  clase_niza_id: string;
  pais_id: string;
  estado: EstadoMarca;
}

interface MarcaWizardProps {
  editData?: MarcaFormData;
  isEditing?: boolean;
}

const steps = [
  'Información Básica',
  'Titular',
  'Resumen'
];

export const MarcaWizard = ({ editData, isEditing = false }: MarcaWizardProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showSnackbar } = useSnackbar();

  const [clasesNiza, setClasesNiza] = useState<ClaseNiza[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<MarcaFormData>(
    editData || {
      nombre: '',
      descripcion: '',
      titular: '',
      pais_id: '',
      clase_niza_id: '',
      logo_url: '',
      estado: EstadoMarca.SOLICITUD_PRESENTADA,
    }
  );

  useEffect(() => {
    setLoading(true);
    Promise.all([getClasesNiza(), getPaises()])
      .then(([clasesData, paisesData]) => {
        setClasesNiza(clasesData);
        setPaises(paisesData);
      })
      .catch(() => {
        showSnackbar('Error al cargar datos necesarios para el formulario', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNext = (stepData: Partial<MarcaFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = (finalData: MarcaFormData) => {
    setSubmitting(true);

    // Preparar los datos para la API (convertir IDs a números)
    const apiData: MarcaCreate | MarcaUpdate = {
      ...finalData,
      clase_niza_id: parseInt(finalData.clase_niza_id, 10),
      pais_id: parseInt(finalData.pais_id, 10),
      estado: finalData.estado, // Ya es del tipo correcto
    };

    const action = isEditing && id
      ? updateMarca(parseInt(id, 10), apiData as MarcaUpdate)
      : createMarca(apiData as MarcaCreate);

    action
      .then(() => {
        const message = isEditing ? 'Marca actualizada exitosamente' : 'Marca creada exitosamente';
        showSnackbar(message, 'success');
        navigate('/marcas')
      })
      .catch((e) => {
        const message = isEditing ? 'Error al actualizar la marca' : 'Error al crear la marca';
        showSnackbar(e.response.data.detail || message, 'error');
      })
      .finally(() => {
        setSubmitting(false);
      });
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

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <MarcaWizardStep1
            data={formData}
            onNext={handleNext}
            isEditing={isEditing}
          />
        );
      case 1:
        return (
          <MarcaWizardStep2
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          loading || submitting ? (
            <LoadingSpinner 
              message={submitting ? (isEditing ? 'Actualizando marca...' : 'Creando marca...') : "Preparando resumen..."}
              fullHeight={true}
            />
          ) : (
            <MarcaWizardStep3
              marcaData={formData}
              onBack={handleBack}
              onSubmit={handleSubmit}
              paisOptions={paisOptions}
              claseNizaOptions={claseNizaOptions}
              isEditing={isEditing}
            />
          )
        );
      default:
        return null;
    }
  };

  return (
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
      {/* Stepper Header */}
      <Box sx={{ p: { xs: 2, sm: 4 }, borderBottom: '1px solid #333333' }}>
        <Typography
          variant="h5"
          sx={{
            color: '#ffffff',
            fontWeight: 600,
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: '1.25rem', sm: '1.5rem' }
          }}
        >
          {isEditing ? 'Editar Marca' : 'Registrar Nueva Marca'}
        </Typography>
        
        <Stepper 
          activeStep={activeStep} 
          sx={{
            '& .MuiStepLabel-root': { color: '#888888' },
            '& .MuiStepLabel-label': {
              color: '#888888',
              fontSize: '0.875rem',
              '&.Mui-active': { color: '#ffffff', fontWeight: 500 },
              '&.Mui-completed': { color: '#00ff88' }
            },
            '& .MuiStepIcon-root': {
              color: '#333333',
              '&.Mui-active': { color: '#ffffff' },
              '&.Mui-completed': { color: '#00ff88' }
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Step Content */}
      {renderStepContent()}
    </Box>
  );
};