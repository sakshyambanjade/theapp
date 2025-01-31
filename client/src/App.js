import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme from MUI
import { CContainer } from '@coreui/react';
import Login from './components/Login/SignIn';
import Register from './components/Register/SignUp';
import HomePage from '../src/components/marketing-page/HomePage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', //Ensure this is defined correctly
    },
    secondary: {
      main: '#dc004e', // Ensure this is defined correctly
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}> {/* Wrap the entire app with ThemeProvider */}
      <Router>
        <CContainer>
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/" element={<HomePage />} />

          </Routes>
        </CContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
