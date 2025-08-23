import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  fullHeight?: boolean;
}

export const LoadingSpinner = ({ 
  size = 40, 
  message = 'Cargando...', 
  fullHeight = false 
}: LoadingSpinnerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: fullHeight ? 8 : 4,
        minHeight: fullHeight ? '400px' : 'auto'
      }}
    >
      <CircularProgress
        size={size}
        sx={{
          color: '#ffffff'
        }}
      />
      {message && (
        <Typography
          variant="body2"
          sx={{
            color: '#888888',
            fontSize: '0.875rem'
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};