import { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../atoms/FormField';
import { FormSelect } from '../atoms/FormSelect';
import { FormButton } from '../atoms/FormButton';
import { StatusChipSelect } from '../atoms/StatusChipSelect';
import { getClasesNiza } from '../../services/claseNizaService';
import { getPaises } from '../../services/paisService';
import type { ClaseNiza } from '../../types/claseNiza';
import type { Pais } from '../../types/pais';
import type { MarcaData } from '../organisms/MarcaWizard';

interface MarcaWizardStep1Props {
  data: MarcaData;
  onNext: (stepData: Partial<MarcaData>, section: 'marca' | 'titular') => void;
  isEditing?: boolean;
}

interface Step1FormValues {
  nombre: string;
  descripcion: string;
  logoUrl: string;
  paisId: string;
  claseNizaId: string;
  estado: string;
}

const validationSchema = Yup.object({
  nombre: Yup.string()
    .required('El nombre de la marca es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  descripcion: Yup.string()
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  logoUrl: Yup.string()
    .url('Debe ser una URL válida'),
  paisId: Yup.string()
    .required('Debe seleccionar un país'),
  claseNizaId: Yup.string()
    .required('Debe seleccionar una clase Niza'),
  estado: Yup.string()
    .required('Debe seleccionar un estado')
});

export const MarcaWizardStep1 = ({ data, onNext, isEditing = false }: MarcaWizardStep1Props) => {
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

  const initialValues: Step1FormValues = {
    nombre: data.nombre,
    descripcion: data.descripcion,
    logoUrl: data.logoUrl,
    paisId: data.paisId,
    claseNizaId: data.claseNizaId,
    estado: data.estado
  };

  const handleSubmit = (values: Step1FormValues) => {
    onNext(values, 'marca');
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
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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
                name="paisId"
                label="País"
                options={paisOptions}
                loading={loadingPaises}
              />

              <FormSelect
                name="claseNizaId"
                label="Clase Niza"
                options={claseNizaOptions}
                loading={loadingClases}
              />

              {isEditing && (
                <StatusChipSelect
                  name="estado"
                  label="Estado de la Marca"
                />
              )}

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
                <FormButton
                  variant="outlined"
                  onClick={() => window.history.back()}
                >
                  Cancelar
                </FormButton>
                <FormButton
                  type="submit"
                  disabled={isSubmitting}
                >
                  Siguiente
                </FormButton>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};