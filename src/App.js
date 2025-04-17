import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, GlobalStyles, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Problems from './components/Problems';
import ProblemSolving from './components/ProblemSolving';
import Chat from './components/Chat';
import SocialFeed from './components/SocialFeed';
import Profile from './components/Profile';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
            minHeight: '100vh',
          },
        }}
      />
      <Router>
        <Navbar />
        <Box sx={{ pt: 8 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemSolving />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/social" element={<SocialFeed />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
