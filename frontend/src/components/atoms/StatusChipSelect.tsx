import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Box } from '@mui/material';
import { useField } from 'formik';
import { EstadoMarca, estadoLabels } from '../../types/marca';
import { StatusChip } from './StatusChip';

interface StatusChipSelectProps {
  name: string;
  label: string;
}

export const StatusChipSelect = ({ name, label }: StatusChipSelectProps) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && !!meta.error;

  const estadoOptions = Object.values(EstadoMarca);

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
        onChange={(e) => helpers.setValue(e.target.value)}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StatusChip estado={selected as EstadoMarca} />
          </Box>
        )}
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
                py: 1.5,
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
        {estadoOptions.map((estado) => (
          <MenuItem key={estado} value={estado}>
            <StatusChip estado={estado} />
          </MenuItem>
        ))}
      </Select>
      {hasError && (
        <FormHelperText sx={{ color: '#ff4444', fontSize: '0.75rem', mt: 0.5 }}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};