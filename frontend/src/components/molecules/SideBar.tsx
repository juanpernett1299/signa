import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../atoms/Icon';

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    id: 'marcas',
    label: 'Marcas',
    icon: 'trademark' as const,
    path: '/marcas'
  }
];

export const SideBar = ({ open, onClose }: SideBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = 240;

  const handleItemClick = (path: string) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const isSelected = (path: string) => location.pathname === path;

  const drawerContent = (
    <Box sx={{ width: drawerWidth, height: '100%', bgcolor: '#000000' }}>
      <Box sx={{ height: 64 }} /> {/* Spacer for topbar */}
      
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={isSelected(item.path)}
              onClick={() => {
                handleItemClick(item.path);
              }}
              sx={{
                borderRadius: 1,
                minHeight: 44,
                color: isSelected(item.path) ? '#ffffff' : '#888888',
                bgcolor: isSelected(item.path) ? '#111111' : 'transparent',
                '&:hover': {
                  bgcolor: '#111111',
                  color: '#ffffff'
                },
                '&.Mui-selected': {
                  bgcolor: '#111111',
                  color: '#ffffff',
                  '&:hover': {
                    bgcolor: '#1a1a1a'
                  }
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: 'inherit'
                }}
              >
                <Icon name={item.icon} fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: isSelected(item.path) ? 500 : 400
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: '#000000',
            border: 'none',
            borderRight: '1px solid #333333'
          }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: '#000000',
            border: 'none',
            borderRight: '1px solid #333333'
          }
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};