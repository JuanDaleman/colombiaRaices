# 📋 SPRINT 9: EXPERIENCIAS - GESTIÓN OPERADORES - PLAN GRANULAR

**Objetivo:** Permitir a operadores publicar experiencias y sistema de aprobación básico  
**Criterio de Aceptación:** Operadores pueden publicar experiencias, administradores pueden aprobar  
**Metodología:** Desarrollo granular con build y verificación después de cada mini-tarea

## 🎯 ANÁLISIS PREVIO

### **Estado Actual Verificado:**

- ✅ Base de datos con tabla `experiences` funcional
- ✅ ExperienceService con métodos CRUD completos
- ✅ ExperienceController con IPC handlers
- ✅ OperatorDashboard existente con botones de navegación
- ✅ Sistema de autenticación funcionando
- ✅ ROUTES constants centralizadas

### **Funcionalidades a Implementar:**

1. **Vista de Publicación de Experiencias** (`PublishExperiencePage`)
2. **Vista de Gestión de Experiencias** (`ManageExperiencesPage`)
3. **Sistema de Aprobación para Administradores** (`ApproveExperiencesPage`)
4. **Componentes de Formularios** (`ExperienceForm`, `ExperienceCard` para gestión)

---

## 📝 TAREAS GRANULARES CON PUNTOS DE VERIFICACIÓN

### **TAREA 1: PREPARACIÓN Y ANÁLISIS**

**Duración estimada:** 15 minutos

#### **1.1 Verificación del Estado Actual**

- [ ] **Verificar estructura de tabla `experiences`** en base de datos
- [ ] **Verificar ExperienceService** métodos disponibles
- [ ] **Verificar ExperienceController** IPC handlers
- [ ] **Verificar ROUTES** para rutas de operador
- [ ] 🔍 **CHECKPOINT 1.1:** Build app y verificar que todo funciona correctamente

#### **1.2 Análisis de Rutas Necesarias**

- [ ] **Verificar ruta** `ROUTES.PUBLISH_EXPERIENCE` existe
- [ ] **Verificar ruta** `ROUTES.MANAGE_EXPERIENCES` existe
- [ ] **Verificar navegación** desde OperatorDashboard funciona
- [ ] 🔍 **CHECKPOINT 1.2:** Build app y verificar navegación de botones

---

### **TAREA 2: VISTA PUBLICAR EXPERIENCIA (PÁGINA BÁSICA)**

**Duración estimada:** 30 minutos

#### **2.1 Crear Archivo Base PublishExperiencePage**

- [ ] **Crear archivo** `renderer/src/pages/operator/PublishExperiencePage.jsx`
- [ ] **Implementar estructura básica** con TravelerHeader y título
- [ ] **Agregar ruta** en `App.jsx` para `/publish-experience`
- [ ] **Implementar navegación básica** (header, título, botón volver)
- [ ] 🔍 **CHECKPOINT 2.1:** Build app y verificar que la página carga sin errores

#### **2.2 Layout Básico de la Página**

- [ ] **Implementar contenedor principal** con estilos consistentes
- [ ] **Agregar título de página** "📝 Publicar Nueva Experiencia"
- [ ] **Agregar descripción** explicativa para operadores
- [ ] **Implementar botón "Volver al Dashboard"** funcional
- [ ] 🔍 **CHECKPOINT 2.2:** Build app y verificar layout y navegación

---

### **TAREA 3: FORMULARIO DE EXPERIENCIA (COMPONENTE BASE)**

**Duración estimada:** 45 minutos

#### **3.1 Crear Componente ExperienceForm Base**

- [ ] **Crear archivo** `renderer/src/components/forms/ExperienceForm.jsx`
- [ ] **Implementar estructura básica** con useState para campos
- [ ] **Definir campos** básicos: title, description, type, price, duration
- [ ] **Implementar validación básica** de campos requeridos
- [ ] 🔍 **CHECKPOINT 3.1:** Build app y verificar que componente no da errores

#### **3.2 Campos Principales del Formulario**

- [ ] **Campo título** (input text, required)
- [ ] **Campo descripción** (textarea, required, min 50 caracteres)
- [ ] **Campo tipo** (select: cultural, histórica, ecológica)
- [ ] **Campo precio** (input number, required, min 0)
- [ ] 🔍 **CHECKPOINT 3.2:** Build app y verificar que campos se muestran correctamente

#### **3.3 Campos Adicionales del Formulario**

- [ ] **Campo duración** (input number, required, min 1 hora)
- [ ] **Campo participantes máximo** (input number, required, min 1)
- [ ] **Campo ubicación/dirección** (input text, required)
- [ ] **Botones** Guardar y Cancelar
- [ ] 🔍 **CHECKPOINT 3.3:** Build app y verificar todos los campos funcionan

---

### **TAREA 4: INTEGRACIÓN FORMULARIO CON PÁGINA**

**Duración estimada:** 20 minutos

#### **4.1 Integrar ExperienceForm en PublishExperiencePage**

