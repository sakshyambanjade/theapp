import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CContainer } from '@coreui/react';
import Login from '../src/components/Login/Login';
import Register from "../src/components/Register/Register"

function App() {
  return (
    <Router>
      <CContainer>
        <Routes>
          <Route path="/SignIn" element={<Login />} />
          <Route path="/SignUp" element={<Register />} />
        </Routes>
      </CContainer>
    </Router>
  );
}

export default App;
