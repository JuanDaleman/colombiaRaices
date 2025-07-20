# GUÍA DE DESARROLLO - COLOMBIA RAÍCES

## 📁 ESTRUCTURA DEL PROYECTO (Capas Híbridas para Electron)

```
colombia_raices/
├── main/                           # Proceso principal de Electron
│   ├── electron.js                 # Archivo principal de Electron
│   ├── database/                   # Capa de datos
│   │   ├── config.js              # Configuración de la base de datos
│   │   ├── migrations/            # Migraciones de la base de datos
│   │   └── models/                # Modelos de datos
│   │       ├── User.js
│   │       ├── Experience.js
│   │       ├── Community.js
│   │       └── Reservation.js
│   ├── services/                  # Servicios de negocio
│   │   ├── AuthService.js         # Servicio de autenticación
│   │   ├── ExperienceService.js   # Servicio de experiencias
│   │   ├── CommunityService.js    # Servicio de comunidades
│   │   └── ReservationService.js  # Servicio de reservas
│   ├── controllers/               # Controladores (API interna)
│   │   ├── AuthController.js
│   │   ├── ExperienceController.js
│   │   ├── CommunityController.js
│   │   └── ReservationController.js
│   └── utils/                     # Utilidades del main process
│       ├── encryption.js          # Encriptación de contraseñas
│       ├── validation.js          # Validaciones
│       └── fileManager.js         # Gestión de archivos
├── renderer/                      # Proceso renderer (Frontend)
│   ├── public/                    # Archivos públicos
│   │   ├── index.html
│   │   └── styles/
│   │       └── globals.css
│   ├── src/                       # Código fuente del frontend
│   │   ├── components/            # Componentes reutilizables
│   │   │   ├── common/           # Componentes comunes
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── forms/            # Formularios
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   ├── ExperienceForm.jsx
│   │   │   │   └── SearchForm.jsx
│   │   │   ├── cards/            # Cards de presentación
│   │   │   │   ├── ExperienceCard.jsx
│   │   │   │   ├── CommunityCard.jsx
│   │   │   │   └── ReservationCard.jsx
│   │   │   └── maps/             # Componentes de mapas
│   │   │       ├── InteractiveMap.jsx
│   │   │       └── LocationMarker.jsx
│   │   ├── pages/                # Páginas principales
│   │   │   ├── auth/             # Páginas de autenticación
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── traveler/         # Páginas del viajero
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── SearchExperiences.jsx
│   │   │   │   ├── ExperienceDetail.jsx
│   │   │   │   ├── CommunityProfile.jsx
│   │   │   │   └── ReservationHistory.jsx
│   │   │   ├── operator/         # Páginas del operador
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── PublishExperience.jsx
│   │   │   │   └── ManageExperiences.jsx
│   │   │   └── admin/            # Páginas del administrador
│   │   │       ├── Dashboard.jsx
│   │   │       └── ApproveExperiences.jsx
│   │   ├── hooks/                # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useExperiences.js
│   │   │   └── useCommunities.js
│   │   ├── services/             # Servicios del frontend
│   │   │   ├── api.js            # Comunicación con main process
│   │   │   └── storage.js        # Gestión de localStorage
│   │   ├── utils/                # Utilidades del frontend
│   │   │   ├── constants.js      # Constantes
│   │   │   ├── helpers.js        # Funciones auxiliares
│   │   │   └── validators.js     # Validadores de formularios
│   │   ├── styles/               # Estilos adicionales
│   │   │   └── components.css    # Estilos específicos de componentes
│   │   ├── App.jsx               # Componente principal
│   │   └── index.js              # Punto de entrada del renderer
│   └── webpack.config.js         # Configuración de Webpack
├── assets/                       # Recursos estáticos
│   ├── images/                   # Imágenes del proyecto
│   │   ├── communities/          # Fotos de comunidades
│   │   ├── experiences/          # Fotos de experiencias
│   │   └── icons/                # Iconos de la aplicación
│   └── data/                     # Datos iniciales
│       ├── communities.json      # Datos de comunidades
│       └── initial-experiences.json # Experiencias iniciales
├── tests/                        # Pruebas
│   ├── unit/                     # Pruebas unitarias
│   │   ├── services/
│   │   ├── controllers/
│   │   └── components/
│   ├── integration/              # Pruebas de integración
│   │   ├── auth.test.js
│   │   ├── experiences.test.js
│   │   └── reservations.test.js
│   └── fixtures/                 # Datos de prueba
│       └── testData.js
├── docs/                         # Documentación
│   ├── README.md
│   ├── INSTALLATION.md
│   ├── USER_MANUAL.md
│   └── ARCHITECTURE.md
├── config/                       # Configuraciones
│   ├── database.js               # Configuración de SQLite
│   ├── app.js                    # Configuración de la aplicación
│   └── build.js                  # Configuración de build
├── package.json                  # Dependencias y scripts
├── tailwind.config.js            # Configuración de Tailwind
├── postcss.config.js             # Configuración de PostCSS
└── electron-builder.config.js    # Configuración de empaquetado
```

