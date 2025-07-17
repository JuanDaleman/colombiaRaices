import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Constantes locales
const ROUTES = {
  HOME: '/',
  EXPERIENCES: '/experiences',
  COMMUNITIES: '/communities',
  RESERVATIONS: '/reservations',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
};

// Componente HomePage con logo
const HomePage = () => {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Logo en esquina superior izquierda - Sin fondo */}
      <div 
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 20,
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img 
          src="/images/LogoColombiaRaicesNoFondo.png" 
          alt="Colombia Raíces"
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
          }}
          onError={(e) => {
            console.error('Error loading logo:', e);
            e.target.style.display = 'none';
          }}
          onLoad={() => {
            console.log('Logo loaded successfully');
          }}
        />
      </div>
      
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #03222b 0%, #569079 100%)' }} className="text-white py-20" 
        style={{
          background: 'linear-gradient(135deg, #03222b 0%, #569079 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center'
        }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '24px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Descubre Colombia Raíces
          </h1>
          <p style={{ 
            fontSize: '1.25rem',
            marginBottom: '32px',
            maxWidth: '768px',
            margin: '0 auto 32px auto',
            lineHeight: '1.6'
          }}>
            Conecta con las comunidades locales y vive experiencias auténticas 
            que preservan nuestro patrimonio cultural y natural.
          </p>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <button
              style={{ 
                backgroundColor: '#fbd338', 
                color: '#03222b',
                border: 'none',
                padding: '16px 32px',
                fontSize: '1.125rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f2c832';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#fbd338';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Explorar Experiencias
            </button>
            <button
              style={{ 
                border: '2px solid #fbd338', 
                color: '#fbd338',
                backgroundColor: 'transparent',
                padding: '16px 32px',
                fontSize: '1.125rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#fbd338';
                e.target.style.color = '#03222b';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#fbd338';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Conocer Comunidades
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: '64px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#03222b'
          }}>
            Experiencias Auténticas
          </h2>
          <p style={{ 
            color: '#666',
            maxWidth: '512px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Descubre las experiencias más populares que conectan el turismo 
            con las comunidades locales.
          </p>
        </div>
      </section>
    </div>
  );
};

// Componente Navigation simplificado
const Navigation = () => {
  return (
    <nav style={{ 
      backgroundColor: '#fffada', 
      padding: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img 
            src="/images/LogoColombiaRaicesNoFondo.png" 
            alt="Colombia Raíces Logo" 
            style={{ 
              height: '40px', 
              width: 'auto' 
            }} 
          />
          <h1 style={{ color: '#03222b', margin: 0, fontSize: '1.5rem' }}>Colombia Raíces</h1>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={{ color: '#03222b', textDecoration: 'none', fontWeight: '500' }}>🏠 Inicio</a>
          <a href="#" style={{ color: '#03222b', textDecoration: 'none', fontWeight: '500' }}>🌟 Experiencias</a>
          <a href="#" style={{ color: '#03222b', textDecoration: 'none', fontWeight: '500' }}>🏘️ Comunidades</a>
          <a href="#" style={{ color: '#03222b', textDecoration: 'none', fontWeight: '500' }}>📅 Reservas</a>
        </div>
      </div>
    </nav>);
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
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
