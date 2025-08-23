import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../atoms/FormField';
import { FormSelect } from '../atoms/FormSelect';
import { FormButton } from '../atoms/FormButton';
import { getClasesNiza } from '../../services/claseNizaService';
import { getPaises } from '../../services/paisService';
import type { ClaseNiza } from '../../types/claseNiza';
import type { Pais } from '../../types/pais';

interface MarcaFormValues {
  nombre: string;
  titular: string;
  descripcion: string;
  logoUrl: string;
  claseNizaId: string;
  paisId: string;
}

const validationSchema = Yup.object({
  nombre: Yup.string()
    .required('El nombre de la marca es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  titular: Yup.string()
    .required('El titular es requerido')
    .min(2, 'El titular debe tener al menos 2 caracteres'),
  descripcion: Yup.string()
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  logoUrl: Yup.string()
    .url('Debe ser una URL válida'),
  claseNizaId: Yup.string()
    .required('Debe seleccionar una clase Niza'),
  paisId: Yup.string()
    .required('Debe seleccionar un país')
});

const initialValues: MarcaFormValues = {
  nombre: '',
  titular: '',
  descripcion: '',
  logoUrl: '',
  claseNizaId: '',
  paisId: ''
};

export const MarcaForm = () => {
  const [clasesNiza, setClasesNiza] = useState<ClaseNiza[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loadingClases, setLoadingClases] = useState(true);
  const [loadingPaises, setLoadingPaises] = useState(true);

  useEffect(() => {
    const loadData = async () => {
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
        setLoadingClases(false);
        setLoadingPaises(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (values: MarcaFormValues) => {
    console.log('Submitting marca:', values);
    // Aquí iría la llamada al servicio para crear la marca
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
    alert('Marca creada exitosamente');
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

  return (
    <Box
      sx={{
        bgcolor: '#111111',
        border: '1px solid #333333',
        borderRadius: 2,
        p: 4,
        maxWidth: 600,
        mx: 'auto'
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: '#ffffff',
          fontWeight: 600,
          mb: 3
        }}
      >
        Registrar Nueva Marca
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={3}>
              <FormField
                name="nombre"
                label="Nombre de la Marca"
                placeholder="Ingrese el nombre de la marca"
              />

              <FormField
                name="titular"
                label="Titular"
                placeholder="Ingrese el nombre del titular"
              />

              <FormField
                name="descripcion"
                label="Descripción"
                multiline
                rows={3}
                placeholder="Descripción opcional de la marca"
              />

              <FormField
                name="logoUrl"
                label="URL del Logo"
                placeholder="https://ejemplo.com/logo.png"
              />

              <FormSelect
                name="claseNizaId"
                label="Clase Niza"
                options={claseNizaOptions}
                loading={loadingClases}
              />

              <FormSelect
                name="paisId"
                label="País"
                options={paisOptions}
                loading={loadingPaises}
              />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
                <FormButton
                  variant="outlined"
                  onClick={() => window.history.back()}
                >
                  Cancelar
                </FormButton>
                <FormButton
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Crear Marca
                </FormButton>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};