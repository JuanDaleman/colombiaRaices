# 🧹 PLAN DE LIMPIEZA ARQUITECTURAL - COLOMBIA RAÍCES

## 📊 ANÁLISIS DE REDUNDANCIA

### ❌ ARCHIVOS OBSOLETOS IDENTIFICADOS (14 App.jsx!)

#### 🔴 ALTA PRIORIDAD - Eliminar inmediatamente
```
renderer/src/App.working.jsx           - Backup obsoleto
renderer/src/App.test.jsx              - Testing obsoleto  
renderer/src/App.simple.test.jsx       - Testing obsoleto
renderer/src/App.simple.jsx            - Versión simple obsoleta
renderer/src/App.new.jsx               - Versión nueva obsoleta
renderer/src/App.main.jsx              - Versión main obsoleta
renderer/src/App.final.jsx             - Backup obsoleto
renderer/src/App.final.backup.jsx      - Backup de backup!
renderer/src/App.desktop.jsx           - Versión desktop obsoleta
renderer/src/App.desktop.fixed.jsx     - Fix obsoleto
```

#### 🟡 MEDIA PRIORIDAD - Verificar antes de eliminar
```
renderer/src/TestApp.jsx               - Solo testing (verificar si se usa en tests)
renderer/src/SimpleTestApp.jsx         - Solo testing (verificar si se usa en tests)
renderer/src/SimpleApp.jsx             - Versión simple (verificar dependencias)
renderer/src/pages/HomePage.jsx        - NO SE USA (verificar imports)
renderer/src/pages/HomePageSimple.jsx  - NO SE USA (verificar imports)
```

#### ✅ MANTENER
```
renderer/src/App.jsx                   - ARCHIVO PRINCIPAL EN USO
```

### 🎯 BENEFICIOS ESPERADOS

1. **Reducción de confusión** - Solo 1 App.jsx en lugar de 14
2. **Mejor mantenibilidad** - Sin archivos duplicados
3. **Menor tamaño de proyecto** - Eliminación de código obsoleto
4. **Clarity en desarrollo** - Estructura más limpia
5. **Menos conflictos Git** - Menos archivos que trackear

### 📋 PLAN DE EJECUCIÓN

#### ETAPA 1: Backup y Verificación
- ✅ Crear commit estable (COMPLETADO)
- 🔄 Verificar que archivos realmente se usan
- 🔄 Documentar imports y dependencias

#### ETAPA 2: Eliminación Gradual  
- 🔄 Eliminar archivos ALTA PRIORIDAD
- 🔄 Commit por cada grupo eliminado
- 🔄 Verificar que app sigue funcionando

#### ETAPA 3: Verificación Final
- 🔄 Eliminar archivos MEDIA PRIORIDAD (después de verificar)
- 🔄 Testing completo de funcionalidad
- 🔄 Commit final de limpieza

#### ETAPA 4: Refactoring Arquitectural
- 🔄 Revisar duplicación en controllers
- 🔄 Optimizar servicios duplicados
- 🔄 Limpiar handlers IPC redundantes

## 🚨 PROTOCOLO DE SEGURIDAD

1. **Commit después de cada etapa**
2. **Testing antes de continuar**  
3. **Rollback disponible en cada paso**
4. **Documentar cambios**

---
**Estado**: 🔄 EN PROGRESO - ETAPA 1 COMPLETADA
**Próximo paso**: Verificación de dependencias
