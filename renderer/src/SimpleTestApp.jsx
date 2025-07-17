import React from 'react';
import ReactDOM from 'react-dom/client';

// Componente de prueba básico
const SimpleTestApp = () => {
  console.log('✅ SimpleTestApp rendering...');
  
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#03222b' }}>🇨🇴 Colombia Raíces - Prueba Básica</h1>
      <p>Si puedes ver esto, React está funcionando correctamente.</p>
      
      <div style={{ 
        backgroundColor: '#fffada', 
        padding: '20px', 
        marginTop: '20px',
        borderRadius: '8px'
      }}>
        <h2>✅ Test de funcionamiento</h2>
        <ul>
          <li>✅ React cargado</li>
          <li>✅ Componente renderizado</li>
          <li>✅ Estilos aplicados</li>
          <li>✅ Electron funcionando</li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: '#03222b', 
        color: 'white',
        padding: '20px', 
        marginTop: '20px',
        borderRadius: '8px'
      }}>
        <h2>🔧 Información del sistema</h2>
        <p><strong>User Agent:</strong> {navigator.userAgent}</p>
        <p><strong>Tamaño de ventana:</strong> {window.innerWidth}x{window.innerHeight}</p>
        <p><strong>Hora:</strong> {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

// Verificar que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔍 DOM Content Loaded');
  
  const rootElement = document.getElementById('root');
  if (rootElement) {
    console.log('✅ Root element found');
    
    try {
      const root = ReactDOM.createRoot(rootElement);
      root.render(React.createElement(SimpleTestApp));
      console.log('✅ React app rendered successfully');
    } catch (error) {
      console.error('❌ Error rendering React app:', error);
    }
  } else {
    console.error('❌ Root element not found');
  }
});

// Backup: Renderizar inmediatamente si el DOM ya está listo
if (document.readyState === 'loading') {
  console.log('🔄 DOM still loading...');
} else {
  console.log('✅ DOM already loaded, rendering immediately');
  
  const rootElement = document.getElementById('root');
  if (rootElement) {
    try {
      const root = ReactDOM.createRoot(rootElement);
      root.render(React.createElement(SimpleTestApp));
      console.log('✅ React app rendered successfully (immediate)');
    } catch (error) {
      console.error('❌ Error rendering React app (immediate):', error);
    }
  }
}
