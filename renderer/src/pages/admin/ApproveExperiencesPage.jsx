import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TravelerHeader from '../../components/traveler/TravelerHeader';
import { ROUTES } from '../../utils/constants';

const ApproveExperiencesPage = () => {
  const navigate = useNavigate();
  const [pendingExperiences, setPendingExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPendingExperiences();
  }, []);
  const loadPendingExperiences = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (window.electronAPI && window.electronAPI.experiences) {
        // Usar la nueva API dedicada para obtener experiencias pendientes
        const result = await window.electronAPI.experiences.getPending();
        
        if (result.success) {
          setPendingExperiences(result.experiences || []);
          console.log('Experiencias pendientes cargadas:', result.experiences?.length || 0);
        } else {
          throw new Error(result.error || 'Error al cargar experiencias pendientes');
        }
      } else {
        // Fallback para desarrollo
        console.warn('ElectronAPI no disponible, usando datos mock');
        setPendingExperiences([]);
      }
    } catch (error) {
      console.error('Error cargando experiencias pendientes:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (experienceId) => {
    const confirmApprove = window.confirm('¿Estás seguro de que quieres aprobar esta experiencia?');
    
    if (!confirmApprove) return;

    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      if (window.electronAPI && window.electronAPI.experiences) {
        const result = await window.electronAPI.experiences.update({
          experienceId,
          updateData: { is_active: 1 }, // Aprobar = is_active = 1
          operatorId: userData.id,
          isAdmin: true // Importante: marcar como admin
        });
        
        if (result.success) {
          alert('✅ Experiencia aprobada exitosamente');
          // Recargar la lista
          loadPendingExperiences();
        } else {
          throw new Error(result.error || 'Error al aprobar experiencia');
        }
      } else {
        console.warn('ElectronAPI no disponible, simulando aprobación');
        alert('Experiencia aprobada (modo desarrollo)');
      }
    } catch (error) {
      console.error('Error aprobando experiencia:', error);
      alert(`Error al aprobar experiencia: ${error.message}`);
    }
  };

  const handleReject = async (experienceId) => {
    const confirmReject = window.confirm('¿Estás seguro de que quieres rechazar y eliminar esta experiencia?\n\nEsta acción no se puede deshacer.');
    
    if (!confirmReject) return;

    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      if (window.electronAPI && window.electronAPI.experiences) {
        const result = await window.electronAPI.experiences.delete({
          experienceId,
          operatorId: userData.id,
          isAdmin: true // Importante: marcar como admin
        });
        
        if (result.success) {
          alert('❌ Experiencia rechazada y eliminada');
          // Recargar la lista
          loadPendingExperiences();
        } else {
          throw new Error(result.error || 'Error al rechazar experiencia');
        }
      } else {
        console.warn('ElectronAPI no disponible, simulando rechazo');
        alert('Experiencia rechazada (modo desarrollo)');
      }
    } catch (error) {
      console.error('Error rechazando experiencia:', error);
      alert(`Error al rechazar experiencia: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <TravelerHeader />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2rem', 
              marginBottom: '20px' 
            }}>⏳</div>
            <p>Cargando experiencias pendientes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <TravelerHeader />
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '40px 20px' 
      }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <button
              onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '20px',
                fontSize: '0.9rem'
              }}
            >
              ← Volver al Dashboard
            </button>
            
            <h1 style={{ 
              color: '#03222b', 
              margin: 0,
              fontSize: '2rem' 
            }}>
              ✅ Aprobar Experiencias
            </h1>
          </div>
          
          <p style={{ 
            color: '#666', 
            marginBottom: '20px', 
            fontSize: '1.1rem' 
          }}>
            Revisa y aprueba las experiencias enviadas por los operadores
          </p>

          {error && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '15px',
              borderRadius: '5px',
              marginBottom: '20px',
              border: '1px solid #f5c6cb'
            }}>
              Error: {error}
              <button 
                onClick={loadPendingExperiences}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Reintentar
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {pendingExperiences.length === 0 ? (
          <div style={{
            backgroundColor: '#d1ecf1',
            color: '#0c5460',
            padding: '40px',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #b6ebf3'
          }}>
            <h3 style={{ color: '#0c5460', marginBottom: '15px' }}>
              🎉 ¡Excelente trabajo!
            </h3>
            <p style={{ marginBottom: '20px' }}>
              No hay experiencias pendientes de aprobación en este momento.
            </p>
            <button
              onClick={loadPendingExperiences}
              style={{
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              🔄 Refrescar
            </button>
          </div>
        ) : (
          <>
            <div style={{ 
              marginBottom: '20px',
              padding: '15px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '5px'
            }}>
              <strong>📋 {pendingExperiences.length} experiencia(s) pendiente(s)</strong>
              <p style={{ margin: '5px 0 0', color: '#856404' }}>
                Revisa cuidadosamente cada experiencia antes de aprobar o rechazar.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '20px'
            }}>
              {pendingExperiences.map((experience) => (
                <div
                  key={experience.id}
                  style={{
                    backgroundColor: 'white',
                    border: '2px solid #ffc107',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Header de la card */}
                  <div style={{
                    padding: '20px 20px 15px',
                    borderBottom: '1px solid #eee',
                    backgroundColor: '#fff3cd'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '10px'
                    }}>
                      <h3 style={{ 
                        color: '#03222b', 
                        margin: '0 10px 0 0',
                        fontSize: '1.2rem',
                        lineHeight: '1.3'
                      }}>
                        {experience.title}
                      </h3>
                      
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: '#ffc107',
                        color: '#212529'
                      }}>
                        PENDIENTE
                      </span>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      <strong>Tipo:</strong> {experience.type} | <strong>ID:</strong> {experience.id}
                    </div>
                  </div>

                  {/* Contenido de la experiencia */}
                  <div style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <strong style={{ color: '#03222b', fontSize: '0.9rem' }}>📝 Descripción:</strong>
                      <p style={{ 
                        margin: '5px 0 0', 
                        color: '#666', 
                        fontSize: '0.9rem',
                        lineHeight: '1.4'
                      }}>
                        {experience.description}
                      </p>
                    </div>

                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr', 
                      gap: '15px',
                      marginBottom: '15px'
                    }}>
                      <div>
                        <strong style={{ color: '#03222b', fontSize: '0.9rem' }}>💰 Precio:</strong>
                        <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.9rem' }}>
                          ${experience.price?.toLocaleString()} COP
                        </p>
                      </div>
                      <div>
                        <strong style={{ color: '#03222b', fontSize: '0.9rem' }}>⏱️ Duración:</strong>
                        <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.9rem' }}>
                          {experience.duration} horas
                        </p>
                      </div>
                      <div>
                        <strong style={{ color: '#03222b', fontSize: '0.9rem' }}>👥 Max. personas:</strong>
                        <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.9rem' }}>
                          {experience.maxParticipants}
                        </p>
                      </div>
                      <div>
                        <strong style={{ color: '#03222b', fontSize: '0.9rem' }}>🏘️ Comunidad:</strong>
                        <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.9rem' }}>
                          {experience.community?.name || 'No especificada'}
                        </p>
                      </div>
                    </div>

                    {experience.location && (
                      <div style={{ marginBottom: '15px' }}>
                        <strong style={{ color: '#03222b', fontSize: '0.9rem' }}>📍 Ubicación:</strong>
                        <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.9rem' }}>
                          {experience.location}
                        </p>
                      </div>
                    )}

                    {/* Información del operador */}
                    <div style={{ 
                      padding: '10px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '5px',
                      marginBottom: '20px',
                      fontSize: '0.8rem',
                      color: '#666'
                    }}>
                      <strong>Operador ID:</strong> {experience.operatorId} | 
                      <strong> Creada:</strong> {new Date(experience.createdAt).toLocaleDateString()}
                    </div>

                    {/* Botones de acción */}
                    <div style={{
                      display: 'flex',
                      gap: '10px'
                    }}>
                      <button
                        onClick={() => handleApprove(experience.id)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#218838';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#28a745';
                        }}
                      >
                        ✅ Aprobar
                      </button>
                      
                      <button
                        onClick={() => handleReject(experience.id)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#c82333';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#dc3545';
                        }}
                      >
                        ❌ Rechazar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApproveExperiencesPage;
