import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF8C00', // Dark Orange
      light: '#FFA533',
      dark: '#CC7000',
    },
    secondary: {
      main: '#FFA500', // Darker Gold/Orange
      light: '#FFB733',
      dark: '#CC8400',
    },
    background: {
      default: '#FFF9E5', // Light warm background
      paper: '#FFFFFF',
    },
    error: {
      main: '#FF4D4D', // Bright red
    },
    warning: {
      main: '#FFB300', // Amber
    },
    success: {
      main: '#FFA500', // Orange
    },
    info: {
      main: '#FF8C00', // Dark Orange
    },
  },
  typography: {
    fontFamily: '"Fredoka One", "Comic Sans MS", cursive',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FF8C00',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#FFA500',
    },
    body1: {
      fontSize: '1.1rem',
      fontFamily: '"Fredoka", "Comic Sans MS", sans-serif',
    },
    button: {
      fontFamily: '"Fredoka One", "Comic Sans MS", cursive',
      fontSize: '1.1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
          padding: '12px 24px',
          fontSize: '1.2rem',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
          <Navigation />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;