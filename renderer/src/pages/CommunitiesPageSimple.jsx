import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CommunitiesPageSimple = () => {
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        const response = await window.electronAPI.communities.getAll();
        if (response.success) {
          setCommunities(response.data);
        } else {
          setError(response.error || 'Error al cargar las comunidades');
        }
      } catch (err) {
        setError('Error al conectar con la base de datos');
        console.error('Error loading communities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

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

  const communityCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'left',
    backgroundColor: 'white',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '15px'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    color: '#666'
  };

  const errorStyle = {
    color: '#d32f2f',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#ffebee',
    borderRadius: '8px',
    marginTop: '20px'
  };

  const regionEmojiMap = {
    'Caribe': '🌴',
    'Andina': '🏔️',
    'Amazónica': '🌿',
    'Pacífica': '🌊',
    'Orinoquía': '🌾',
    'Insular': '🏝️'
  };

  const getRegionEmoji = (region) => {
    return regionEmojiMap[region] || '🏘️';
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={{ color: '#03222b', margin: 0 }}>🏘️ Comunidades</h1>
          <div>
            <button
              style={buttonStyle}
              onClick={() => navigate('/traveler-dashboard')}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f2c832'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#fbd338'}
            >
              ⬅️ Volver al Dashboard
            </button>
          </div>
        </div>
        <div style={loadingStyle}>
          <div>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
            <div>Cargando comunidades...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={{ color: '#03222b', margin: 0 }}>🏘️ Comunidades</h1>
          <div>
            <button
              style={buttonStyle}
              onClick={() => navigate('/traveler-dashboard')}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f2c832'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#fbd338'}
            >
              ⬅️ Volver al Dashboard
            </button>
          </div>
        </div>
        <div style={errorStyle}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️</div>
          <div>{error}</div>
        </div>
      </div>
    );
  }

  const buttonStyle = {
    backgroundColor: '#fbd338',
    color: '#03222b',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={{ color: '#03222b', margin: 0 }}>🏘️ Comunidades</h1>
        <div>
          <button
            style={buttonStyle}
            onClick={() => navigate('/traveler-dashboard')}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f2c832'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#fbd338'}
          >
            ⬅️ Volver al Dashboard
          </button>
        </div>
      </div>      <div style={cardStyle}>
        <h2 style={{ color: '#03222b', marginBottom: '20px' }}>
          Conecta con Comunidades Locales
        </h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Conoce las comunidades que preservan nuestro patrimonio cultural
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px', 
          marginTop: '30px' 
        }}>
          {communities.map((community) => (
            <div 
              key={community.id}
              style={communityCardStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.1)';
              }}
              onClick={() => {
                // Navigate to community detail page in the future
                console.log('Viewing community:', community.name);
              }}
            >              {community.image_url && (
                <img 
                  src={community.image_url} 
                  alt={community.name}
                  style={imageStyle}
                  onLoad={(e) => {
                    console.log('✅ Imagen cargada correctamente:', e.target.src);
                  }}
                  onError={(e) => {
                    console.error('❌ Error al cargar imagen:', e.target.src);
                    console.error('Original URL from DB:', community.image_url);
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <h3 style={{ color: '#03222b', marginBottom: '10px' }}>
                {getRegionEmoji(community.region)} {community.name}
              </h3>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                {community.description}
              </p>              <p style={{ color: '#03222b', fontSize: '14px', marginBottom: '8px' }}>
                📍 {community.address}
              </p>
              <p style={{ color: '#03222b', fontSize: '14px', marginBottom: '8px' }}>
                🗺️ Región {community.region}
              </p>
              {community.contact_email && (
                <p style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>
                  📧 {community.contact_email}
                </p>
              )}
              {community.contact_phone && (
                <p style={{ color: '#666', fontSize: '12px' }}>
                  📞 {community.contact_phone}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunitiesPageSimple;
