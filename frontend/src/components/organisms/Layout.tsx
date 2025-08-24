import { useState } from 'react';
import { Box } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { TopBar } from '../molecules/TopBar';
import { SideBar } from '../molecules/SideBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar state
  const [sidebarExpanded, setSidebarExpanded] = useState(true); // Desktop sidebar state
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuClick = () => {
    if (isMobile) {
      // En mobile: solo toggle open/close
      setSidebarOpen(!sidebarOpen);
    } else {
      // En desktop: solo toggle expanded/collapsed
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#000000' }}>
      <TopBar onMenuClick={handleMenuClick} />
      
      <SideBar
        open={sidebarOpen}
        expanded={sidebarExpanded}
        onClose={handleSidebarClose}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#000000',
          minHeight: '100vh',
          ml: { md: sidebarExpanded ? '240px' : '64px' },
          transition: 'margin-left 0.3s ease-in-out',
          // Apply padding correctly to reserve space for the TopBar and around the content
          pt: '64px',
          px: { xs: 1, sm: 2, md: 3 }, // Responsive horizontal padding
          pb: { xs: 1, sm: 2, md: 3 }, // Responsive bottom padding
        }}
      >
        <Box sx={{
          width:'100%',
          maxWidth: '1400px',
          // Center this container within the main area using auto margins
          mx: 'auto',
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};