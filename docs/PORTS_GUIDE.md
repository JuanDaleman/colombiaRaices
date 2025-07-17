# 🚀 Colombia Raíces - Guía de Puertos

## 📋 Manejo de Puertos en Desarrollo

Durante el desarrollo de Colombia Raíces, es importante mantener los puertos limpios para evitar conflictos.

### 🔍 Verificar Puertos Ocupados

```bash
# Mostrar puertos ocupados en el rango 3000-3010
npm run ports:show

# Comando directo
netstat -ano | findstr :300
```

### 🧹 Limpiar Puertos

```bash
# Limpiar todos los puertos de desarrollo (3000-3010)
npm run ports:clean

# Limpiar y iniciar servidor
npm run dev:clean

# Script de bash directo
bash scripts/ports.sh clean
```

### 🎯 Puerto Principal

- **Desarrollo:** 3009 (configurado en webpack.config.js)
- **Electron:** 3002 (configurado en dev:electron)

### ⚠️ Problemas Comunes

1. **Error: "address already in use"**

   - Ejecutar: `npm run ports:clean`
   - Luego: `npm run dev:renderer`

2. **Script no funciona**
   - Verificar permisos: `chmod +x scripts/ports.sh`
   - Ejecutar manualmente: `bash scripts/ports.sh clean`

### 🔧 Estado Actual

- Puertos 3000-3008: ✅ Liberados
- Puerto 3009: 🔄 En uso (desarrollo)
- Scripts: ✅ Funcionales

# O usando netstat directamente

netstat -ano | findstr :300

````

### 🧹 Limpiar Puertos

```bash
# Limpiar todos los puertos de desarrollo automáticamente
npm run ports:clean

# O usar el script directamente
bash scripts/ports.sh clean
````

### 🔥 Liberar Puerto Específico

```bash
# Liberar un puerto específico (ejemplo: 3005)
npm run ports:kill 3005

# O usar el script directamente
bash scripts/ports.sh kill 3005
```

### 🚀 Iniciar Desarrollo

```bash
# Iniciar servidor limpiando puertos primero
npm run dev:clean

# O iniciar normalmente
npm run dev:renderer
```

## 📝 Puertos Utilizados

- **3009**: Servidor de desarrollo principal (webpack-dev-server)
- **3002**: Puerto configurado para Electron (no se usa actualmente)
- **3000-3008**: Puertos que pueden quedar ocupados durante pruebas

## 🛠️ Scripts Disponibles

| Script                      | Descripción                            |
| --------------------------- | -------------------------------------- |
| `npm run ports:show`        | Muestra puertos ocupados               |
| `npm run ports:clean`       | Limpia todos los puertos de desarrollo |
| `npm run ports:kill <port>` | Libera un puerto específico            |
| `npm run dev:clean`         | Limpia puertos e inicia desarrollo     |
| `npm run dev:renderer`      | Inicia servidor de desarrollo          |

## 🔧 Solución de Problemas

### Puerto ocupado al iniciar desarrollo

1. **Verificar puertos:**

   ```bash
   npm run ports:show
   ```

2. **Limpiar puertos:**

   ```bash
   npm run ports:clean
   ```

3. **Iniciar desarrollo:**
   ```bash
   npm run dev:renderer
   ```

### Error "EADDRINUSE"

Si obtienes un error `EADDRINUSE: address already in use`, significa que el puerto ya está ocupado:

```bash
# Solución rápida
npm run dev:clean
```

## 🎯 Buenas Prácticas

1. **Siempre limpiar puertos** antes de iniciar desarrollo
2. **Usar `npm run dev:clean`** en lugar de `npm run dev:renderer`
3. **Verificar puertos** si hay problemas de conectividad
4. **Documentar** cualquier puerto nuevo que se utilice

## 📊 Estado Actual

- ✅ **Puerto 3009**: Servidor de desarrollo activo
- ✅ **Puertos 3000-3008**: Liberados y disponibles
- ✅ **Scripts**: Configurados y funcionales
- ✅ **Documentación**: Completa y actualizada
