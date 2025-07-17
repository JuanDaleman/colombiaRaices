// Página de Experiencias
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES, EXPERIENCE_TYPES, REGIONS } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

const ExperiencesPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const mockExperiences = [
        {
          id: 1,
          title: 'Tour Histórico por Barichara',
          description: 'Descubre la arquitectura colonial y la historia de este pueblo patrimonio.',
          type: EXPERIENCE_TYPES.HISTORICAL,
          price: 45000,
          duration: 3,
          community: 'Barichara',
          region: REGIONS.BARICHARA,
          maxParticipants: 12,
          rating: 4.8,
          reviews: 156
        },
        {
          id: 2,
          title: 'Experiencia Wayuu en La Guajira',
          description: 'Vive la cultura ancestral wayuu con artesanías y tradiciones.',
          type: EXPERIENCE_TYPES.CULTURAL,
          price: 120000,
          duration: 8,
          community: 'Comunidad Wayuu',
          region: REGIONS.GUAJIRA,
          maxParticipants: 8,
          rating: 4.9,
          reviews: 89
        },
        {
          id: 3,
          title: 'Ecoturismo en el Chocó',
          description: 'Explora la biodiversidad única del Chocó biogeográfico.',
          type: EXPERIENCE_TYPES.ECOLOGICAL,
          price: 180000,
          duration: 12,
          community: 'Nuquí',
          region: REGIONS.CHOCO,
          maxParticipants: 6,
          rating: 4.7,
          reviews: 234
        },
        {
          id: 4,
          title: 'Artesanías de Mompox',
          description: 'Aprende el arte de la filigrana y la cerámica tradicional.',
          type: EXPERIENCE_TYPES.CULTURAL,
          price: 75000,
          duration: 4,
          community: 'Mompox',
          region: REGIONS.MOMPOX,
          maxParticipants: 10,
          rating: 4.6,
          reviews: 67
        },
        {
          id: 5,
          title: 'Aventura en el Amazonas',
          description: 'Explora la selva amazónica con guías nativos.',
          type: EXPERIENCE_TYPES.ECOLOGICAL,
          price: 250000,
          duration: 16,
          community: 'Leticia',
          region: REGIONS.AMAZONIA,
          maxParticipants: 8,
          rating: 4.9,
          reviews: 123
        }
      ];

      setExperiences(mockExperiences);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredExperiences = experiences.filter(exp => {
    const typeMatch = selectedType === 'all' || exp.type === selectedType;
    const regionMatch = selectedRegion === 'all' || exp.region === selectedRegion;
    return typeMatch && regionMatch;
  });

  const getExperienceTypeColor = (type) => {
    switch (type) {
      case EXPERIENCE_TYPES.CULTURAL:
        return 'bg-yellow text-green';
      case EXPERIENCE_TYPES.HISTORICAL:
        return 'bg-orange text-white';
      case EXPERIENCE_TYPES.ECOLOGICAL:
        return 'bg-green text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Experiencias Turísticas</h1>
          <p className="text-xl">
            Descubre experiencias auténticas que conectan con nuestras comunidades
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Experiencia
              </label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              >
                <option value="all">Todas</option>
                <option value={EXPERIENCE_TYPES.CULTURAL}>Cultural</option>
                <option value={EXPERIENCE_TYPES.HISTORICAL}>Histórica</option>
                <option value={EXPERIENCE_TYPES.ECOLOGICAL}>Ecológica</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="region-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Región
              </label>
              <select
                id="region-filter"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
              >
                <option value="all">Todas</option>
                {Object.values(REGIONS).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedRegion('all');
                }}
                className="btn btn-outline border-green text-green hover:bg-green hover:text-white px-6 py-2"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-12">
        <div className="container">
          <div className="mb-6">
            <p className="text-gray-600">
              Mostrando {filteredExperiences.length} experiencias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((experience) => (
              <div key={experience.id} className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">📸 {experience.title}</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-green">{experience.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceTypeColor(experience.type)}`}>
                      {experience.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{experience.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">📍 {experience.community}, {experience.region}</span>
                      <span className="text-gray-500">⏱️ {experience.duration}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">👥 Hasta {experience.maxParticipants} personas</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-gray-500 ml-1">{experience.rating} ({experience.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green">
                      {formatCurrency(experience.price)}
                    </span>
                    <Link
                      to={`${ROUTES.EXPERIENCES}/${experience.id}`}
                      className="btn btn-primary bg-yellow text-green hover:bg-yellow-600"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredExperiences.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron experiencias con los filtros seleccionados.</p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedRegion('all');
                }}
                className="btn btn-primary bg-yellow text-green hover:bg-yellow-600 mt-4"
              >
                Ver Todas las Experiencias
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExperiencesPage;
