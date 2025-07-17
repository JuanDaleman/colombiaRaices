// Página de prueba para el logo
import React from 'react';
import Logo from '../components/common/Logo';

const LogoTestPage = () => {
  const logoVariants = [
    { size: 'small', variant: 'circular' },
    { size: 'medium', variant: 'circular' },
    { size: 'large', variant: 'circular' },
    { size: 'medium', variant: 'square' },
    { size: 'medium', variant: 'transparent' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8" style={{ color: '#03222b' }}>
          🧪 Test del Logo Colombia Raíces
        </h1>
        
        {/* Grid de pruebas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logoVariants.map((config, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-center">
                {config.size} - {config.variant}
              </h3>
              <div className="flex justify-center">
                <Logo 
                  size={config.size}
                  variant={config.variant}
                  showHover={true}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Información de debugging */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">🔍 Información de Debug</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Ruta del logo circular:</strong> /images/LogoColombiaRaicesCircular.png</p>
            <p><strong>Ruta del logo sin fondo:</strong> /images/LogoColombiaRaicesNoFondo.png</p>
            <p><strong>Ruta del logo con fondo:</strong> /images/ColombiaRaicesLogo.png</p>
          </div>
          
          <div className="mt-4">
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && window.testLogoLoad) {
                  window.testLogoLoad();
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ejecutar Test de Carga
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoTestPage;
