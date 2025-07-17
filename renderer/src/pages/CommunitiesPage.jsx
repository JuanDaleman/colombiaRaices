// Página de Comunidades
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES, REGIONS } from '../utils/constants';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CommunitiesPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('all');

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const mockCommunities = [
        {
          id: 1,
          name: 'Barichara',
          region: REGIONS.BARICHARA,
          description: 'Pueblo patrimonio con arquitectura colonial perfectamente preservada. Conocido como el pueblo más bonito de Colombia.',
          experiencesCount: 5,
          population: 7000,
          founded: 1705,
          highlights: ['Arquitectura colonial', 'Artesanías', 'Camino Real'],
          contact: {
            email: 'turismo@barichara.gov.co',
            phone: '+57 300 123 4567'
          }
        },
        {
          id: 2,
          name: 'Comunidad Wayuu',
          region: REGIONS.GUAJIRA,
          description: 'Cultura ancestral wayuu con tradiciones milenarias. Pueblo indígena que preserva sus costumbres y lengua.',
          experiencesCount: 3,
          population: 400000,
          founded: 'Ancestral',
          highlights: ['Artesanías wayuu', 'Ranchería tradicional', 'Ceremonias ancestrales'],
          contact: {
            email: 'wayuu@laguajira.gov.co',
            phone: '+57 315 987 6543'
          }
        },
        {
          id: 3,
          name: 'Nuquí',
          region: REGIONS.CHOCO,
          description: 'Biodiversidad única en el Pacífico colombiano. Punto de encuentro entre selva y océano.',
          experiencesCount: 4,
          population: 8500,
          founded: 1942,
          highlights: ['Avistamiento de ballenas', 'Selva tropical', 'Playas vírgenes'],
          contact: {
            email: 'turismo@nuqui.gov.co',
            phone: '+57 321 456 7890'
          }
        },
        {
          id: 4,
          name: 'Mompox',
          region: REGIONS.MOMPOX,
          description: 'Ciudad colonial patrimonio mundial con tradiciones artesanales únicas.',
          experiencesCount: 6,
          population: 42000,
          founded: 1537,
          highlights: ['Filigrana', 'Arquitectura colonial', 'Río Magdalena'],
          contact: {
            email: 'cultura@mompox.gov.co',
            phone: '+57 310 234 5678'
          }
        },
        {
          id: 5,
          name: 'Leticia',
          region: REGIONS.AMAZONIA,
          description: 'Puerta de entrada al Amazonas colombiano con comunidades indígenas.',
          experiencesCount: 8,
          population: 50000,
          founded: 1867,
          highlights: ['Selva amazónica', 'Comunidades indígenas', 'Río Amazonas'],
          contact: {
            email: 'turismo@leticia.gov.co',
            phone: '+57 318 765 4321'
          }
        }
      ];

      setCommunities(mockCommunities);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCommunities = communities.filter(community => {
    return selectedRegion === 'all' || community.region === selectedRegion;
  });

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
          <h1 className="text-4xl font-bold mb-4">Comunidades</h1>
          <p className="text-xl">
            Conoce las comunidades que preservan la cultura y tradiciones colombianas
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6">
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
                <option value="all">Todas las regiones</option>
                {Object.values(REGIONS).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setSelectedRegion('all')}
                className="btn btn-outline border-green text-green hover:bg-green hover:text-white px-6 py-2"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="py-12">
        <div className="container">
          <div className="mb-6">
            <p className="text-gray-600">
              Mostrando {filteredCommunities.length} comunidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommunities.map((community) => (
              <div key={community.id} className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">🏘️ {community.name}</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-green">{community.name}</h3>
                    <span className="px-2 py-1 bg-green text-white rounded-full text-xs font-medium">
                      {community.region}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{community.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">👥 Población:</span>
                      <span className="text-gray-700">{community.population.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">📅 Fundada:</span>
                      <span className="text-gray-700">{community.founded}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">🌟 Experiencias:</span>
                      <span className="text-gray-700">{community.experiencesCount}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-green mb-2">Destacados:</h4>
                    <div className="flex flex-wrap gap-1">
                      {community.highlights.map((highlight, index) => (
                        <span key={index} className="px-2 py-1 bg-yellow text-green rounded-full text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <p>📧 {community.contact.email}</p>
                      <p>📞 {community.contact.phone}</p>
                    </div>
                    <Link
                      to={`${ROUTES.COMMUNITIES}/${community.id}`}
                      className="btn btn-primary bg-yellow text-green hover:bg-yellow-600"
                    >
                      Explorar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCommunities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron comunidades en la región seleccionada.</p>
              <button
                onClick={() => setSelectedRegion('all')}
                className="btn btn-primary bg-yellow text-green hover:bg-yellow-600 mt-4"
              >
                Ver Todas las Comunidades
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CommunitiesPage;
