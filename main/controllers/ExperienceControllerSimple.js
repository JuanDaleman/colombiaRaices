// Controlador simple para gestionar experiencias con datos reales
const { ipcMain } = require('electron');
const ExperienceServiceSimple = require('../services/ExperienceServiceSimple');

class ExperienceControllerSimple {
  constructor() {
    this.experienceService = new ExperienceServiceSimple();
    this.setupEventHandlers();
  }

  // Método para obtener todas las experiencias (usado por electron.js)
  async getAllExperiences() {
    try {
      const experiences = await this.experienceService.findAll();
      return { success: true, data: experiences };
    } catch (error) {
      console.error('Error in getAllExperiences:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para obtener experiencia por ID (usado por electron.js)
  async getExperienceById(id) {
    try {
      const experience = await this.experienceService.findById(id);
      return { success: true, data: experience };
    } catch (error) {
      console.error('Error in getExperienceById:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para obtener experiencias por comunidad (usado por electron.js)
  async getExperiencesByCommunity(communityId) {
    try {
      const experiences = await this.experienceService.findByCommunity(communityId);
      return { success: true, data: experiences };
    } catch (error) {
      console.error('Error in getExperiencesByCommunity:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para obtener experiencias por tipo (usado por electron.js)
  async getExperiencesByType(type) {
    try {
      const experiences = await this.experienceService.findByType(type);
      return { success: true, data: experiences };
    } catch (error) {
      console.error('Error in getExperiencesByType:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para obtener tipos de experiencia (usado por electron.js)
  async getExperienceTypes() {
    try {
      const types = await this.experienceService.getTypes();
      return { success: true, data: types };
    } catch (error) {
      console.error('Error in getExperienceTypes:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para obtener estadísticas de experiencias (usado por electron.js)
  async getExperienceStats() {
    try {
      const stats = await this.experienceService.getStats();
      return { success: true, data: stats };
    } catch (error) {
      console.error('Error in getExperienceStats:', error);
      return { success: false, error: error.message };
    }
  }

  setupEventHandlers() {
    // Obtener todas las experiencias
    ipcMain.handle('experiences:findAllSimple', async () => {
      try {
        const experiences = await this.experienceService.findAll();
        return { success: true, data: experiences };
      } catch (error) {
        console.error('Error in experiences:findAllSimple:', error);
        return { success: false, error: error.message };
      }
    });

    // Obtener experiencia por ID
    ipcMain.handle('experiences:findByIdSimple', async (event, id) => {
      try {
        const experience = await this.experienceService.findById(id);
        return { success: true, data: experience };
      } catch (error) {
        console.error('Error in experiences:findByIdSimple:', error);
        return { success: false, error: error.message };
      }
    });

    // Obtener experiencias por comunidad
    ipcMain.handle('experiences:findByCommunitySimple', async (event, communityId) => {
      try {
        const experiences = await this.experienceService.findByCommunity(communityId);
        return { success: true, data: experiences };
      } catch (error) {
        console.error('Error in experiences:findByCommunitySimple:', error);
        return { success: false, error: error.message };
      }
    });

    // Obtener experiencias por tipo
    ipcMain.handle('experiences:findByTypeSimple', async (event, type) => {
      try {
        const experiences = await this.experienceService.findByType(type);
        return { success: true, data: experiences };
      } catch (error) {
        console.error('Error in experiences:findByTypeSimple:', error);
        return { success: false, error: error.message };
      }
    });

    // Obtener tipos de experiencia
    ipcMain.handle('experiences:getTypesSimple', async () => {
      try {
        const types = await this.experienceService.getTypes();
        return { success: true, data: types };
      } catch (error) {
        console.error('Error in experiences:getTypesSimple:', error);
        return { success: false, error: error.message };
      }
    });

    // Obtener estadísticas de experiencias
    ipcMain.handle('experiences:getStatsSimple', async () => {
      try {
        const stats = await this.experienceService.getStats();
        return { success: true, data: stats };
      } catch (error) {
        console.error('Error in experiences:getStatsSimple:', error);
        return { success: false, error: error.message };
      }
    });

    // Formatear precio
    ipcMain.handle('experiences:formatPriceSimple', async (event, price) => {
      try {
        const formattedPrice = this.experienceService.formatPrice(price);
        return { success: true, data: formattedPrice };
      } catch (error) {
        console.error('Error in experiences:formatPriceSimple:', error);
        return { success: false, error: error.message };
      }
    });
  }
}

module.exports = ExperienceControllerSimple;
