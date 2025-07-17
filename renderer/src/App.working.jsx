import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Constantes de rutas
const ROUTES = {
  HOME: '/',
  EXPERIENCES: '/experiences',
  COMMUNITIES: '/communities',
  RESERVATIONS: '/reservations',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
};

// Componente HomePage Simple
const HomePage = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{ 
        color: '#FFD700', 
        fontSize: '2.5rem',
        marginBottom: '20px'
      }}>
        ¡Bienvenido a Colombia Raíces!
      </h1>
      <p style={{ 
        fontSize: '1.2rem',
        color: '#333',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        Descubre la auténtica Colombia a través de nuestras experiencias comunitarias.
      </p>
      
      <div style={{ 
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          🌟 Experiencias
        </div>
        <div style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          🏘️ Comunidades
        </div>
        <div style={{
          backgroundColor: '#dc3545',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          📅 Reservas
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
