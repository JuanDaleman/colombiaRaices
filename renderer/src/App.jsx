import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Importar páginas
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ExperiencesPageSimple from './pages/ExperiencesPageSimple';
import CommunitiesPageSimple from './pages/CommunitiesPageSimple';
import UnderConstructionPage from './components/common/UnderConstructionPage';
import TravelerDashboard from './pages/traveler/TravelerDashboard';
import OperatorDashboard from './pages/operator/OperatorDashboard';

// Constantes locales
const ROUTES = {
  HOME: '/',
  EXPERIENCES: '/experiences',
  COMMUNITIES: '/communities',
  RESERVATIONS: '/reservations',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TRAVELER_DASHBOARD: '/traveler-dashboard',
  OPERATOR_DASHBOARD: '/operator-dashboard',
};

// Componente Navigation para escritorio
const Navigation = () => {
  const navigate = useNavigate();

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
            src="./images/LogoColombiaRaicesNoFondo.png" 
            alt="Colombia Raíces Logo" 
            style={{ 
              height: '40px', 
              width: 'auto' 
            }}
            onError={(e) => {
              console.error('Error loading header logo:', e);
              e.target.style.display = 'none';
            }}
            onLoad={() => {
              console.log('Header logo loaded successfully');
            }}
          />
          <h1 style={{ color: '#03222b', margin: 0, fontSize: '1.5rem' }}>Colombia Raíces</h1>
        </div>
          {/* Enlaces de navegación centrales */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <button
            onClick={() => navigate(ROUTES.HOME)}
            style={{ 
              background: 'none',
              border: 'none',
              color: '#03222b', 
              textDecoration: 'none', 
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🏠 Inicio
          </button>
          <button
            onClick={() => navigate(ROUTES.EXPERIENCES)}
            style={{ 
              background: 'none',
              border: 'none',
              color: '#03222b', 
              textDecoration: 'none', 
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🌟 Experiencias
          </button>
          <button
            onClick={() => navigate(ROUTES.COMMUNITIES)}
            style={{ 
              background: 'none',
              border: 'none',
              color: '#03222b', 
              textDecoration: 'none', 
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🏘️ Comunidades
          </button>
          <button
            onClick={() => navigate(ROUTES.RESERVATIONS)}
            style={{ 
              background: 'none',
              border: 'none',
              color: '#03222b', 
              textDecoration: 'none', 
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            📅 Reservas
          </button>
        </div>

        {/* Botones de autenticación */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            style={{ 
              border: '2px solid #03222b', 
              color: '#03222b',
              backgroundColor: 'transparent',
              padding: '8px 16px',
              fontSize: '0.9rem',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#03222b';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#03222b';
            }}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => navigate(ROUTES.REGISTER)}
            style={{ 
              backgroundColor: '#fbd338', 
              color: '#03222b',
              border: 'none',
              padding: '8px 16px',
              fontSize: '0.9rem',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#f2c832';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#fbd338';
            }}
          >
            Registrarse
          </button>
        </div>
      </div>
    </nav>
  );
};

// Componente HomePage optimizado para escritorio
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', position: 'relative', backgroundColor: '#f8f9fa' }}>
      {/* Logo en esquina superior izquierda */}
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
          src="./images/LogoColombiaRaicesNoFondo.png" 
          alt="Colombia Raíces"
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
          }}
          onError={(e) => {
            console.error('Error loading corner logo:', e);
            e.target.style.display = 'none';
          }}
          onLoad={() => {
            console.log('Corner logo loaded successfully');
          }}
        />
      </div>
      
      {/* Hero Section - Descripción de la app y botones principales */}
      <section style={{ 
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
            que preservan nuestro patrimonio cultural y natural. Descubre la 
            Colombia profunda a través del turismo comunitario responsable.
          </p>
            {/* Botones principales de exploración */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate(ROUTES.EXPERIENCES)}
              style={{ 
                backgroundColor: '#fbd338', 
                color: '#03222b',
                border: 'none',
                padding: '16px 32px',
                fontSize: '1.125rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minWidth: '200px'
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
              🌟 Explorar Experiencias
            </button>
            <button
              onClick={() => navigate(ROUTES.COMMUNITIES)}
              style={{ 
                border: '2px solid #fbd338', 
                color: '#fbd338',
                backgroundColor: 'transparent',
                padding: '16px 32px',
                fontSize: '1.125rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minWidth: '200px'
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
              🏘️ Conocer Comunidades
            </button>
          </div>
        </div>
      </section>

      {/* Experiencias Section */}
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
            margin: '0 auto 40px auto',
            lineHeight: '1.6'
          }}>
            Descubre las experiencias más populares que conectan el turismo 
            con las comunidades locales.
          </p>
          
          {/* Cards de experiencias */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginTop: '40px'
          }}>
            {[
              {
                title: "Tour Histórico Barichara",
                description: "Descubre la arquitectura colonial y la historia de este pueblo patrimonio.",
                price: "$45.000",
                duration: "3h",
                icon: "🏛️"
              },
              {
                title: "Experiencia Wayuu",
                description: "Vive la cultura ancestral wayuu con artesanías y tradiciones.",
                price: "$120.000",
                duration: "8h",
                icon: "🏺"
              },
              {
                title: "Ecoturismo Chocó",
                description: "Explora la biodiversidad única del Chocó biogeográfico.",
                price: "$180.000",
                duration: "12h",
                icon: "🌿"
              }
            ].map((exp, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{exp.icon}</div>
                <h3 style={{ color: '#03222b', marginBottom: '12px' }}>{exp.title}</h3>
                <p style={{ color: '#666', marginBottom: '16px', lineHeight: '1.5' }}>{exp.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#03222b', fontWeight: 'bold', fontSize: '1.2rem' }}>{exp.price}</span>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>⏱️ {exp.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Debug info */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '0.8rem',
        zIndex: 1000
      }}>
        🖥️ Desktop App | {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.EXPERIENCES} element={<ExperiencesPageSimple />} />
            <Route path={ROUTES.COMMUNITIES} element={<CommunitiesPageSimple />} />
            <Route path={ROUTES.RESERVATIONS} element={<UnderConstructionPage pageName="Reservas" />} />
            <Route path={ROUTES.DASHBOARD} element={<UnderConstructionPage pageName="Dashboard" />} />
            <Route path={ROUTES.TRAVELER_DASHBOARD} element={<TravelerDashboard />} />
            <Route path={ROUTES.OPERATOR_DASHBOARD} element={<OperatorDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
