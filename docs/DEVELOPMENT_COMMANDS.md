# 🛠️ Comandos de Desarrollo - Colombia Raíces

## 🌐 **Desarrollo Web (Recomendado para desarrollo)**

```bash
# Iniciar servidor de desarrollo con hot reload
npm run dev:renderer

# URL: http://localhost:3009
# ✅ Cambios instantáneos
# ✅ DevTools completos
# ✅ Debugging fácil
```

## 🖥️ **Aplicación de Escritorio (Para pruebas finales)**

```bash
# Opción 1: Comando rápido
npm run desktop

# Opción 2: Paso a paso
npm run build:renderer  # Construir aplicación
npm start               # Iniciar aplicación de escritorio
```

## 🔄 **Desarrollo Híbrido (Ambos modos)**

```bash
# Iniciar ambos al mismo tiempo
npm run dev

# Selector interactivo de modo
npm run dev:mode
```

## 🧹 **Utilidades**

```bash
# Limpiar puertos si hay conflictos
npm run ports:clean

# Ver puertos ocupados
npm run ports:show

# Limpiar y reiniciar desarrollo
npm run dev:clean
```

## 📊 **Estado Actual**

### ✅ **Funcionando Correctamente**

- **Aplicación Web**: http://localhost:3009
- **Aplicación de Escritorio**: Ventana nativa funcionando
- **Logo**: Aparece correctamente en ambos modos
- **Header**: Color claro #fffada en ambos
- **Base de datos**: Conectada en modo escritorio

### 🎯 **Recomendación de Flujo**

1. **Desarrollo diario**: `npm run dev:renderer` (web)
2. **Pruebas cada hora**: `npm run desktop` (escritorio)
3. **Antes de commits**: Probar en ambos modos
4. **Entrega final**: Solo aplicación de escritorio

---

**💡 Los cambios que haces en la web se reflejan EXACTAMENTE igual en la aplicación de escritorio**
