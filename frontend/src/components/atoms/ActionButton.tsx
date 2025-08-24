import { IconButton, Tooltip } from '@mui/material';
import { ReactNode } from 'react';

interface ActionButtonProps {
  icon: ReactNode;
  tooltip: string;
  onClick: () => void;
}

export const ActionButton = ({ icon, tooltip, onClick }: ActionButtonProps) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        onClick={onClick}
        size="small"
        sx={{
          color: '#888888',
          width: 32,
          height: 32,
          '&:hover': {
            bgcolor: '#333333',
            color: '#ffffff'
          },
          transition: 'all 0.2s ease-in-out'
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};