// Página Home principal
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, REGIONS, EXPERIENCE_TYPES } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import Logo from '../common/Logo';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [featuredExperiences, setFeaturedExperiences] = useState([]);
  const [featuredCommunities, setFeaturedCommunities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🚀 HomePage useEffect ejecutándose...');
    
    const fetchData = async () => {
      try {
        console.log('📊 Iniciando carga de datos...');
        setLoading(true);
        
        console.log('🔍 Verificando APIs disponibles...');
        console.log('electronAPI:', typeof window.electronAPI);
        console.log('experiencesSimple:', typeof window.electronAPI?.experiencesSimple);
        console.log('communities:', typeof window.electronAPI?.communities);
        
        // Fetch experiences and communities from database
        const [experiencesResponse, communitiesResponse] = await Promise.all([
          window.electronAPI.experiencesSimple.getAll(),
          window.electronAPI.communities.getAll()
        ]);

        console.log('📊 Respuesta de experiencias:', experiencesResponse);
        console.log('🏘️ Respuesta de comunidades:', communitiesResponse);

        if (experiencesResponse.success) {
          // Show first 6 experiences for the homepage
          const experiences = experiencesResponse.data.slice(0, 6);
          console.log('✅ Configurando experiencias destacadas:', experiences.length);
          setFeaturedExperiences(experiences);
        } else {
          console.error('❌ Error loading experiences:', experiencesResponse.error);
          setError('Error al cargar las experiencias');
        }

        if (communitiesResponse.success) {
          // Show first 4 communities for the homepage
          const communities = communitiesResponse.data.slice(0, 4);
          console.log('✅ Configurando comunidades destacadas:', communities.length);
          setFeaturedCommunities(communities);
        } else {
          console.error('❌ Error loading communities:', communitiesResponse.error);
          setError('Error al cargar las comunidades');
        }
      } catch (err) {
        console.error('❌ Error fetching homepage data:', err);
        setError('Error al conectar con la base de datos');
      } finally {
        console.log('🏁 Terminando carga de datos...');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Helper function to get type emoji for experiences
  const getTypeEmoji = (type) => {
    const typeEmojiMap = {
      'cultural': '🎭',
      'gastronómico': '🍽️',
      'artesanal': '🎨',
      'ecologica': '🌿',
      'aventura': '🏔️',
      'historica': '🏛️',
      'espiritual': '🕯️',
    };
    return typeEmojiMap[type.toLowerCase()] || '🌟';
  };

  const getExperienceTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'cultural':
        return { backgroundColor: '#fbd338', color: '#03222b' };
      case 'historica':
        return { backgroundColor: '#f47d22', color: '#ffffff' };
      case 'ecologica':
        return { backgroundColor: '#569079', color: '#ffffff' };
      case 'gastronómico':
        return { backgroundColor: '#e91e63', color: '#ffffff' };
      case 'artesanal':
        return { backgroundColor: '#9c27b0', color: '#ffffff' };
      case 'aventura':
        return { backgroundColor: '#ff5722', color: '#ffffff' };
      case 'espiritual':
        return { backgroundColor: '#3f51b5', color: '#ffffff' };
      default:
        return { backgroundColor: '#6b5c2a', color: '#ffffff' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reintentar
          </button>        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#f8f9fa' }}>      {/* Logo en esquina superior izquierda - Sin fondo */}
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
      <section style={{ background: 'linear-gradient(135deg, #03222b 0%, #569079 100%)' }} className="text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-6">
            Descubre Colombia Raíces
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Conecta con las comunidades locales y vive experiencias auténticas 
            que preservan nuestro patrimonio cultural y natural.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.EXPERIENCES}
              className="btn btn-primary px-8 py-4 text-lg rounded-lg font-semibold transition-all hover:transform hover:scale-105"
              style={{ 
                backgroundColor: '#fbd338', 
                color: '#03222b',
                border: 'none'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f2c832'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#fbd338'}
            >
              Explorar Experiencias
            </Link>
            <Link
              to={ROUTES.COMMUNITIES}
              className="btn btn-outline px-8 py-4 text-lg rounded-lg font-semibold transition-all hover:transform hover:scale-105"
              style={{ 
                border: '2px solid #fbd338', 
                color: '#fbd338',
                backgroundColor: 'transparent'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#fbd338';
                e.target.style.color = '#03222b';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#fbd338';
              }}
            >
              Conocer Comunidades
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Experiences Section */}
      <section className="py-16">
        <div className="container">          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#03222b' }}>
              Experiencias Destacadas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre las experiencias más populares que conectan el turismo 
              con las comunidades locales.
            </p>
          </div>          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperiences.map((experience) => (
              <div key={experience.id} className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                {experience.image_url && (
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={experience.image_url} 
                      alt={experience.title}
                      style={{
                        width: '100%',
                        height: '192px',
                        objectFit: 'cover'
                      }}
                      onLoad={(e) => {
                        console.log('✅ HomePage - Imagen cargada correctamente:', e.target.src);
                      }}
                      onError={(e) => {
                        console.error('❌ HomePage - Error al cargar imagen:', e.target.src);
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="h-48 bg-gray-200 flex items-center justify-center"><span class="text-gray-500">📸 ${experience.title}</span></div>`;
                      }}
                    />
                  </div>
                )}
                {!experience.image_url && (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">📸 {experience.title}</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold" style={{ color: '#03222b' }}>
                      {getTypeEmoji(experience.type)} {experience.title}
                    </h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium" style={getExperienceTypeColor(experience.type)}>
                      {experience.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{experience.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      🏘️ {experience.community_name}
                    </span>
                    <span className="text-sm text-gray-500">
                      ⏱️ {experience.duration_hours}h
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold" style={{ color: '#03222b' }}>
                      {formatPrice(experience.price)}
                    </span>
                    <Link
                      to={`${ROUTES.EXPERIENCES}/${experience.id}`}
                      className="btn btn-primary rounded-lg px-4 py-2 font-semibold transition-all hover:transform hover:scale-105"
                      style={{ 
                        backgroundColor: '#fbd338', 
                        color: '#03222b',
                        border: 'none'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#f2c832'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#fbd338'}
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={ROUTES.EXPERIENCES}
              className="btn btn-outline px-8 py-3 rounded-lg font-semibold transition-all hover:transform hover:scale-105"
              style={{ 
                border: '2px solid #03222b', 
                color: '#03222b',
                backgroundColor: 'transparent'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#03222b';
                e.target.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#03222b';
              }}
            >
              Ver Todas las Experiencias
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Communities Section */}
      <section className="py-16 bg-white">
        <div className="container">          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#03222b' }}>
              Comunidades Destacadas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conoce las comunidades que preservan la cultura y tradiciones colombianas.
            </p>
          </div>          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCommunities.map((community) => (
              <div key={community.id} className="card bg-gray-50 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                {community.image_url && (
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={community.image_url} 
                      alt={community.name}
                      style={{
                        width: '100%',
                        height: '192px',
                        objectFit: 'cover'
                      }}
                      onLoad={(e) => {
                        console.log('✅ HomePage - Comunidad imagen cargada correctamente:', e.target.src);
                      }}
                      onError={(e) => {
                        console.error('❌ HomePage - Error al cargar imagen de comunidad:', e.target.src);
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="h-48 bg-gray-200 flex items-center justify-center"><span class="text-gray-500">🏘️ ${community.name}</span></div>`;
                      }}
                    />
                  </div>
                )}
                {!community.image_url && (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">🏘️ {community.name}</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#03222b' }}>{community.name}</h3>
                  <p className="text-gray-600 mb-4">{community.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      📍 {community.region}
                    </span>
                    <span className="text-sm text-gray-500">
                      📧 {community.email}
                    </span>
                  </div>
                  <div className="text-center">
                    <Link
                      to={`${ROUTES.COMMUNITIES}/${community.id}`}
                      className="btn btn-primary rounded-lg px-4 py-2 font-semibold transition-all hover:transform hover:scale-105 w-full"
                      style={{ 
                        backgroundColor: '#569079', 
                        color: '#ffffff',
                        border: 'none'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#4a7c68'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#569079'}
                    >
                      Conocer Comunidad
                    </Link>
                  </div>                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={ROUTES.COMMUNITIES}
              className="btn btn-outline px-8 py-3 rounded-lg font-semibold transition-all hover:transform hover:scale-105"
              style={{ 
                border: '2px solid #03222b', 
                color: '#03222b',
                backgroundColor: 'transparent'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#03222b';
                e.target.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#03222b';
              }}
            >
              Ver Todas las Comunidades
            </Link>
          </div>
        </div>
      </section>{/* Call to Action Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #f47d22 0%, #fbd338 100%)' }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Eres Operador Turístico?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Únete a Colombia Raíces y conecta tu negocio con viajeros 
            que buscan experiencias auténticas y sostenibles.
          </p>
          <Link
            to={ROUTES.REGISTER}
            className="btn btn-primary px-8 py-4 text-lg rounded-lg font-semibold transition-all hover:transform hover:scale-105"
            style={{ 
              backgroundColor: '#03222b', 
              color: '#ffffff',
              border: 'none'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1a3842'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#03222b'}
          >
            Registrarse como Operador
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
