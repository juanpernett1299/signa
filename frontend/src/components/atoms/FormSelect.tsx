import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useField } from 'formik';

interface Option {
  id: number;
  label: string;
  value: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: Option[];
  loading?: boolean;
}

export const FormSelect = ({ name, label, options, loading = false }: FormSelectProps) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && !!meta.error;

  return (
    <FormControl fullWidth error={hasError}>
      <InputLabel
        sx={{
          color: '#888888',
          '&.Mui-focused': {
            color: '#ffffff',
          },
          '&.Mui-error': {
            color: '#ff4444',
          }
        }}
      >
        {label}
      </InputLabel>
      <Select
        {...field}
        label={label}
        disabled={loading}
        onChange={(e) => helpers.setValue(e.target.value)}
        sx={{
          bgcolor: '#111111',
          color: '#ffffff',
          fontSize: '0.875rem',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333333',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#555555',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ff4444',
          },
          '& .MuiSelect-icon': {
            color: '#888888',
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: '#111111',
              border: '1px solid #333333',
              '& .MuiMenuItem-root': {
                color: '#ffffff',
                fontSize: '0.875rem',
               whiteSpace: 'nowrap',
               overflow: 'hidden',
               textOverflow: 'ellipsis',
               maxWidth: '100%',
                '&:hover': {
                  bgcolor: '#222222',
                },
                '&.Mui-selected': {
                  bgcolor: '#333333',
                  '&:hover': {
                    bgcolor: '#444444',
                  }
                }
              }
            }
          }
        }}
      >
        {loading ? (
          <MenuItem disabled>Cargando...</MenuItem>
        ) : (
          options.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        )}
      </Select>
      {hasError && (
        <FormHelperText sx={{ color: '#ff4444', fontSize: '0.75rem', mt: 0.5 }}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};