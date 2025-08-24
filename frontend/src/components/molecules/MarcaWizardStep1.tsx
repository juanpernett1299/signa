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
import type { MarcaFormData } from '../organisms/MarcaWizard';
import { EstadoMarca } from '../../types/estadoMarca';
import { useSnackbar } from '../../hooks/useSnackbar';

interface MarcaWizardStep1Props {
  data: MarcaFormData;
  onNext: (stepData: Partial<MarcaFormData>, section: 'marca' | 'titular') => void;
  isEditing?: boolean;
}

interface Step1FormValues {
  nombre: string;
  descripcion: string;
  logo_url: string;
  pais_id: string;
  clase_niza_id: string;
  estado: EstadoMarca;
}

const validationSchema = Yup.object({
  nombre: Yup.string()
    .required('El nombre de la marca es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  descripcion: Yup.string()
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  logo_url: Yup.string()
    .url('Debe ser una URL válida'),
  pais_id: Yup.string()
    .required('Debe seleccionar un país'),
  clase_niza_id: Yup.string()
    .required('Debe seleccionar una clase Niza'),
  estado: Yup.string()
    .required('Debe seleccionar un estado')
});

export const MarcaWizardStep1 = ({ data, onNext, isEditing = false }: MarcaWizardStep1Props) => {
  const [clasesNiza, setClasesNiza] = useState<ClaseNiza[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loadingClases, setLoadingClases] = useState(true);
  const [loadingPaises, setLoadingPaises] = useState(true);
  const { showSnackbar } = useSnackbar();
  
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
        showSnackbar('Error al cargar los datos', 'error');
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
    logo_url: data.logo_url,
    pais_id: data.pais_id,
    clase_niza_id: data.clase_niza_id,
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
                name="logo_url"
                label="URL del Logo"
                placeholder="https://ejemplo.com/logo.png"
              />

              <FormSelect
                name="pais_id"
                label="País"
                options={paisOptions}
                loading={loadingPaises}
              />

              <FormSelect
                name="clase_niza_id"
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