## 🗓️ CRONOGRAMA DE DESARROLLO (METODOLOGÍA ÁGIL - SPRINTS)

### **SPRINT 1: INSTALACIÓN Y CONFIGURACIÓN INICIAL (Días 1-2)**

**Objetivo:** Configurar el entorno de desarrollo base

- [ ] Instalación de dependencias (Node.js, Electron, React, Tailwind)
- [ ] Configuración de Tailwind CSS y PostCSS
- [ ] **Criterio de Aceptación:** Aplicación Electron se ejecuta con ventana básica y Tailwind funcionando

### **SPRINT 2: ESTRUCTURA DEL PROYECTO (Días 3-4)**

**Objetivo:** Establecer la arquitectura base del proyecto

- [ ] Creación de estructura de carpetas completa
- [ ] Configuración básica de Electron (main y renderer)
- [ ] **Criterio de Aceptación:** Estructura de carpetas creada, aplicación Electron funciona con proceso main y renderer separados

### **SPRINT 3: BASE DE DATOS Y PATRONES (Días 5-6)**

**Objetivo:** Implementar la capa de datos con patrones de diseño

- [ ] Configuración de SQLite con patrón Singleton
- [ ] Creación de migraciones y modelos base
- [ ] **Criterio de Aceptación:** Base de datos SQLite funciona, patrón Singleton implementado, tablas creadas correctamente

### **SPRINT 4: VISTA HOME Y NAVEGACIÓN (Días 7-8)**

**Objetivo:** Crear la interfaz base de la aplicación

- [ ] Diseño e implementación de la vista Home
- [ ] Sistema de navegación básico (sidebar, header)
- [ ] **Criterio de Aceptación:** Aplicación muestra vista Home atractiva con navegación funcional
- [ ] **UI Review:** Definir elementos visuales según logo y paleta de colores

### **SPRINT 5: AUTENTICACIÓN - LÓGICA DE NEGOCIO (TDD) (Días 9-10)**

**Objetivo:** Implementar servicios de autenticación con TDD

- [ ] AuthService con validación de contraseñas (TDD)
- [ ] Patrón Observer para eventos de autenticación
- [ ] **Criterio de Aceptación:** Tests unitarios pasan, validaciones funcionan correctamente

### **SPRINT 6: AUTENTICACIÓN - INTERFAZ USUARIO (Días 11-12)**

**Objetivo:** Crear vistas de registro e inicio de sesión

- [ ] Vista de registro de usuario
- [ ] Vista de inicio de sesión
- [ ] **Criterio de Aceptación:** Usuario puede registrarse e iniciar sesión correctamente
- [ ] **UI Review:** Mejorar interfaz según feedback

### **SPRINT 7: EXPERIENCIAS - SERVICIOS BASE (TDD) (Días 13-14)**

**Objetivo:** Implementar lógica de experiencias turísticas

- [ ] ExperienceService con búsqueda y filtros (TDD)
- [ ] Validaciones de datos de experiencias
- [ ] **Criterio de Aceptación:** Tests unitarios pasan, servicios funcionan correctamente

### **SPRINT 8: EXPERIENCIAS - VISTA BÚSQUEDA (Días 15-16)**

**Objetivo:** Crear interfaz de búsqueda de experiencias

- [ ] Vista de búsqueda con filtros
- [ ] Cards de experiencias
- [ ] **Criterio de Aceptación:** Usuario puede buscar y filtrar experiencias correctamente
- [ ] **UI Review:** Mejorar interfaz según feedback

