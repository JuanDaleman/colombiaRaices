# Sprint 8 - EXPERIENCIAS UI & DATA SETUP

## 🎯 OBJETIVO PRINCIPAL

Crear las interfaces de búsqueda de experiencias con cards visuales, establecer datos base necesarios (comunidades, administrador, experiencias) y configurar el sistema de imágenes.

## 📊 ANÁLISIS ACTUAL

### Estado de Base de Datos:

- ✅ Tablas creadas: `users`, `communities`, `experiences`, `reservations`
- ❌ Sin datos: No hay comunidades, no hay admin, no hay experiencias
- ❌ Sin campo imagen: Falta `image_url` en `experiences` y `communities`

### Estado del Sistema:

- ✅ ExperienceService completo (Sprint 7)
- ✅ ExperienceController con IPC
- ✅ React hook `useExperiences`
- ❌ Sin UI para experiencias
- ❌ Sin sistema de imágenes

## 🚧 PREREQUISITOS IDENTIFICADOS

### 1. **Base de Datos - Campos Imagen**

```sql
-- Agregar campo image_url a experiences
ALTER TABLE experiences ADD COLUMN image_url TEXT;

-- Agregar campo image_url a communities
ALTER TABLE communities ADD COLUMN image_url TEXT;
```

### 2. **Datos Fundamentales Requeridos**

- **Admin único**: Usuario administrador del sistema
- **Comunidades**: Al menos 3-5 comunidades de diferentes regiones
- **Operadores**: Al menos 1 operador por comunidad
- **Experiencias**: 5-10 experiencias con imágenes

### 3. **Sistema de Imágenes**

- **Carpeta**: `assets/images/experiences/` y `assets/images/communities/`
- **Formatos**: JPG, PNG (optimizados para web)
- **Tamaños**: 400x300px para cards, 800x600px para detalles
- **Naming**: `experience_[id]_[timestamp].jpg`, `community_[id]_[timestamp].jpg`

## 📋 PLAN DE IMPLEMENTACIÓN SPRINT 8

### FASE 1: PREPARACIÓN DE BASE DE DATOS (Backend - Yo)

```
1.1. Crear nueva migración para agregar campos image_url
1.2. Crear seeder para datos iniciales:
    - Usuario administrador único
    - 5 comunidades colombianas representativas
    - 2 operadores por comunidad
1.3. Crear AdminService para gestión de contenido
1.4. Validar estructura de datos con tests
```

### FASE 2: SISTEMA DE IMÁGENES (Backend - Yo)

```
2.1. Crear ImageService para manejo de imágenes
2.2. Implementar upload de imágenes con validación
2.3. Crear endpoints IPC para subida de imágenes
2.4. Configurar rutas estáticas para servir imágenes
```

### FASE 3: DATOS INICIALES (Colaborativo)

```
3.1. TÚ: Preparar y subir imágenes de experiencias
    - Formato: 400x300px y 800x600px
    - Ubicación: assets/images/experiences/
    - Naming: experience_[numero]_thumbnail.jpg, experience_[numero]_full.jpg

3.2. TÚ: Preparar y subir imágenes de comunidades
    - Formato: 300x200px
    - Ubicación: assets/images/communities/
    - Naming: community_[numero].jpg

3.3. YO: Crear script para insertar experiencias con imágenes
```

### FASE 4: COMPONENTES UI (Frontend - Yo)

```
4.1. Crear ExperienceCard component
4.2. Crear ExperienceGrid component
4.3. Crear SearchFilters component
4.4. Crear ExperienceDetail component
4.5. Integrar con useExperiences hook
```

### FASE 5: PÁGINAS DE EXPERIENCIAS (Frontend - Yo)

```
5.1. Crear página de búsqueda de experiencias
5.2. Crear página de detalle de experiencia
5.3. Implementar navegación entre páginas
5.4. Conectar con backend APIs
```

### FASE 6: TESTING & VALIDACIÓN (Colaborativo)

```
6.1. Tests unitarios para nuevos componentes
6.2. Tests de integración con imágenes
6.3. Verificar que auth no se rompa
6.4. Testing manual de UI/UX
```

## 📁 ESTRUCTURA DE ARCHIVOS A CREAR

### Backend (Yo implemento):

