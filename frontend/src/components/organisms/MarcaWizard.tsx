import { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MarcaWizardStep1 } from '../molecules/MarcaWizardStep1';
import { MarcaWizardStep2 } from '../molecules/MarcaWizardStep2';
import { MarcaWizardStep3 } from '../molecules/MarcaWizardStep3';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { getClasesNiza } from '../../services/claseNizaService';
import { getPaises } from '../../services/paisService';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useEffect } from 'react';
import type { ClaseNiza } from '../../types/claseNiza';
import type { Pais } from '../../types/pais';

export interface MarcaData {
  nombre: string;
  descripcion: string;
  paisId: string;
  claseNizaId: string;
  logoUrl: string;
  estado: string;
}

export interface TitularData {
  nombre: string;
}

export interface MarcaWizardData {
  marca: MarcaData;
  titular: TitularData;
}

interface MarcaWizardProps {
  editData?: MarcaWizardData;
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
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [clasesNiza, setClasesNiza] = useState<ClaseNiza[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loading, setLoading] = useState(true);
  const [wizardData, setWizardData] = useState<MarcaWizardData>(
    editData || {
      marca: {
        nombre: '',
        descripcion: '',
        paisId: '',
        claseNizaId: '',
        logoUrl: '',
        estado: 'solicitud_presentada'
      },
      titular: {
        nombre: ''
      }
    }
  );

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

  const handleNext = (stepData: Partial<MarcaData> | Partial<TitularData>, section: 'marca' | 'titular') => {
    setWizardData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...stepData }
    }));
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async (finalData: MarcaWizardData) => {
    console.log(isEditing ? 'Updating marca:' : 'Creating marca:', finalData);
    // Aquí iría la llamada al servicio para crear la marca
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const message = isEditing ? 'Marca actualizada exitosamente' : 'Marca creada exitosamente';
    showSnackbar(message, 'success');
    
    // Navegar de vuelta a la lista después de un delay
    setTimeout(() => {
      navigate('/marcas');
    }, 2000);
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
            data={wizardData.marca}
            onNext={handleNext}
            isEditing={isEditing}
          />
        );
      case 1:
        return (
          <MarcaWizardStep2
            data={wizardData.titular}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          loading ? (
            <LoadingSpinner 
              message="Preparando resumen..." 
              fullHeight={true}
            />
          ) : (
            <MarcaWizardStep3
              marcaData={wizardData.marca}
              titularData={wizardData.titular}
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
    <>
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
            '& .MuiStepLabel-root': {
              color: '#888888'
            },
            '& .MuiStepLabel-label': {
              color: '#888888',
              fontSize: '0.875rem',
              '&.Mui-active': {
                color: '#ffffff',
                fontWeight: 500
              },
              '&.Mui-completed': {
                color: '#00ff88'
              }
            },
            '& .MuiStepIcon-root': {
              color: '#333333',
              '&.Mui-active': {
                color: '#ffffff'
              },
              '&.Mui-completed': {
                color: '#00ff88'
              }
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

      <SnackbarComponent />
    </>
  );
};