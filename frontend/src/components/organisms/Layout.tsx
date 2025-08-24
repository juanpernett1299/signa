import { useState } from 'react';
import { Box } from '@mui/material';
import { TopBar } from '../molecules/TopBar';
import { SideBar } from '../molecules/SideBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#000000' }}>
      <TopBar onMenuClick={handleMenuClick} />
      
      <SideBar
        open={sidebarOpen}
        onClose={handleSidebarClose}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#000000',
          minHeight: '100vh',
          ml: { md: '240px' },
          pt: '64px'
        }}
      >
        <Box sx={{
        width:'100%'
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};