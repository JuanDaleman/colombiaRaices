import React, { useState } from 'react';
import { EXPERIENCE_TYPES } from '../../utils/constants';

const ExperienceForm = ({ 
  onSubmit, 
  onCancel, 
  initialData = null,
  isLoading = false 
}) => {  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    type: initialData?.type || '',
    price: initialData?.price || '',
    duration_hours: initialData?.duration_hours || '',
    max_participants: initialData?.max_participants || '',
    specific_location: initialData?.specific_location || '',
    image_url: initialData?.image_url || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validación título
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (formData.title.length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres';
    }

    // Validación descripción
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (formData.description.length < 50) {
      newErrors.description = 'La descripción debe tener al menos 50 caracteres';
    }

    // Validación tipo
    if (!formData.type) {
      newErrors.type = 'Debes seleccionar un tipo de experiencia';
    }

    // Validación precio
    if (!formData.price) {
      newErrors.price = 'El precio es requerido';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    // Validación duración
    if (!formData.duration_hours) {
      newErrors.duration_hours = 'La duración es requerida';
    } else if (parseInt(formData.duration_hours) < 1) {
      newErrors.duration_hours = 'La duración debe ser al menos 1 hora';
    }

    // Validación participantes máximo
    if (!formData.max_participants) {
      newErrors.max_participants = 'El número máximo de participantes es requerido';
    } else if (parseInt(formData.max_participants) < 1) {
      newErrors.max_participants = 'Debe permitir al menos 1 participante';
    }    // Validación ubicación específica (opcional pero recomendada)
    if (formData.specific_location.trim() && formData.specific_location.length < 10) {
      newErrors.specific_location = 'Si proporcionas ubicación, debe ser específica (mín. 10 caracteres)';
    }

    // Validación imagen URL (opcional, pero si se proporciona debe ser válida)
    if (formData.image_url.trim()) {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      const isValidImageUrl = urlPattern.test(formData.image_url) || 
                              formData.image_url.startsWith('./images/') ||
                              formData.image_url.startsWith('/images/');
      
      if (!isValidImageUrl) {
        newErrors.image_url = 'Por favor ingrese una URL de imagen válida';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }    // Convertir a números donde sea necesario y preparar datos para base de datos
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      duration_hours: parseInt(formData.duration_hours),
      max_participants: parseInt(formData.max_participants),
      // Flujo de aprobación: nuevas experiencias inician como inactivas
      is_active: initialData ? formData.is_active : 0,
      // Si no hay imagen, usar una por defecto
      image_url: formData.image_url.trim() || './images/experiences/default_experience.jpg'
    };

    onSubmit(processedData);
  };

  // Estilos
  const formStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const fieldStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#03222b'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease'
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '12px',
    marginTop: '5px'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ 
        color: '#03222b', 
        marginBottom: '30px',
        fontSize: '1.5rem',
        borderBottom: '2px solid #fbd338',
        paddingBottom: '10px'
      }}>
        {initialData ? 'Editar Experiencia' : 'Nueva Experiencia'}
      </h2>

      <div style={fieldStyle}>
        <label style={labelStyle}>
          Título de la experiencia *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{
            ...inputStyle,
            borderColor: errors.title ? '#dc3545' : '#ddd'
          }}
          placeholder="Ej: Aventura en el Valle de Cocora"
        />
        {errors.title && <div style={errorStyle}>{errors.title}</div>}
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>
          Descripción *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          style={{
            ...inputStyle,
            borderColor: errors.description ? '#dc3545' : '#ddd',
            resize: 'vertical'
          }}
          placeholder="Describe la experiencia, qué incluye, qué pueden esperar los viajeros... (mínimo 50 caracteres)"
        />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
          {formData.description.length}/50 caracteres mínimo
        </div>
        {errors.description && <div style={errorStyle}>{errors.description}</div>}
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>
          Tipo de experiencia *
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          style={{
            ...inputStyle,
            borderColor: errors.type ? '#dc3545' : '#ddd'
          }}
        >
          <option value="">Selecciona un tipo</option>
          <option value={EXPERIENCE_TYPES.CULTURAL}>Cultural</option>
          <option value={EXPERIENCE_TYPES.HISTORICAL}>Histórica</option>
          <option value={EXPERIENCE_TYPES.ECOLOGICAL}>Ecológica</option>
        </select>
        {errors.type && <div style={errorStyle}>{errors.type}</div>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            Precio por persona (COP) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="1000"
            style={{
              ...inputStyle,
              borderColor: errors.price ? '#dc3545' : '#ddd'
            }}
            placeholder="50000"
          />
          {errors.price && <div style={errorStyle}>{errors.price}</div>}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Duración (horas) *
          </label>
          <input
            type="number"
            name="duration_hours"
            value={formData.duration_hours}
            onChange={handleChange}
            min="1"
            step="1"
            style={{
              ...inputStyle,
              borderColor: errors.duration_hours ? '#dc3545' : '#ddd'
            }}
            placeholder="4"
          />
          {errors.duration_hours && <div style={errorStyle}>{errors.duration_hours}</div>}
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>
          Número máximo de participantes *
        </label>
        <input
          type="number"
          name="max_participants"
          value={formData.max_participants}
          onChange={handleChange}
          min="1"
          step="1"
          style={{
            ...inputStyle,
            borderColor: errors.max_participants ? '#dc3545' : '#ddd'
          }}
          placeholder="10"
        />
        {errors.max_participants && <div style={errorStyle}>{errors.max_participants}</div>}
      </div>      <div style={fieldStyle}>
        <label style={labelStyle}>
          Ubicación específica (opcional)
        </label>
        <input
          type="text"
          name="specific_location"
          value={formData.specific_location}
          onChange={handleChange}
          style={{
            ...inputStyle,
            borderColor: errors.specific_location ? '#dc3545' : '#ddd'
          }}
          placeholder="Ej: Finca La Esperanza, vereda El Rosal, a 15 min del centro"
        />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
          Si no especificas, se usará la ubicación de tu comunidad
        </div>
        {errors.specific_location && <div style={errorStyle}>{errors.specific_location}</div>}
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>
          URL de imagen (opcional)
        </label>
        <input
          type="url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          style={{
            ...inputStyle,
            borderColor: errors.image_url ? '#dc3545' : '#ddd'
          }}
          placeholder="https://ejemplo.com/imagen.jpg o ./images/experiences/mi-imagen.jpg"
        />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
          Si no especificas una imagen, se asignará una por defecto
        </div>
        {errors.image_url && <div style={errorStyle}>{errors.image_url}</div>}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        justifyContent: 'flex-end',
        marginTop: '30px'
      }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            border: '1px solid #6c757d',
            backgroundColor: 'white',
            color: '#6c757d',
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          Cancelar
        </button>
        
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            border: 'none',
            backgroundColor: isLoading ? '#ccc' : '#fbd338',
            color: isLoading ? '#666' : '#03222b',
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? 'Guardando...' : 'Guardar Experiencia'}
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;
