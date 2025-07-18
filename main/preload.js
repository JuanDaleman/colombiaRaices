const { contextBridge, ipcRenderer } = require('electron');

// Exponer APIs protegidas al contexto del renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Información del sistema
  getVersion: () => process.versions.electron,
  
  // APIs de autenticación
  auth: {
    login: (credentials) => ipcRenderer.invoke('auth:login', credentials),
    register: (userData) => ipcRenderer.invoke('auth:register', userData),
    logout: (data) => ipcRenderer.invoke('auth:logout', data),
  },
    // APIs de experiencias
  experiences: {
    search: (filters) => ipcRenderer.invoke('experiences:search', filters),
    getPopular: (options) => ipcRenderer.invoke('experiences:popular', options),
    getRecent: (options) => ipcRenderer.invoke('experiences:recent', options),
    getPending: () => ipcRenderer.invoke('experiences:pending'),
    create: (experienceData) => ipcRenderer.invoke('experiences:create', experienceData),
    update: (data) => ipcRenderer.invoke('experiences:update', data),
    delete: (data) => ipcRenderer.invoke('experiences:delete', data),
    calculateAvailability: (data) => ipcRenderer.invoke('experiences:availability', data),
    calculatePrice: (data) => ipcRenderer.invoke('experiences:price', data),
    getStats: () => ipcRenderer.invoke('experiences:stats'),
    getByOperator: (data) => ipcRenderer.invoke('experiences:by-operator', data),
    getByCommunity: (data) => ipcRenderer.invoke('experiences:by-community', data),
  },
  
  // APIs de comunidades
  communities: {
    getAll: () => ipcRenderer.invoke('communities:all'),
    getById: (data) => ipcRenderer.invoke('communities:by-id', data),
    getByRegion: (data) => ipcRenderer.invoke('communities:by-region', data),
    getStats: () => ipcRenderer.invoke('communities:stats'),
  },
  // APIs de experiencias simples
  experiencesSimple: {
    getAll: () => ipcRenderer.invoke('experiences-simple:all'),
    getById: (data) => ipcRenderer.invoke('experiences-simple:by-id', data),
    getByCommunity: (data) => ipcRenderer.invoke('experiences-simple:by-community', data),
    getByType: (data) => ipcRenderer.invoke('experiences-simple:by-type', data),
    getTypes: () => ipcRenderer.invoke('experiences-simple:types'),
    getRegions: () => ipcRenderer.invoke('experiences-simple:regions'),
    getPriceRanges: () => ipcRenderer.invoke('experiences-simple:price-ranges'),
    search: (filters) => ipcRenderer.invoke('experiences-simple:search', filters),
    getStats: () => ipcRenderer.invoke('experiences-simple:stats'),
  },
  
  // Placeholder para otras APIs
  reservations: {},
});
