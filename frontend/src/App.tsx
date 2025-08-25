import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { Layout } from './components/organisms/Layout';
import { SnackbarProvider } from './hooks/useSnackbar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';
import dayjs from 'dayjs';

dayjs.locale('es');

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#111111'
    },
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#666666'
    },
    text: {
      primary: '#ffffff',
      secondary: '#888888'
    }
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#000000',
          minHeight: '100vh'
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <SnackbarProvider>
            <Layout>
              <AppRouter />
            </Layout>
          </SnackbarProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;