import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  Tooltip
} from '@mui/material';
import { Copyright } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface SideBarProps {
  open: boolean;
  expanded: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    id: 'marcas',
    label: 'Marcas',
    icon: Copyright,
    path: '/marcas'
  }
];

export const SideBar = ({ open, expanded, onClose }: SideBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = expanded ? 240 : 64;

  const handleItemClick = (path: string) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const isSelected = (path: string) => location.pathname === path;

  const drawerContent = (expanded: boolean) => (
    <Box sx={{ 
      width: drawerWidth, 
      height: '100%', 
      bgcolor: '#000000',
      transition: 'width 0.3s ease-in-out',
      overflow: 'hidden'
    }}>
      <Box sx={{ height: 64 }} /> {/* Spacer for topbar */}
      
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <Tooltip 
              title={!expanded ? item.label : ''} 
              placement="right"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: '#333333',
                    color: '#ffffff',
                    fontSize: '0.75rem'
                  }
                }
              }}
            >
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
                  justifyContent: expanded ? 'initial' : 'center',
                  px: expanded ? 2 : 1.5,
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
                    minWidth: expanded ? 36 : 0,
                    mr: expanded ? 1 : 0,
                    color: 'inherit',
                    justifyContent: 'center'
                  }}
                >
                  <item.icon fontSize="small" />
                </ListItemIcon>
                {expanded && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isSelected(item.path) ? 500 : 400
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
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
          overflowX: 'hidden',
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240, // Always full width on mobile
            bgcolor: '#000000',
            border: 'none',
            borderRight: '1px solid #333333'
          }
        }}
      >
        {drawerContent(true)} {/* Always expanded on mobile */}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            overflowX: 'hidden',
            width: drawerWidth,
            bgcolor: '#000000',
            border: 'none',
            borderRight: '1px solid #333333',
            transition: 'width 0.3s ease-in-out'
          }
        }}
        open
      >
        {drawerContent(expanded)}
      </Drawer>
    </>
  );
};