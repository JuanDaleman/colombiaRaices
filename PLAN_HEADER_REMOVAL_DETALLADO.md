# PLAN DETALLADO: Eliminación Header Genérico en ReservationsPage

## ANÁLISIS DEL PROBLEMA ACTUAL

### ❌ PROBLEMAS IDENTIFICADOS:

1. **ReservationsPage.jsx mal ubicada:**
   - Actual: Está usando imports `'../../utils/constants'` (sugiere subdirectorio)
   - Debería: Estar en `pages/` usando `'../utils/constants'`

2. **Ruta incorrecta en App.jsx:**
   - Actual: `<Route path={ROUTES.RESERVATIONS} element={<UnderConstructionPage pageName="Reservas" />} />`
   - Debería: `<Route path={ROUTES.RESERVATIONS} element={<ReservationsPage />} />`

3. **ROUTES.RESERVATIONS no en dashboardRoutes:**
   - Actual: Solo tiene `[EXPERIENCES, COMMUNITIES]`
   - Debería: Incluir `ROUTES.RESERVATIONS`

4. **Imports inconsistentes:**
   - ReservationsPage: `'../../utils/constants'` y `'../common/LoadingSpinner'`
   - CommunitiesPage: `'../utils/constants'` y `'../components/common/LoadingSpinner'`

## PLAN DE IMPLEMENTACIÓN

### PASO 1: Verificar ubicación actual de ReservationsPage
- Verificar dónde está ubicado físicamente el archivo
- Confirmar la estructura de directorios

### PASO 2: Corregir imports en ReservationsPage
- Cambiar `'../../utils/constants'` a `'../utils/constants'`
- Cambiar `'../common/LoadingSpinner'` a `'../components/common/LoadingSpinner'`
- Agregar import de TravelerHeader

### PASO 3: Eliminar header genérico actual
- Remover la sección `{/* Header */}` que contiene:
  ```jsx
  <section className="bg-green text-white py-12">
    <div className="container">
      <h1 className="text-4xl font-bold mb-4">Mis Reservas</h1>
      <p className="text-xl">Gestiona tus reservas y experiencias turísticas</p>
    </div>
  </section>
  ```

### PASO 4: Implementar TravelerHeader
- Reemplazar header genérico con:
  ```jsx
  <TravelerHeader currentPage="reservations" />
  ```

### PASO 5: Actualizar App.jsx
- Agregar import de ReservationsPage
- Cambiar ruta de UnderConstructionPage a ReservationsPage
- Agregar ROUTES.RESERVATIONS a dashboardRoutes

### PASO 6: Verificar navegación condicional
- Confirmar que ConditionalNavigation oculte Navigation genérica
- Probar que TravelerHeader aparezca correctamente

## ORDEN DE EJECUCIÓN

1. ✅ **Verificar estructura actual**
2. ✅ **Corregir imports de ReservationsPage**
3. ✅ **Eliminar header genérico**
4. ✅ **Implementar TravelerHeader**
5. ✅ **Actualizar rutas en App.jsx**
6. ✅ **Agregar a dashboardRoutes**
7. ✅ **Compilar y probar**

## RIESGOS IDENTIFICADOS Y MITIGACIONES

- **Riesgo:** Imports incorrectos → **Mitigación:** Seguir patrón de CommunitiesPage
- **Riesgo:** Header no aparece → **Mitigación:** Verificar currentPage="reservations"
- **Riesgo:** Navigation duplicada → **Mitigación:** Confirmar dashboardRoutes incluye RESERVATIONS

## RESULTADO ESPERADO

✅ ReservationsPage mostrará TravelerHeader (como Communities)
✅ Botón "Reservas" estará destacado en TravelerHeader
✅ Navigation genérica estará oculta
✅ Sin errores de compilación
