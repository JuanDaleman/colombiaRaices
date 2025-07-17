const { app, BrowserWindow, ipcMain, protocol } = require('electron');
const path = require('path');
const fs = require('fs');
const { initializeModels, closeModels } = require('./database/models');
const { EventObserver, APP_EVENTS } = require('./utils/observer');
const { setupEventListeners } = require('./utils/eventSetup');
const AuthController = require('./controllers/AuthController');
const ExperienceController = require('./controllers/ExperienceController');
const CommunityController = require('./controllers/CommunityController');
const ExperienceControllerSimple = require('./controllers/ExperienceControllerSimple');

// Mantener una referencia global del objeto window
let mainWindow;

// Inicializar controladores
const authController = new AuthController();
const experienceController = new ExperienceController();
const communityController = new CommunityController();
const experienceControllerSimple = new ExperienceControllerSimple();

// IPC Handlers para autenticación
ipcMain.handle('auth:login', async (event, { email, password }) => {
  try {
    return await authController.login(email, password);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('auth:register', async (event, userData) => {
  try {
    return await authController.register(userData);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('auth:logout', async (event, { userId }) => {
  try {
    return await authController.logout(userId);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// IPC Handlers para experiencias
ipcMain.handle('experiences:search', async (event, filters) => {
  try {
    return await experienceController.searchExperiences(filters);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('experiences:popular', async (event, { limit = 10 }) => {
  try {
    return await experienceController.getPopularExperiences(limit);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('experiences:recent', async (event, { limit = 10 }) => {
  try {
    return await experienceController.getRecentExperiences(limit);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('experiences:create', async (event, experienceData) => {
  try {
    return await experienceController.createExperience(experienceData);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('experiences:update', async (event, { experienceId, updateData, operatorId, isAdmin = false }) => {
  try {
    return await experienceController.updateExperience(experienceId, updateData, operatorId, isAdmin);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('experiences:delete', async (event, { experienceId, operatorId, isAdmin = false }) => {
  try {
    return await experienceController.deleteExperience(experienceId, operatorId, isAdmin);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('experiences:availability', async (event, { experienceId, date, participants }) => {
  try {
    return await experienceController.calculateAvailability(experienceId, date, participants);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('experiences:price', async (event, { experienceId, participants }) => {
  try {
    return await experienceController.calculateTotalPrice(experienceId, participants);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('experiences:stats', async (event) => {
  try {
    return await experienceController.getExperienceStats();
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('experiences:by-operator', async (event, { operatorId }) => {
  try {
    return await experienceController.getExperiencesByOperator(operatorId);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('experiences:by-community', async (event, { communityId }) => {
  try {
    return await experienceController.getExperiencesByCommunity(communityId);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// IPC Handlers para comunidades
ipcMain.handle('communities:all', async (event) => {
  try {
    return await communityController.getAllCommunities();
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('communities:by-id', async (event, { id }) => {
  try {
    return await communityController.getCommunityById(id);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('communities:by-region', async (event, { region }) => {
  try {
    return await communityController.getCommunitiesByRegion(region);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('communities:stats', async (event) => {
  try {
    return await communityController.getCommunityStats();
  } catch (error) {
    return { success: false, error: error.message };
  }
});

function createWindow() {
  console.log('🌍 NODE_ENV:', process.env.NODE_ENV);
    // Crear la ventana del navegador
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false, // Permitir acceso a archivos locales
      allowRunningInsecureContent: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../assets/icons/icon.png'),
    title: 'Colombia Raíces',
    minWidth: 800,
    minHeight: 600,
    show: false, // No mostrar hasta que esté listo
  });// Cargar la aplicación
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Loading development URL: http://localhost:3006');
    mainWindow.loadURL('http://localhost:3006');
    mainWindow.webContents.openDevTools();
    console.log('🛠️ DevTools opened');
  } else {
    console.log('📦 Loading production file');
    mainWindow.loadFile(path.join(__dirname, '../renderer/dist/index.html'));
  }

  // Mostrar cuando esté listo
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Capturar errores de JavaScript y mostrarlos en terminal
    mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
      console.log(`[RENDERER ${level}] ${message}`);
      if (sourceId) {
        console.log(`    at ${sourceId}:${line}`);
      }
    });
    
    // Capturar errores de carga
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
      console.error('❌ Page failed to load:', errorDescription, 'URL:', validatedURL);
    });
    
    // Capturar cuando la página termine de cargar
    mainWindow.webContents.on('did-finish-load', () => {
      console.log('✅ Page finished loading');
    });
  });
  // Emitido cuando la ventana es cerrada
  mainWindow.on('closed', () => {
    mainWindow = null;
    
    // Notificar evento de cierre
    EventObserver.notify(APP_EVENTS.WINDOW_CLOSED);
  });
}

// Este método será llamado cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador
app.whenReady().then(async () => {
  try {
    // Configurar protocolo personalizado para imágenes
    protocol.registerHttpProtocol('local-image', (request, callback) => {
      const url = request.url.replace('local-image://', '');
      const imagePath = path.join(__dirname, '../renderer/public', url);
      
      if (fs.existsSync(imagePath)) {
        callback({ path: imagePath });
      } else {
        callback({ error: -6 }); // ENOENT
      }
    });
    
    // Configurar listeners de eventos
    setupEventListeners();
    
    // Inicializar base de datos y modelos
    await initializeModels();
    console.log('Database and models initialized successfully');
    
    // Notificar que la aplicación está lista
    EventObserver.notify(APP_EVENTS.APP_READY);
    
    // Crear ventana principal
    createWindow();
  } catch (error) {
    console.error('Failed to initialize application:', error);
    
    // Notificar error de base de datos
    EventObserver.notify(APP_EVENTS.DATABASE_ERROR, error);
    
    // Cerrar aplicación si falla la inicialización
    app.quit();
  }
});

// Salir cuando todas las ventanas estén cerradas
app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    try {
      // Cerrar conexiones de base de datos
      await closeModels();
    } catch (error) {
      console.error('Error closing database connections:', error);
    }
    
    app.quit();
  }
});

app.on('activate', async () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Código de seguridad adicional
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});

// Prevenir navegación no deseada
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== 'http://localhost:3000' && process.env.NODE_ENV === 'development') {
      event.preventDefault();
    }
  });
});
