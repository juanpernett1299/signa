import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';

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
      PaperProps={{
        sx: {
          bgcolor: '#1e1e1e',
          color: 'white',
          border: '1px solid #333333',
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: '#cccccc' }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 20px' }}>
        <Button 
          onClick={onCancel} 
          sx={{ color: '#888888', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' } }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          sx={{ '&:hover': { bgcolor: 'darkred' } }}
          autoFocus
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