### **SPRINT 9: EXPERIENCIAS - GESTIÓN OPERADORES (Días 17-18)**

**Objetivo:** Permitir a operadores publicar experiencias

- [ ] Vista de publicación de experiencias
- [ ] Sistema de aprobación básico
- [ ] **Criterio de Aceptación:** Operadores pueden publicar experiencias, administradores pueden aprobar
- [ ] **UI Review:** Mejorar interfaz según feedback

### **SPRINT 10: RESERVAS - LÓGICA DE CÁLCULO (TDD) (Días 19-20)**

**Objetivo:** Implementar sistema de estimaciones de reservas

- [ ] ReservationService con cálculos de precios (TDD)
- [ ] Validaciones de reservas
- [ ] **Criterio de Aceptación:** Tests unitarios pasan, cálculos funcionan correctamente

### **SPRINT 11: RESERVAS - INTERFAZ USUARIO (Días 21-22)**

**Objetivo:** Crear vistas de reservas

- [ ] Vista de generación de reservas
- [ ] Vista de historial de reservas
- [ ] **Criterio de Aceptación:** Usuario puede generar estimaciones y ver historial
- [ ] **UI Review:** Mejorar interfaz según feedback

### **SPRINT 12: COMUNIDADES - IMPLEMENTACIÓN (Días 23-24)**

**Objetivo:** Mostrar perfiles de comunidades

- [ ] CommunityService y vistas de comunidades
- [ ] Integración con experiencias
- [ ] **Criterio de Aceptación:** Usuario puede ver perfiles de comunidades
- [ ] **UI Review:** Mejorar interfaz según feedback

### **SPRINT 13: MAPAS INTERACTIVOS (Días 25-26)**

**Objetivo:** Integrar mapas con OpenStreetMap

- [ ] Componente de mapa interactivo
- [ ] Marcadores de ubicaciones
- [ ] **Criterio de Aceptación:** Mapas funcionan correctamente, ubicaciones se muestran
- [ ] **UI Review:** Mejorar interfaz según feedback

### **SPRINT 14: TESTING E INTEGRACIÓN (Días 27-28)**

**Objetivo:** Completar testing y resolver issues

- [ ] Pruebas de integración completas
- [ ] Corrección de bugs encontrados
- [ ] **Criterio de Aceptación:** Todas las pruebas pasan, aplicación estable

### **SPRINT 15: EMPAQUETADO Y DISTRIBUCIÓN (Días 29-30)**

**Objetivo:** Preparar aplicación para distribución

- [ ] Configuración de electron-builder
- [ ] Generación de ejecutables
- [ ] **Criterio de Aceptación:** Aplicación se empaqueta correctamente para Windows, macOS y Linux

### **FASE 2: CAPA DE DATOS (Días 4-6)**

- [x] Diseño e implementación de la base de datos
- [x] Creación de migraciones
- [x] Implementación de modelos
- [x] Configuración de Knex.js
- [x] Datos iniciales (seed)

### **FASE 3: SERVICIOS DE NEGOCIO (Días 7-10)**

- [x] Servicio de autenticación
- [x] Servicio de experiencias
- [x] Servicio de comunidades
- [x] Servicio de reservas
- [x] Utilities (validación, encriptación)

### **FASE 4: CONTROLADORES Y API INTERNA (Días 11-13)**

- [x] Controladores de autenticación
- [x] Controladores de experiencias
- [x] Controladores de comunidades
- [x] Controladores de reservas
- [x] IPC (Inter-Process Communication)

### **FASE 5: COMPONENTES BASE DEL FRONTEND (Días 14-17)**

- [x] Configuración de React y routing
- [x] Componentes comunes (Header, Footer, Sidebar)
- [x] Componentes de formularios
- [x] Componentes de cards
- [x] Configuración de Tailwind personalizada

### **FASE 6: CASOS DE USO - AUTENTICACIÓN (Días 18-20)**

- [x] CU1: Registrar Usuario
- [x] CU2: Autenticar Usuario
- [x] CU4: Validar Contraseña
- [x] Páginas de Login y Register
- [x] Servicios de autenticación implementados
- [x] Controladores de autenticación implementados
- [x] APIs expuestas en preload.js
- [x] Pruebas de autenticación creadas (necesita ajustes menores)

