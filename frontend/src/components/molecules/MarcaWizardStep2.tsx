import { Box, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../atoms/FormField';
import { FormButton } from '../atoms/FormButton';
import type { MarcaFormData } from '../organisms/MarcaWizard';

interface MarcaWizardStep2Props {
  data: MarcaFormData;
  onNext: (stepData: Partial<MarcaFormData>, section: 'marca' | 'titular') => void;
  onBack: () => void;
  isEditing?: boolean;
}

interface Step2FormValues {
  titular: string;
}

const validationSchema = Yup.object({
  titular: Yup.string()
    .required('El titular es requerido')
    .min(2, 'El titular debe tener al menos 2 caracteres')
});

export const MarcaWizardStep2 = ({ data, onNext, onBack, isEditing = false }: MarcaWizardStep2Props) => {
  const initialValues: Step2FormValues = {
    titular: data.titular
  };

  const handleSubmit = (values: Step2FormValues) => {
    onNext(values, 'titular');
  };

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
                name="titular"
                label="Nombre del Titular"
                placeholder="Ingrese el nombre del titular de la marca"
              />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
                <FormButton
                  variant="outlined"
                  onClick={onBack}
                >
                  Atrás
                </FormButton>
                <FormButton
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isEditing ? 'Actualizar y Continuar' : 'Siguiente'}
                </FormButton>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};