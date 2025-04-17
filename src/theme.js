import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00FF99', // Cyber Green
      light: '#33FFAD',
      dark: '#00CC7A',
    },
    secondary: {
      main: '#121212', // Midnight Black
      light: '#1E1E1E',
      dark: '#0A0A0A',
    },
    background: {
      default: 'linear-gradient(135deg, #2E2E2E 0%, #121212 100%)', // Dark Charcoal Gray to Midnight Black
      paper: 'linear-gradient(135deg, #363636 0%, #1E1E1E 100%)',
      light: 'linear-gradient(135deg, #404040 0%, #2E2E2E 100%)',
    },
    text: {
      primary: '#FFFFFF', // White
      secondary: '#C0C0C0', // Light Silver
    },
    accent: {
      main: '#9C1FFF', // Electric Purple
      light: '#B04CFF',
      dark: '#7A00CC',
    },
    highlight: {
      main: '#1A8FFF', // Vibrant Blue
      light: '#47A3FF',
      dark: '#0066CC',
    },
    error: {
      main: '#FF3D3D',
    },
    warning: {
      main: '#FFCC00',
    },
    success: {
      main: '#00FF99',
    },
    info: {
      main: '#1A8FFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      background: 'linear-gradient(45deg, #00FF99, #9C1FFF)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      background: 'linear-gradient(45deg, #00FF99, #1A8FFF)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      background: 'linear-gradient(45deg, #00FF99, #9C1FFF)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 24px',
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'none',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #00FF99 0%, #1A8FFF 100%)',
          color: '#121212',
          boxShadow: '0 4px 15px rgba(0, 255, 153, 0.3)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00CC7A 0%, #0066CC 100%)',
            boxShadow: '0 6px 20px rgba(0, 255, 153, 0.5)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            backgroundSize: '200% 200%',
            animation: 'gradient 3s ease infinite',
          },
        },
        outlined: {
          border: '2px solid #00FF99',
          color: '#00FF99',
          background: 'transparent',
          '&:hover': {
            borderColor: '#9C1FFF',
            color: '#9C1FFF',
            background: 'rgba(156, 31, 255, 0.1)',
            boxShadow: '0 0 20px rgba(156, 31, 255, 0.3)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent, rgba(0, 255, 153, 0.1), transparent)',
            backgroundSize: '200% 200%',
            animation: 'gradient 3s ease infinite',
          },
        },
        text: {
          color: '#00FF99',
          '&:hover': {
            color: '#9C1FFF',
            background: 'rgba(156, 31, 255, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(10px)',
        },
        elevation1: {
          background: 'linear-gradient(135deg, rgba(54, 54, 54, 0.8) 0%, rgba(30, 30, 30, 0.8) 100%)',
          boxShadow: '0 0 20px rgba(0, 255, 153, 0.1)',
        },
        elevation2: {
          background: 'linear-gradient(135deg, rgba(64, 64, 64, 0.8) 0%, rgba(46, 46, 46, 0.8) 100%)',
          boxShadow: '0 0 30px rgba(0, 255, 153, 0.15)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(54, 54, 54, 0.8) 0%, rgba(30, 30, 30, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 153, 0.1)',
          '&:hover': {
            boxShadow: '0 0 30px rgba(0, 255, 153, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(46, 46, 46, 0.8) 0%, rgba(30, 30, 30, 0.8) 100%)',
            '& fieldset': {
              borderColor: 'rgba(0, 255, 153, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: '#00FF99',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00FF99',
              boxShadow: '0 0 15px rgba(0, 255, 153, 0.3)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          background: 'linear-gradient(135deg, rgba(0, 255, 153, 0.1) 0%, rgba(26, 143, 255, 0.1) 100%)',
          border: '1px solid rgba(0, 255, 153, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(0, 255, 153, 0.2) 0%, rgba(26, 143, 255, 0.2) 100%)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.8) 0%, rgba(10, 10, 10, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 255, 153, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.8) 0%, rgba(10, 10, 10, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(0, 255, 153, 0.1)',
        },
      },
    },
  },
});

export default theme; 