### **FASE 7: CASOS DE USO - EXPERIENCIAS (Días 21-25)**

- [x] CU3: Buscar Experiencias Turísticas
- [x] CU6: Publicar Experiencia
- [x] CU7: Aprobar Experiencia
- [x] Páginas de búsqueda y gestión
- [x] Componentes de experiencias (ExperienceCard, ExperienceForm, ExperienceList)
- [x] Formularios de búsqueda avanzada
- [x] Sistema de aprobación y gestión
- [ ] Pruebas de experiencias

### **FASE 8: CASOS DE USO - RESERVAS (Días 26-28)**

- [x] CU5: Generar Estimación de Reserva
- [x] Páginas de reservas (ReservationDetail, ReservationHistory, MakeReservation)
- [x] Cálculos de precios y estimaciones
- [x] Formularios de reserva con servicios adicionales
- [x] Integración con experiencias (botón "Reservar")
- [x] Servicios y controladores de reservas
- [x] Componentes de reservas (ReservationCard, ReservationForm)
- [ ] Pruebas de reservas

### **FASE 8.5: EMPAQUETADO Y TESTING INTERMEDIO (Días 28-29)**

- [x] Configuración de electron-builder
- [x] Resolución de problemas de módulos nativos (bcrypt → bcryptjs)
- [x] Generación de iconos temporales para desarrollo
- [x] Verificación de funcionamiento de la aplicación
- [x] Documentación de problemas encontrados y soluciones
- [x] Testing básico del ejecutable (aplicación funciona directamente)
- [ ] Optimización de tamaño del ejecutable
- [x] Documentación del proceso de build

### **FASE 9: CASOS DE USO - COMUNIDADES (Días 30-32)**

- [x] CU8: Visualizar Perfil de Comunidad
- [x] Páginas de comunidades (Communities.jsx, CommunityProfile.jsx)
- [x] Controlador de comunidades completo (CommunityController.js)
- [x] Modelo de comunidades con métodos de búsqueda
- [x] Integración con sistema de navegación hash
- [x] Corrección de problema de build del renderer
- [x] Configuración de webpack y babel
- [x] Construcción automática del bundle
- [x] Verificación de funcionamiento completo

### **FASE 10: INTEGRACIÓN DE MAPAS (Días 33-35)**

- [x] Configuración de Leaflet y React-Leaflet
- [x] Componente InteractiveMap con OpenStreetMap
- [x] Componente LocationMarker personalizado
- [x] Componente MiniMap para tarjetas
- [x] Página MapView completa con filtros
- [x] Integración de mapas en Communities.jsx (mini-mapas)
- [x] Integración de mapas en CommunityProfile.jsx (mapa interactivo)
- [x] Navegación a vista de mapa desde sidebar
- [x] Popups informativos con navegación
- [x] Marcadores diferenciados para comunidades y experiencias
- [x] Filtros por región y tipo de experiencia
- [x] Estadísticas dinámicas en vista de mapa
- [x] Responsive design para mapas
- [x] Configuración de iconos y assets de Leaflet

## 🎯 PATRONES DE DISEÑO IMPLEMENTADOS

### **1. Singleton Pattern**

**Ubicación:** `main/database/config.js`
**Propósito:** Gestionar una única instancia de conexión a la base de datos SQLite
**Implementación:**

```javascript
class DatabaseManager {
  constructor() {
    if (DatabaseManager.instance) {
      return DatabaseManager.instance;
    }
    // Configuración de SQLite
    DatabaseManager.instance = this;
  }

  static getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }
}
```

### **2. Observer Pattern**

**Ubicación:** `main/utils/EventManager.js`
**Propósito:** Gestionar eventos y notificaciones en tiempo real (cambios de estado de reservas, aprobaciones, etc.)
**Implementación:**

```javascript
class EventManager {
  constructor() {
    this.observers = {};
  }

  subscribe(event, callback) {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }
    this.observers[event].push(callback);
  }

  notify(event, data) {
    if (this.observers[event]) {
      this.observers[event].forEach((callback) => callback(data));
    }
  }
}
```

## 🧪 DESARROLLO DIRIGIDO POR PRUEBAS (TDD)

