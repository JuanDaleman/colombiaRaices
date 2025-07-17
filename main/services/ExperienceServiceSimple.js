// Servicio simple para gestionar experiencias con datos reales
const db = require('../database/database');

class ExperienceServiceSimple {
  constructor() {
    this.db = db;
  }

  // Obtener todas las experiencias con información de comunidad
  async findAll() {
    try {
      await this.db.connect();
      const result = await this.db.all(`
        SELECT 
          e.id, 
          e.title as nombre, 
          e.description as descripcion, 
          e.type as tipo, 
          e.price as precio, 
          e.duration_hours as duracion_horas,
          e.max_participants, 
          e.image_url,
          c.name as community_name, 
          c.region as community_region,
          c.name as ubicacion,
          e.created_at, 
          e.updated_at, 
          e.is_active
        FROM experiences e
        JOIN communities c ON e.community_id = c.id
        WHERE e.is_active = 1
        ORDER BY e.title
      `);
      
      return result;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  }

  // Obtener experiencia por ID
  async findById(id) {
    try {
      const experience = await this.db.connect(); const result = await this.db.all(`
        SELECT 
          e.id, 
          e.title as nombre, 
          e.description as descripcion, 
          e.type as tipo, 
          e.price as precio, 
          e.duration_hours as duracion_horas,
          e.max_participants, 
          e.image_url, 
          e.thumbnail_url, 
          e.image_alt,
          c.name as community_name, 
          c.region as community_region,
          c.id as community_id,
          c.name as ubicacion,
          e.created_at, 
          e.updated_at, 
          e.is_active
        FROM experiences e
        JOIN communities c ON e.community_id = c.id
        WHERE e.id = ? AND e.is_active = 1
      `, [id]);
      
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching experience:', error);
      throw error;
    }
  }

  // Obtener experiencias por comunidad
  async findByCommunity(communityId) {
    try {
      const experiences = await this.db.connect(); const result = await this.db.all(`
        SELECT 
          e.id, e.title, e.description, e.type, e.price, e.duration_hours,
          e.max_participants, e.image_url, e.thumbnail_url, e.image_alt,
          c.name as community_name, c.region as community_region,
          e.created_at, e.updated_at, e.is_active
        FROM experiences e
        JOIN communities c ON e.community_id = c.id
        WHERE e.community_id = ? AND e.is_active = 1
        ORDER BY e.title
      `, [communityId]);
      
      return result;
    } catch (error) {
      console.error('Error fetching experiences by community:', error);
      throw error;
    }
  }

  // Obtener experiencias por tipo
  async findByType(type) {
    try {
      const experiences = await this.db.connect(); const result = await this.db.all(`
        SELECT 
          e.id, e.title, e.description, e.type, e.price, e.duration_hours,
          e.max_participants, e.image_url, e.thumbnail_url, e.image_alt,
          c.name as community_name, c.region as community_region,
          e.created_at, e.updated_at, e.is_active
        FROM experiences e
        JOIN communities c ON e.community_id = c.id
        WHERE e.type = ? AND e.is_active = 1
        ORDER BY e.title
      `, [type]);
      
      return result;
    } catch (error) {
      console.error('Error fetching experiences by type:', error);
      throw error;
    }
  }

  // Formatear precio en pesos colombianos
  formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  }

  // Obtener tipos de experiencia únicos
  async getTypes() {
    try {
      const types = await this.db.connect(); const result = await this.db.all(`
        SELECT DISTINCT type 
        FROM experiences 
        WHERE is_active = 1
        ORDER BY type
      `);
      
      return result.map(t => t.type);
    } catch (error) {
      console.error('Error fetching experience types:', error);
      throw error;
    }
  }

  // Obtener estadísticas de experiencias
  async getStats() {
    try {
      const stats = await this.db.connect(); const result = await this.db.all(`
        SELECT 
          COUNT(*) as total_experiences,
          COUNT(DISTINCT type) as total_types,
          COUNT(DISTINCT community_id) as communities_with_experiences,
          AVG(price) as average_price,
          AVG(duration_hours) as average_duration
        FROM experiences
        WHERE is_active = 1
      `);
      
      return result[0];
    } catch (error) {
      console.error('Error fetching experience stats:', error);
      throw error;
    }
  }

  // Búsqueda filtrada de experiencias
  async findFiltered(filters = {}) {
    try {
      await this.db.connect();
      
      let query = `
        SELECT 
          e.id, 
          e.title as nombre, 
          e.description as descripcion, 
          e.type as tipo, 
          e.price as precio, 
          e.duration_hours as duracion_horas,
          e.max_participants, 
          e.image_url,
          c.name as community_name, 
          c.region as community_region,
          c.name as ubicacion,
          e.created_at, 
          e.updated_at, 
          e.is_active
        FROM experiences e
        JOIN communities c ON e.community_id = c.id
        WHERE e.is_active = 1
      `;
      
      const params = [];
      
      // Filtro por tipo
      if (filters.tipo && filters.tipo !== 'all') {
        query += ` AND e.type = ?`;
        params.push(filters.tipo);
      }
      
      // Filtro por región
      if (filters.region && filters.region !== 'all') {
        query += ` AND c.region = ?`;
        params.push(filters.region);
      }
      
      // Filtro por rango de precio
      if (filters.precioMin) {
        query += ` AND e.price >= ?`;
        params.push(parseFloat(filters.precioMin));
      }
      
      if (filters.precioMax) {
        query += ` AND e.price <= ?`;
        params.push(parseFloat(filters.precioMax));
      }
      
      query += ` ORDER BY e.title`;
      
      const result = await this.db.all(query, params);
      return result;
    } catch (error) {
      console.error('Error filtering experiences:', error);
      throw error;
    }
  }

  // Obtener tipos únicos de experiencias
  async getTypes() {
    try {
      await this.db.connect();
      const result = await this.db.all(`
        SELECT DISTINCT type as tipo
        FROM experiences 
        WHERE is_active = 1 AND type IS NOT NULL
        ORDER BY type
      `);
      return result;
    } catch (error) {
      console.error('Error fetching experience types:', error);
      throw error;
    }
  }

  // Obtener regiones únicas
  async getRegions() {
    try {
      await this.db.connect();
      const result = await this.db.all(`
        SELECT DISTINCT region
        FROM communities 
        WHERE region IS NOT NULL
        ORDER BY region
      `);
      return result;
    } catch (error) {
      console.error('Error fetching regions:', error);
      throw error;
    }
  }
}

module.exports = ExperienceServiceSimple;
