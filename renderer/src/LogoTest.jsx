import React from 'react';

// Componente de prueba específico para el logo
const LogoTest = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header con logo */}
      <header style={{ 
        backgroundColor: '#fffada', 
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{
            border: '2px solid red',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="./images/LogoColombiaRaicesNoFondo.png" 
              alt="Colombia Raíces Logo" 
              style={{ 
                height: '45px', 
                width: 'auto',
                display: 'block'
              }}
              onError={(e) => {
                console.error('❌ Error loading header logo:', e);
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '❌ LOGO NO CARGADO';
                e.target.parentElement.style.backgroundColor = '#ffcccc';
              }}
              onLoad={() => {
                console.log('✅ Header logo loaded successfully');
              }}
            />
          </div>
          <h1 style={{ 
            color: '#03222b', 
            margin: 0, 
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>Colombia Raíces</h1>
        </div>
      </header>

      {/* Contenido de prueba */}
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#03222b' }}>🔍 Diagnóstico del Logo</h2>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #ddd'
        }}>
          <h3>📊 Estado de carga de recursos:</h3>
          <ul>
            <li>✅ Aplicación React cargada</li>
            <li>✅ Estilos aplicados</li>
            <li>🔄 Verificando logo... (revisar consola)</li>
          </ul>
        </div>

        <div style={{ 
          backgroundColor: '#fffada', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3>🎯 Pruebas de ruta de imagen:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
              <strong>Ruta relativa (./images/):</strong>
              <br />
              <img 
                src="./images/LogoColombiaRaicesNoFondo.png" 
                alt="Test 1" 
                style={{ height: '40px', marginTop: '5px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML += '<span style="color: red;">❌ FALLO</span>';
                }}
                onLoad={() => {
                  console.log('✅ Ruta relativa funcionando');
                }}
              />
            </div>

            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
              <strong>Ruta absoluta (/images/):</strong>
              <br />
              <img 
                src="/images/LogoColombiaRaicesNoFondo.png" 
                alt="Test 2" 
                style={{ height: '40px', marginTop: '5px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML += '<span style="color: red;">❌ FALLO</span>';
                }}
                onLoad={() => {
                  console.log('✅ Ruta absoluta funcionando');
                }}
              />
            </div>

            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
              <strong>Ruta pública (public/):</strong>
              <br />
              <img 
                src="./public/images/LogoColombiaRaicesNoFondo.png" 
                alt="Test 3" 
                style={{ height: '40px', marginTop: '5px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML += '<span style="color: red;">❌ FALLO</span>';
                }}
                onLoad={() => {
                  console.log('✅ Ruta pública funcionando');
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#e7f3ff', 
          padding: '20px', 
          borderRadius: '8px'
        }}>
          <h3>🔧 Información del sistema:</h3>
          <p><strong>User Agent:</strong> {navigator.userAgent}</p>
          <p><strong>Ubicación:</strong> {window.location.href}</p>
          <p><strong>Tamaño ventana:</strong> {window.innerWidth}x{window.innerHeight}</p>
        </div>
      </div>
    </div>
  );
};

export default LogoTest;