### **Funcionalidades Críticas con TDD:**

1. **Autenticación y Validación de Contraseñas**

   - `tests/unit/services/AuthService.test.js`
   - `tests/unit/utils/validation.test.js`
   - **Razón:** Sistema crítico de seguridad

2. **Cálculo de Estimaciones de Reservas**

   - `tests/unit/services/ReservationService.test.js`
   - **Razón:** Lógica de negocio compleja con múltiples variables

3. **Gestión de Estados de Experiencias**

   - `tests/unit/services/ExperienceService.test.js`
   - **Razón:** Flujo crítico de aprobación y validación

4. **Validaciones de Datos**
   - `tests/unit/utils/validators.test.js`
   - **Razón:** Integridad del sistema

### **Estructura de Testing:**

```
tests/
├── unit/
│   ├── services/
│   │   ├── AuthService.test.js          # TDD
│   │   ├── ExperienceService.test.js    # TDD
│   │   └── ReservationService.test.js   # TDD
│   ├── utils/
│   │   ├── validation.test.js           # TDD
│   │   └── validators.test.js           # TDD
│   └── controllers/
├── integration/
│   ├── auth-flow.test.js
│   ├── experience-flow.test.js
│   └── reservation-flow.test.js
└── fixtures/
    └── testData.js
```

## 📋 METODOLOGÍA DE SPRINT

### **Flujo de Trabajo por Sprint:**

1. **Desarrollo de Funcionalidad**

   - Implementar código según criterios de aceptación
   - Para funcionalidades TDD: escribir tests primero

2. **Testing Automático**

   - Ejecutar tests unitarios
   - Verificar que todos los tests pasen

3. **Testing Manual (Tu Parte)**

   - Probar funcionalidad en aplicación de escritorio
   - Validar flujos de usuario completos

4. **Feedback y Corrección**

   - Identificar y corregir errores
   - **BLOQUEO:** No avanzar hasta resolver todos los issues

5. **UI Review (Cuando Aplique)**

   - Revisar interfaz según paleta de colores del logo
   - Mejorar UX/UI según feedback

6. **Siguiente Sprint**
   - Solo avanzar cuando sprint anterior esté completamente validado

## 🎨 DIRECTRICES DE UI/UX

### **Paleta de Colores (Basada en ColombiaRaicesLogo.png):**

- **Primarios:** Amarillo/Dorado, Verde selva, Azul cielo
- **Secundarios:** Naranja atardecer, Café tierra
- **Neutros:** Blancos cálidos, Grises suaves

### **Elementos UI a Definir por Sprint:**

- Diseño de cards
- Formularios y inputs
- Navegación y menús
- Botones y CTAs
- Layouts responsive
- Iconografía colombiana

### **Preguntas UI por Sprint:**

- ¿Qué elementos visuales necesita esta vista?
- ¿Cómo debe comportarse la navegación?
- ¿Qué información debe ser prominente?
- ¿Cómo debe verse en diferentes tamaños de pantalla?

## 📝 NOTAS IMPORTANTES

### **Restricciones del Proyecto:**

1. **Patrones de Diseño Obligatorios:**

   - ✅ **Singleton:** Gestión de base de datos SQLite
   - ✅ **Observer:** Gestión de eventos y notificaciones

2. **TDD Obligatorio para:**
   - ✅ Autenticación y validación de contraseñas
   - ✅ Cálculo de estimaciones de reservas
   - ✅ Gestión de estados de experiencias
   - ✅ Validaciones de datos críticas

### **Consideraciones Técnicas:**

- Usar IPC para comunicación entre main y renderer
- Implementar manejo de errores robusto
- Considerar offline-first approach
- Seguir paleta de colores del logo consistentemente

### **Criterios de Calidad:**

- Todos los tests automatizados deben pasar
- La aplicación debe funcionar correctamente en testing manual
- UI debe seguir directrices de diseño establecidas
- Código debe seguir principios de Clean Code

### **Próximos Pasos:**

🚀 **SPRINT 1: INSTALACIÓN Y CONFIGURACIÓN INICIAL**

- Instalar dependencias del proyecto
- Configurar Tailwind CSS
- Verificar que aplicación Electron básica funciona

**¿Estás listo para comenzar con el Sprint 1?**
