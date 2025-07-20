# 🎯 COMANDOS DE VERIFICACIÓN - HEADER FIX

## 📋 EJECUTA ESTOS COMANDOS EN ORDEN:

### 1. **Script Automático (Recomendado)**

```bash
cd /e/ColombiaRaices
bash test-header-fix.sh
```

### 2. **Comandos Manuales (Si prefieres paso a paso)**

```bash
# Limpiar procesos
cd /e/ColombiaRaices
npm run ports:clean

# Limpiar caché
npm cache clean --force

# Build de la aplicación
npm run build:renderer

# Ejecutar la aplicación
npm start
```

## ✅ VERIFICACIONES A REALIZAR:

### **1. Landing Page (/):**

- ✅ **Debe mostrar**: Header verde con "Colombia Raíces" y menú de navegación
- ✅ **En DevTools**: `✅ Showing navigation for route: /`

### **2. Página de Reservas (/reservations):**

- ✅ **Debe mostrar**: TravelerHeader con "📅 Mis Reservas"
- ✅ **NO debe mostrar**: Header verde genérico
- ✅ **En DevTools**: `🚫 Hiding navigation for route: /reservations`

### **3. Navegación entre páginas:**

- ✅ **Desde landing**: Click en "Reservas" → Va a /reservations con TravelerHeader
- ✅ **Desde TravelerHeader**: Botones "Experiencias", "Comunidades", "Reservas" funcionan
- ✅ **Vuelta a home**: Cualquier navegación a "/" muestra header verde

## 🔍 DEBUGGING:

### **Abrir DevTools (F12) y verificar:**

```
Console logs esperados:
🔍 Navigation Debug: { pathname: "/", hash: "#/", actualRoute: "/", ... }
✅ Showing navigation for route: /

Al navegar a reservas:
🔍 Navigation Debug: { pathname: "/", hash: "#/reservations", actualRoute: "/reservations", ... }
🚫 Hiding navigation for route: /reservations
```

### **Si hay problemas:**

1. Verificar que `actualRoute` tenga el valor correcto
2. Confirmar que `dashboardRoutes` incluye la ruta actual
3. Revisar si `shouldHideNavigation` es `true` o `false`

## 🎯 RESULTADO ESPERADO:

**✅ LANDING PAGE HEADER ARREGLADO**
**✅ RESERVATIONS PAGE CON TRAVELER HEADER**
**✅ NAVEGACIÓN FUNCIONANDO CORRECTAMENTE**
