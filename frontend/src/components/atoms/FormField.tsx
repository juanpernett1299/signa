import { TextField, FormControl, FormHelperText } from '@mui/material';
import { useField } from 'formik';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}

export const FormField = ({ name, label, type = 'text', multiline = false, rows = 1, placeholder }: FormFieldProps) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && !!meta.error;

  return (
    <FormControl fullWidth error={hasError}>
      <TextField
        {...field}
        label={label}
        type={type}
        multiline={multiline}
        rows={rows}
        placeholder={placeholder}
        error={hasError}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: '#111111',
            '& fieldset': {
              borderColor: '#333333',
            },
            '&:hover fieldset': {
              borderColor: '#555555',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
            '&.Mui-error fieldset': {
              borderColor: '#ff4444',
            }
          },
          '& .MuiInputLabel-root': {
            color: '#888888',
            '&.Mui-focused': {
              color: '#ffffff',
            },
            '&.Mui-error': {
              color: '#ff4444',
            }
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
            fontSize: '0.875rem',
            '&::placeholder': {
              color: '#666666',
              opacity: 1,
            }
          }
        }}
      />
      {hasError && (
        <FormHelperText sx={{ color: '#ff4444', fontSize: '0.75rem', mt: 0.5 }}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};