- [ ] **Importar ExperienceForm** en PublishExperiencePage
- [ ] **Agregar componente** dentro del layout de la página
- [ ] **Manejar eventos** de submit y cancel del formulario
- [ ] **Implementar navegación** de vuelta al dashboard al cancelar
- [ ] 🔍 **CHECKPOINT 4.1:** Build app y verificar integración sin errores

---

### **TAREA 5: LÓGICA DE GUARDADO (BACKEND INTEGRATION)**

**Duración estimada:** 30 minutos

#### **5.1 Verificar API de Experiencias**

- [ ] **Verificar** `window.electronAPI.experiences.create` existe
- [ ] **Verificar** estructura de datos esperada por la API
- [ ] **Verificar** que ExperienceController maneja creación
- [ ] **Test básico** de llamada API desde consola
- [ ] 🔍 **CHECKPOINT 5.1:** Build app y verificar API disponible

#### **5.2 Implementar Lógica de Guardado**

- [ ] **Implementar función** `handleSubmit` en ExperienceForm
- [ ] **Agregar validación** de datos antes de enviar
- [ ] **Implementar llamada** a `window.electronAPI.experiences.create`
- [ ] **Manejar respuesta** exitosa y errores
- [ ] 🔍 **CHECKPOINT 5.2:** Build app y probar guardado de experiencia

---

### **TAREA 6: FEEDBACK Y ESTADOS DE CARGA**

**Duración estimada:** 25 minutos

#### **6.1 Estados de Loading y Feedback**

- [ ] **Agregar estado** `loading` durante guardado
- [ ] **Implementar spinner** o indicador de carga
- [ ] **Deshabilitar botón** "Guardar" durante carga
- [ ] **Mostrar mensajes** de éxito y error
- [ ] 🔍 **CHECKPOINT 6.1:** Build app y verificar estados de carga

#### **6.2 Validación y UX Mejorado**

- [ ] **Implementar validación** en tiempo real
- [ ] **Mostrar errores** de validación específicos
- [ ] **Limpiar formulario** después de guardado exitoso
- [ ] **Mostrar confirmación** antes de cancelar
- [ ] 🔍 **CHECKPOINT 6.2:** Build app y verificar UX completo

---

### **TAREA 7: VISTA GESTIONAR EXPERIENCIAS (PÁGINA BÁSICA)**

**Duración estimada:** 40 minutos

#### **7.1 Crear ManageExperiencesPage Base**

- [ ] **Crear archivo** `renderer/src/pages/operator/ManageExperiencesPage.jsx`
- [ ] **Implementar estructura básica** con TravelerHeader
- [ ] **Agregar ruta** en `App.jsx` para `/manage-experiences`
- [ ] **Implementar título** "📋 Mis Experiencias Publicadas"
- [ ] 🔍 **CHECKPOINT 7.1:** Build app y verificar página carga

#### **7.2 Lista de Experiencias del Operador**

- [ ] **Implementar estado** para lista de experiencias
- [ ] **Agregar función** `loadOperatorExperiences`
- [ ] **Llamar API** para obtener experiencias del operador actual
- [ ] **Mostrar loading** mientras carga datos
- [ ] 🔍 **CHECKPOINT 7.2:** Build app y verificar carga de datos

#### **7.3 Grid de Experiencias**

- [ ] **Implementar grid** responsivo para mostrar experiencias
- [ ] **Crear cards básicas** para cada experiencia
- [ ] **Mostrar información** básica: título, tipo, estado, fecha
- [ ] **Manejar estado vacío** (sin experiencias)
- [ ] 🔍 **CHECKPOINT 7.3:** Build app y verificar visualización

---

### **TAREA 8: COMPONENTE EXPERIENCE MANAGEMENT CARD**

**Duración estimada:** 35 minutos

#### **8.1 Crear ExperienceManagementCard**

- [ ] **Crear archivo** `renderer/src/components/experiences/ExperienceManagementCard.jsx`
- [ ] **Implementar diseño** básico con información de experiencia
- [ ] **Mostrar estado** (pendiente, aprobada, rechazada)
- [ ] **Agregar botones** Editar, Ver Detalles, Eliminar
- [ ] 🔍 **CHECKPOINT 8.1:** Build app y verificar componente card

#### **8.2 Integrar Cards en ManageExperiencesPage**

- [ ] **Importar ExperienceManagementCard** en ManageExperiencesPage
- [ ] **Reemplazar cards básicas** con componente nuevo
- [ ] **Pasar datos** correctos a cada card
- [ ] **Implementar eventos** básicos de botones
- [ ] 🔍 **CHECKPOINT 8.2:** Build app y verificar integración completa

---

### **TAREA 9: FUNCIONALIDADES DE GESTIÓN**

**Duración estimada:** 30 minutos

#### **9.1 Implementar Edición de Experiencia**

- [ ] **Agregar estado** `editingExperience` en ManageExperiencesPage
- [ ] **Modificar ExperienceForm** para modo edición
- [ ] **Implementar función** `handleEdit` en ManageExperiencesCard
- [ ] **Mostrar modal** o navegación para editar
- [ ] 🔍 **CHECKPOINT 9.1:** Build app y verificar funcionalidad de edición