```
main/
├── database/
│   ├── migrations/
│   │   └── 005_add_image_fields.js
│   └── seeders/
│       ├── AdminSeeder.js
│       ├── CommunitySeeder.js
│       └── ExperienceSeeder.js
├── services/
│   ├── ImageService.js
│   └── AdminService.js
└── controllers/
    └── ImageController.js
```

### Frontend (Yo implemento):

```
renderer/src/
├── components/
│   ├── experiences/
│   │   ├── ExperienceCard.js
│   │   ├── ExperienceGrid.js
│   │   ├── SearchFilters.js
│   │   └── ExperienceDetail.js
│   └── ui/
│       ├── ImageUpload.js
│       └── LoadingSpinner.js
├── pages/
│   ├── ExperiencesPage.js
│   └── ExperienceDetailPage.js
└── hooks/
    └── useImages.js
```

### Imágenes (Tú subes):

```
assets/images/
├── experiences/
│   ├── experience_1_thumbnail.jpg
│   ├── experience_1_full.jpg
│   ├── experience_2_thumbnail.jpg
│   ├── experience_2_full.jpg
│   └── ... (más experiencias)
└── communities/
    ├── community_1.jpg
    ├── community_2.jpg
    └── ... (más comunidades)
```

## 🎯 ESPECIFICACIONES TÉCNICAS

### Imágenes Requeridas:

- **Experiencias**: 5-10 experiencias turísticas colombianas
- **Thumbnails**: 400x300px, formato JPG, máximo 100KB
- **Full size**: 800x600px, formato JPG, máximo 300KB
- **Comunidades**: 5 comunidades, 300x200px, máximo 80KB

### Datos de Experiencias Necesarios:

```javascript
// Estructura de experiencia que necesitamos
{
  title: "Senderismo en Cocora",
  description: "Caminata por el valle de las palmas de cera...",
  type: "ecologica", // cultural, historica, ecologica
  price: 80000, // COP
  duration_hours: 6,
  max_participants: 15,
  community_id: 1, // Will be linked to seeded communities
  operator_id: 2,   // Will be linked to seeded operators
  image_url: "experience_1_thumbnail.jpg"
}
```

## 🚀 ORDEN DE EJECUCIÓN

### HOY (Paso 1 - Backend Foundation):

1. **YO**: Crear migración para campos image_url
2. **YO**: Crear AdminService y seeders
3. **YO**: Crear ImageService básico
4. **YO**: Preparar estructura de datos iniciales

### SIGUIENTE (Paso 2 - Assets):

1. **TÚ**: Subir imágenes de experiencias siguiendo especificaciones
2. **TÚ**: Subir imágenes de comunidades
3. **YO**: Crear scripts para insertar datos con imágenes
4. **JUNTOS**: Validar que datos e imágenes coincidan

### DESPUÉS (Paso 3 - UI):

1. **YO**: Crear componentes ExperienceCard
2. **YO**: Crear página de búsqueda
3. **JUNTOS**: Testing y ajustes
4. **JUNTOS**: Validación final

## ⚠️ CONSIDERACIONES CRÍTICAS

### Protección de Funcionalidad Existente:

- ✅ No tocar sistema de autenticación
- ✅ Mantener todas las rutas existentes
- ✅ Preservar base de datos existente
- ✅ Tests de regresión después de cada cambio

### Manejo de Imágenes:

- ✅ Validación de formato y tamaño
- ✅ Compresión automática si es necesario
- ✅ Fallback para imágenes faltantes
- ✅ Lazy loading para performance

### Performance:

- ✅ Imágenes optimizadas y comprimidas
- ✅ Lazy loading en grid de experiencias
- ✅ Caching de imágenes
- ✅ Paginación en búsqueda

## 🎯 CRITERIOS DE ÉXITO SPRINT 8

1. **✅ Base de Datos**: Comunidades, admin y experiencias creadas
2. **✅ Imágenes**: Sistema de imágenes funcionando
3. **✅ UI**: Cards de experiencias visualmente atractivas
4. **✅ Búsqueda**: Filtros funcionando correctamente
5. **✅ Integración**: Todo conectado sin romper auth
6. **✅ Performance**: Carga rápida y smooth

---

**¿Estás listo para comenzar? Empezamos con la Fase 1 (Backend Foundation)?**
