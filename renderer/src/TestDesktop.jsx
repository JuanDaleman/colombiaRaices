import React from 'react';
import ReactDOM from 'react-dom/client';

// Componente de prueba simple
const TestApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#03222b' }}>🇨🇴 Colombia Raíces - Prueba de Escritorio</h1>
      
      {/* Header con logo */}
      <div style={{ 
        backgroundColor: '#fffada', 
        padding: '1rem',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img 
            src="./images/LogoColombiaRaicesNoFondo.png" 
            alt="Colombia Raíces Logo" 
            style={{ height: '40px', width: 'auto' }}
            onError={(e) => {
              console.error('Error loading logo:', e);
              e.target.style.display = 'none';
            }}
            onLoad={() => {
              console.log('Logo cargado exitosamente');
            }}
          />
          <h2 style={{ color: '#03222b', margin: 0 }}>Colombia Raíces</h2>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{ 
        background: 'linear-gradient(135deg, #03222b 0%, #569079 100%)',
        color: 'white',
        padding: '40px',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          ¡Descubre Colombia Raíces!
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          Conecta with las comunidades locales y vive experiencias auténticas.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            backgroundColor: '#fbd338',
            color: '#03222b',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            🌟 Explorar Experiencias
          </button>
          <button style={{
            backgroundColor: 'transparent',
            color: '#fbd338',
            border: '2px solid #fbd338',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            🏘️ Conocer Comunidades
          </button>
        </div>
      </div>

      {/* Logo en esquina (como en la aplicación real) */}
      <div style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '8px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <img 
          src="./images/LogoColombiaRaicesNoFondo.png" 
          alt="Colombia Raíces"
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'contain'
          }}
          onError={(e) => {
            console.error('Error loading corner logo:', e);
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Información de debugging */}
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3 style={{ color: '#03222b', marginBottom: '10px' }}>🔍 Información de Debug</h3>
        <p><strong>Modo:</strong> Aplicación de Escritorio (Electron)</p>
        <p><strong>Ruta de imágenes:</strong> ./images/</p>
        <p><strong>User Agent:</strong> {navigator.userAgent}</p>
        <p><strong>Tamaño de pantalla:</strong> {window.innerWidth}x{window.innerHeight}</p>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TestApp />);
