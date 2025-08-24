import { Button } from '@mui/material';

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'contained' | 'outlined' | 'text';
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  sx?: object;
}

export const FormButton = ({ 
  type = 'button', 
  variant = 'contained', 
  children, 
  onClick, 
  disabled = false,
  loading = false,
  sx = {}
}: FormButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        bgcolor: variant === 'contained' ? '#ffffff' : 'transparent',
        color: variant === 'contained' ? '#000000' : '#ffffff',
        border: variant === 'outlined' ? '1px solid #333333' : 'none',
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.8125rem',
        py: 1,
        px: 2.5,
        minHeight: 36,
        '&:hover': {
          bgcolor: variant === 'contained' ? '#f0f0f0' : '#111111',
          border: variant === 'outlined' ? '1px solid #555555' : 'none',
        },
        ...sx,
        '&:disabled': {
          bgcolor: variant === 'contained' ? '#333333' : 'transparent',
          color: '#666666',
          border: variant === 'outlined' ? '1px solid #222222' : 'none',
        }
      }}
    >
      {loading ? 'Cargando...' : children}
    </Button>
  );
};