#### **9.2 Implementar Eliminación de Experiencia**

- [ ] **Agregar confirmación** antes de eliminar
- [ ] **Implementar función** `handleDelete` con API call
- [ ] **Actualizar lista** después de eliminación
- [ ] **Manejar errores** de eliminación
- [ ] 🔍 **CHECKPOINT 9.2:** Build app y verificar eliminación funciona

---

### **TAREA 10: SISTEMA DE APROBACIÓN BÁSICO (ADMIN)**

**Duración estimada:** 45 minutos

#### **10.1 Crear ApproveExperiencesPage Base**

- [ ] **Crear archivo** `renderer/src/pages/admin/ApproveExperiencesPage.jsx`
- [ ] **Verificar** si existe header para admin o usar TravelerHeader
- [ ] **Implementar estructura** básica de la página
- [ ] **Agregar ruta** en `App.jsx` para `/admin/approve-experiences`
- [ ] 🔍 **CHECKPOINT 10.1:** Build app y verificar página admin

#### **10.2 Lista de Experiencias Pendientes**

- [ ] **Implementar API** para obtener experiencias pendientes
- [ ] **Agregar filtro** por estado en ExperienceService si no existe
- [ ] **Cargar experiencias** con estado "pendiente"
- [ ] **Mostrar en grid** similar a ManageExperiencesPage
- [ ] 🔍 **CHECKPOINT 10.2:** Build app y verificar carga de pendientes

#### **10.3 Botones de Aprobación**

- [ ] **Agregar botones** Aprobar y Rechazar a cada experiencia
- [ ] **Implementar funciones** `handleApprove` y `handleReject`
- [ ] **Actualizar estado** de experiencia en base de datos
- [ ] **Actualizar UI** después de cada acción
- [ ] 🔍 **CHECKPOINT 10.3:** Build app y verificar sistema de aprobación

---

### **TAREA 11: NAVEGACIÓN Y RUTAS COMPLETAS**

**Duración estimada:** 20 minutos

#### **11.1 Verificar Todas las Rutas**

- [ ] **Verificar** todas las rutas funcionan desde dashboards
- [ ] **Verificar** navegación entre páginas
- [ ] **Verificar** botones "Volver" funcionan
- [ ] **Agregar acceso** a ApproveExperiences desde algún dashboard admin
- [ ] 🔍 **CHECKPOINT 11.1:** Build app y verificar navegación completa

---

### **TAREA 12: TESTING Y PULIMIENTO FINAL**

**Duración estimada:** 30 minutos

#### **12.1 Testing de Flujo Completo**

- [ ] **Probar** crear experiencia como operador
- [ ] **Probar** gestionar experiencias (editar, eliminar)
- [ ] **Probar** aprobación como admin
- [ ] **Verificar** todos los estados de experiencia
- [ ] 🔍 **CHECKPOINT 12.1:** Build app y testing completo de funcionalidad

#### **12.2 UX y Polish Final**

- [ ] **Revisar** estilos y consistencia visual
- [ ] **Agregar** validaciones faltantes
- [ ] **Mejorar** mensajes de error y éxito
- [ ] **Verificar** responsive design
- [ ] 🔍 **CHECKPOINT 12.2:** Build final y verificación UX completa

---

## 📊 RESUMEN DE CHECKPOINTS

**Total de Checkpoints:** 22 puntos de verificación  
**Tiempo estimado total:** ~6 horas  
**Archivos a crear:** 4 nuevos archivos principales  
**APIs a usar:** ExperienceService existente

### **Archivos Nuevos:**

1. `PublishExperiencePage.jsx`
2. `ManageExperiencesPage.jsx`
3. `ApproveExperiencesPage.jsx`
4. `ExperienceForm.jsx`
5. `ExperienceManagementCard.jsx`

### **Modificaciones:**

1. `App.jsx` - Nuevas rutas
2. `utils/constants.js` - Verificar rutas existen
3. Posibles ajustes en ExperienceService si se necesitan

---

## 🚨 PROTOCOLO DE ERRORES

### **Si falla algún checkpoint:**

1. **DETENER** desarrollo inmediatamente
2. **REPORTAR** error específico encontrado
3. **ANALIZAR** causa del error juntos
4. **CORREGIR** antes de continuar
5. **RE-EJECUTAR** checkpoint fallido
6. **CONTINUAR** solo si checkpoint pasa

### **Criterios de Éxito por Checkpoint:**

- ✅ **Build exitoso** sin errores de compilación
- ✅ **Aplicación carga** sin errores en consola
- ✅ **Funcionalidad específica** del checkpoint funciona
- ✅ **Navegación** no se rompe
- ✅ **No regresiones** en funcionalidad existente

---

**¿Estás listo para comenzar con la TAREA 1.1? Vamos a verificar el estado actual de la base de datos y servicios.**
