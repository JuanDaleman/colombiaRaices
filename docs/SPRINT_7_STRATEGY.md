# Sprint 7 - Estrategia de Desarrollo

## 🎯 OBJETIVO: EXPERIENCIAS - SERVICIOS BASE (TDD)

### **✅ ANÁLISIS PRE-DESARROLLO**

#### Estado Actual:

- ✅ ExperienceModel existe y está completo
- ✅ Migraciones de experiencias ejecutadas
- ✅ Base de datos configurada
- ✅ Estructura de carpetas lista

#### Lo que falta implementar:

- ❌ ExperienceService (lógica de negocio)
- ❌ Tests unitarios para ExperienceService
- ❌ ExperienceController (integración IPC)
- ❌ Integración frontend (sin romper auth)

### **🚀 ESTRATEGIA ANTI-ERRORES**

#### 1. **Orden de Implementación (TDD)**

```
1. Escribir tests PRIMERO → ExperienceService.test.js
2. Implementar ExperienceService para pasar tests
3. Probar service de forma AISLADA
4. Implementar ExperienceController
5. Agregar IPC handlers
6. Verificar que AUTH sigue funcionando
7. Integrar con frontend GRADUALMENTE
```

#### 2. **Principios de No-Regresión**

- No tocar archivos de autenticación
- No modificar rutas existentes
- No cambiar estructura de base de datos
- Probar auth después de cada cambio

#### 3. **Validaciones Críticas**

- Validación de tipos de experiencia
- Validación de precios (positivos)
- Validación de duración (positiva)
- Validación de participantes máximos
- Validación de operador autorizado

### **📝 PLAN DE IMPLEMENTACIÓN**

#### **Fase 1: Tests Primero (TDD)**

- Crear ExperienceService.test.js
- Definir casos de prueba para:
  - Búsqueda por filtros
  - Validación de datos
  - Cálculos de disponibilidad
  - Manejo de errores

#### **Fase 2: ExperienceService**

- Implementar lógica de negocio
- Usar ExperienceModel existente
- Pasar todos los tests

#### **Fase 3: Controller e IPC**

- Crear ExperienceController
- Agregar handlers IPC
- Mantener patrón similar a AuthController

#### **Fase 4: Verificación**

- Probar que auth sigue funcionando
- Probar services de forma aislada
- Verificar integración completa

### **🎯 CRITERIOS DE ACEPTACIÓN**

Usuario puede:

- ✅ Buscar experiencias con filtros (TDD)
- ✅ Ver detalles de experiencias
- ✅ Filtrar por tipo, precio, duración
- ✅ Sistema valida datos correctamente
- ✅ Auth sigue funcionando sin problemas

¿Proceder con esta estrategia?
