import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExperiencesPageSimple = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch experiences and types simultaneously
        const [experiencesResponse, typesResponse] = await Promise.all([
          window.electronAPI.experiencesSimple.getAll(),
          window.electronAPI.experiencesSimple.getTypes()
        ]);

        if (experiencesResponse.success) {
          setExperiences(experiencesResponse.data);
        } else {
          setError(experiencesResponse.error || 'Error al cargar las experiencias');
        }

        if (typesResponse.success) {
          setTypes(typesResponse.data);
        }
      } catch (err) {
        setError('Error al conectar con la base de datos');
        console.error('Error loading experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTypeFilter = async (type) => {
    setSelectedType(type);
    setLoading(true);
    
    try {
      const response = type === 'all' 
        ? await window.electronAPI.experiencesSimple.getAll()
        : await window.electronAPI.experiencesSimple.getByType({ type });

      if (response.success) {
        setExperiences(response.data);
      } else {
        setError(response.error || 'Error al filtrar experiencias');
      }
    } catch (err) {
      setError('Error al filtrar experiencias');
      console.error('Error filtering experiences:', err);
    } finally {
      setLoading(false);
    }
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

  const experienceCardStyle = {
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

  const filterButtonStyle = {
    backgroundColor: '#e0e0e0',
    color: '#03222b',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    cursor: 'pointer',
    margin: '0 5px 10px 0',
    transition: 'all 0.3s ease'
  };

  const activeFilterButtonStyle = {
    ...filterButtonStyle,
    backgroundColor: '#fbd338',
    fontWeight: 'bold'
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

  const typeEmojiMap = {
    'Cultural': '🎭',
    'Gastronómico': '🍽️',
    'Artesanal': '🎨',
    'Eco-turismo': '🌿',
    'Aventura': '🏔️',
    'Histórico': '🏛️',
    'Espiritual': '🕯️',
    'Educativo': '📚'
  };

  const getTypeEmoji = (type) => {
    return typeEmojiMap[type] || '🌟';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={{ color: '#03222b', margin: 0 }}>🌟 Experiencias</h1>
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
            <div>Cargando experiencias...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={{ color: '#03222b', margin: 0 }}>🌟 Experiencias</h1>
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
        <h1 style={{ color: '#03222b', margin: 0 }}>🌟 Experiencias</h1>
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
          Explorar Experiencias Auténticas
        </h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Descubre experiencias únicas en comunidades colombianas
        </p>
        
        {/* Filter buttons */}
        <div style={{ marginBottom: '20px' }}>
          <button
            style={selectedType === 'all' ? activeFilterButtonStyle : filterButtonStyle}
            onClick={() => handleTypeFilter('all')}
          >
            Todas
          </button>
          {types.map((type) => (
            <button
              key={type}
              style={selectedType === type ? activeFilterButtonStyle : filterButtonStyle}
              onClick={() => handleTypeFilter(type)}
            >
              {getTypeEmoji(type)} {type}
            </button>
          ))}
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px', 
          marginTop: '30px' 
        }}>
          {experiences.map((experience) => (
            <div 
              key={experience.id}
              style={experienceCardStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.1)';
              }}
              onClick={() => {                // Navigate to experience detail page in the future
                console.log('Viewing experience:', experience.title);
              }}
            >              {experience.image_url && (
                <img 
                  src={experience.image_url} 
                  alt={experience.title}
                  style={imageStyle}
                  onLoad={(e) => {
                    console.log('✅ Imagen cargada correctamente:', e.target.src);
                  }}
                  onError={(e) => {
                    console.error('❌ Error al cargar imagen:', e.target.src);
                    console.error('Original URL from DB:', experience.image_url);
                    // Try fallback image or hide if not available
                    e.target.style.display = 'none';
                  }}
                />
              )}<h3 style={{ color: '#03222b', marginBottom: '10px' }}>
                {getTypeEmoji(experience.type)} {experience.title}
              </h3>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                {experience.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <p style={{ color: '#fbd338', fontWeight: 'bold', margin: 0 }}>
                  {formatPrice(experience.price)}
                </p>                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  ⏱️ {experience.duration_hours} horas
                </p>
              </div>
              <p style={{ color: '#03222b', fontSize: '14px', marginBottom: '5px' }}>
                🏷️ {experience.type}
              </p>
              {experience.community_name && (
                <p style={{ color: '#666', fontSize: '12px' }}>
                  🏘️ {experience.community_name}
                </p>
              )}
            </div>
          ))}
        </div>

        {experiences.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔍</div>
            <div>No se encontraron experiencias para el filtro seleccionado</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperiencesPageSimple;
