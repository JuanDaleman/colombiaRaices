# LISTA DE VERIFICACIÓN - PRUEBAS MANUALES CRÍTICAS ✅

## FECHA: 20 de Julio 2025 - Pre-Commit Verification
## OBJETIVO: Verificar que el problema de $NaN en reservas está resuelto

---

## 🔍 PRUEBAS CRÍTICAS A REALIZAR

### **1. VERIFICACIÓN DE NAVEGACIÓN (NO MÁS PANTALLAS EN BLANCO)**
- [ ] **Cargar página principal** - `http://localhost:3000`
- [ ] **Navegar a TravelerDashboard** - Verificar que carga sin problemas
- [ ] **Click en "Generar Reserva"** - Verificar que navega a MakeReservationPage sin pantalla en blanco

### **2. VERIFICACIÓN DE CÁLCULO DE PRECIOS (PROBLEMA $NaN)**
- [ ] **Cargar MakeReservationPage** - Debe mostrar formulario de reserva
- [ ] **Seleccionar una experiencia** - Verificar que muestra información de precio
- [ ] **Ingresar número de personas** - Ej: 2 personas
- [ ] **Verificar cálculo automático** - El precio debe mostrar valor real, NO "$NaN"
- [ ] **Agregar servicios adicionales** - Verificar que suma correctamente
- [ ] **Revisar total final** - Debe ser un número real, no $NaN

### **3. VERIFICACIÓN DE FLUJO COMPLETO**
- [ ] **Proceso de estimación** - Crear una estimación de reserva
- [ ] **Datos mostrados correctamente** - Verificar que todos los campos tienen valores reales
- [ ] **No hay errores en consola** - Revisar DevTools para errores JS

---

## 🧪 CASOS DE PRUEBA ESPECÍFICOS

### **CASO 1: Reserva Simple**
```
Experiencia: Cualquier experiencia disponible
Personas: 2
Servicios adicionales: Ninguno
RESULTADO ESPERADO: Precio base × 2 = Total (número real)
```

### **CASO 2: Reserva con Servicios**
```
Experiencia: Cualquier experiencia disponible  
Personas: 3
Servicios adicionales: Guía turístico + Transporte
RESULTADO ESPERADO: (Precio base × 3) + Servicios = Total (número real)
```

### **CASO 3: Navegación Múltiple**
```
TravelerDashboard → MakeReservationPage → Volver → MakeReservationPage
RESULTADO ESPERADO: Sin pantallas en blanco, siempre carga correctamente
```

---

## 🔧 PUNTOS DE VERIFICACIÓN TÉCNICA

### **DevTools - Console**
- [ ] **Sin errores de JavaScript**
- [ ] **Sin errores de red (Network tab)**
- [ ] **Respuestas API correctas** - Verificar llamadas a `/api/experiences/`

### **DevTools - Application State**
- [ ] **useReservations hook funcionando** - Debe tener datos de experiencias
- [ ] **Estado de reserva correcto** - Sin valores undefined o NaN
- [ ] **Props pasadas correctamente** - Entre componentes

### **Backend Logs**
- [ ] **Consultas SQL exitosas** - Campo `price` (no `precio`)
- [ ] **Cálculos de reserva correctos** - Sin errores en ReservationController
- [ ] **Mapeo de datos funcionando** - experience_id → experience object

---

## ⚠️ SEÑALES DE ALERTA (Si aparecen, NO hacer commit)

### **Frontend:**
- ❌ Pantalla en blanco al navegar
- ❌ "$NaN" en cualquier campo de precio
- ❌ Errores de JavaScript en consola
- ❌ Componentes que no cargan

### **Backend:**
- ❌ Errores SQL en logs
- ❌ "price" field undefined en respuestas API
- ❌ Errores en calculateReservationEstimate()
- ❌ Respuestas API con status 500

### **Navegación:**
- ❌ MakeReservationPage no carga desde TravelerDashboard
- ❌ Lazy loading causando problemas
- ❌ Rutas rotas o redirecciones incorrectas

---

## ✅ CRITERIOS DE ÉXITO PARA COMMIT

### **Mínimos requeridos:**
1. ✅ **Navegación estable** - Sin pantallas en blanco
2. ✅ **Precios reales** - No más valores $NaN
3. ✅ **Cálculos correctos** - Totales matemáticamente precisos
4. ✅ **Sin errores críticos** - Console limpa de errores

### **Ideales:**
1. ✅ **Performance buena** - Carga rápida de componentes
2. ✅ **UX fluida** - Transiciones suaves entre páginas
3. ✅ **Datos consistentes** - Información coherente en toda la app

---

## 📝 REGISTRO DE PRUEBAS

### **Navegación:**
- TravelerDashboard → MakeReservationPage: [ ] ✅ / [ ] ❌
- Página principal → TravelerDashboard: [ ] ✅ / [ ] ❌
- Múltiples navegaciones: [ ] ✅ / [ ] ❌

### **Cálculo de Precios:**
- Experiencia simple (2 personas): [ ] ✅ / [ ] ❌
- Con servicios adicionales: [ ] ✅ / [ ] ❌
- Diferentes números de personas: [ ] ✅ / [ ] ❌

### **Estabilidad:**
- Sin errores en consola: [ ] ✅ / [ ] ❌
- APIs respondiendo correctamente: [ ] ✅ / [ ] ❌
- Datos backend correctos: [ ] ✅ / [ ] ❌

---

## 🎯 INSTRUCCIONES DE PRUEBA

1. **Abrir http://localhost:3000 en navegador**
2. **Abrir DevTools (F12) - Tab Console**
3. **Seguir flujo: Home → TravelerDashboard → MakeReservationPage**
4. **Probar cálculo de reservas con diferentes valores**
5. **Verificar que NO aparece "$NaN" en ningún lugar**
6. **Confirmar que navegación funciona consistentemente**

**SI TODAS LAS PRUEBAS PASAN → PROCEDER CON COMMIT**
**SI ALGUNA FALLA → INVESTIGAR Y CORREGIR ANTES DE COMMIT**
