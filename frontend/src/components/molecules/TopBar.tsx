import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Icon } from '../atoms/Icon';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar = ({ onMenuClick }: TopBarProps) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: '#000000',
        borderBottom: '1px solid #333333',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important', px: 3 }}>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            color: '#ffffff',
            '&:hover': {
              bgcolor: '#111111'
            }
          }}
        >
          <Icon name="menu" />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#ffffff',
              fontSize: '1.125rem'
            }}
          >
            Signa
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};