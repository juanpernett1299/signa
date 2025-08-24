import { Chip, Box } from '@mui/material';
import { Close } from '@mui/icons-material';

interface FilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export const FilterChip = ({ label, value, onRemove }: FilterChipProps) => {
  return (
    <Chip
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <span style={{ fontSize: '0.75rem' }}>
            {label}: {value}
          </span>
        </Box>
      }
      onDelete={onRemove}
      deleteIcon={<Close fontSize="small" />}
      size="small"
      sx={{
        bgcolor: '#111111',
        color: '#ffffff',
        border: '1px solid #333333',
        height: 28,
        '& .MuiChip-label': {
          px: 1.5,
          fontSize: '0.75rem'
        },
        '& .MuiChip-deleteIcon': {
          color: '#888888',
          fontSize: '0.875rem',
          '&:hover': {
            color: '#ffffff'
          }
        },
        '&:hover': {
          bgcolor: '#1a1a1a',
          border: '1px solid #444444'
        }
      }}
    />
  );
};