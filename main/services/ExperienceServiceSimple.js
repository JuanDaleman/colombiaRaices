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
          e.id, e.title, e.description, e.type, e.price, e.duration_hours,
          e.max_participants, e.image_url,
          c.name as community_name, c.region as community_region,
          e.created_at, e.updated_at, e.is_active
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
          e.id, e.title, e.description, e.type, e.price, e.duration_hours,
          e.max_participants, e.image_url, e.thumbnail_url, e.image_alt,
          c.name as community_name, c.region as community_region,
          c.id as community_id,
          e.created_at, e.updated_at, e.is_active
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
}

module.exports = ExperienceServiceSimple;
