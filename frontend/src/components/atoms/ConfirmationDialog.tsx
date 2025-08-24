import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box
} from '@mui/material';
import { FormButton } from './FormButton';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog = ({ 
  open, 
  title, 
  content, 
  onConfirm, 
  onCancel 
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#000000',
          border: '1px solid #333333',
          borderRadius: 2,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          color: '#ffffff',
          minWidth: 400
        }
      }}
      BackdropProps={{
        sx: {
          bgcolor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)'
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <DialogTitle 
          sx={{ 
            fontWeight: 600, 
            fontSize: '1.25rem',
            color: '#ffffff',
            p: 0,
            mb: 2
          }}
        >
          {title}
        </DialogTitle>
        
        <DialogContent sx={{ p: 0, mb: 3 }}>
          <DialogContentText 
            sx={{ 
              color: '#888888',
              fontSize: '0.875rem',
              lineHeight: 1.5
            }}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        
        <DialogActions sx={{ p: 0, gap: 2, justifyContent: 'flex-end' }}>
          <FormButton
            variant="outlined"
            onClick={onCancel}
          >
            Cancelar
          </FormButton>
          <FormButton
            onClick={onConfirm}
            sx={{
              bgcolor: '#dc2626',
              color: '#ffffff',
              '&:hover': {
                bgcolor: '#b91c1c'
              }
            }}
          >
            Confirmar
          </FormButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
