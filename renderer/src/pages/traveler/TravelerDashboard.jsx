import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { COLORS } from '../../constants/colors';

const TravelerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px'
  };

  const headerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '30px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    textAlign: 'center'
  };

  const buttonStyle = {
    backgroundColor: COLORS.primary,
    color: '#03222b',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginRight: '10px'
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff6b6b',
    color: 'white'
  };

  const sectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ margin: 0, color: COLORS.primary, fontSize: '28px' }}>
            🧳 Dashboard - Viajero
          </h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            Bienvenido, {user?.name}
          </p>
        </div>
        <button 
          style={logoutButtonStyle}
          onClick={handleLogout}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff5252'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
        >
          Cerrar Sesión
        </button>
      </div>

      <div style={sectionStyle}>
        <div style={cardStyle}>
          <h2 style={{ color: COLORS.primary, marginBottom: '20px' }}>
            🔍 Buscar Experiencias
          </h2>          <p style={{ color: '#666', marginBottom: '20px' }}>
            Explora experiencias auténticas en comunidades colombianas
          </p>
          <button 
            style={buttonStyle}
            onClick={() => navigate('/experiences')}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f2c832'}
            onMouseOut={(e) => e.target.style.backgroundColor = COLORS.primary}
          >
            Explorar Experiencias
          </button>
        </div>

        <div style={cardStyle}>
          <h2 style={{ color: COLORS.primary, marginBottom: '20px' }}>
            📅 Mis Reservas
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Genera estimaciones y gestiona tus reservas
          </p>
          <button 
            style={buttonStyle}
            onClick={() => navigate('/reservations')}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f2c832'}
            onMouseOut={(e) => e.target.style.backgroundColor = COLORS.primary}
          >
            Ver Reservas
          </button>
        </div>

        <div style={cardStyle}>
          <h2 style={{ color: COLORS.primary, marginBottom: '20px' }}>
            🏘️ Comunidades
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Conoce los perfiles de las comunidades locales
          </p>
          <button 
            style={buttonStyle}
            onClick={() => navigate('/communities')}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f2c832'}
            onMouseOut={(e) => e.target.style.backgroundColor = COLORS.primary}
          >
            Explorar Comunidades
          </button>
        </div>

        <div style={cardStyle}>
          <h2 style={{ color: COLORS.primary, marginBottom: '20px' }}>
            👤 Mi Perfil
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Actualiza tu información personal y contraseña
          </p>
          <button 
            style={buttonStyle}
            onClick={() => navigate('/profile')}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f2c832'}
            onMouseOut={(e) => e.target.style.backgroundColor = COLORS.primary}
          >
            Actualizar Perfil
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ color: COLORS.primary, marginBottom: '20px' }}>
          🎯 Próximas Funcionalidades
        </h2>
        <p style={{ color: '#666', fontSize: '14px' }}>
          En desarrollo: Mapas interactivos, sistema de pagos, chat con operadores, y más...
        </p>
      </div>
    </div>
  );
};

export default TravelerDashboard;
