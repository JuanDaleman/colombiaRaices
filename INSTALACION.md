# 🚀 Sistema de Instalación Colombia Raíces

Este directorio contiene los scripts de instalación automatizada para el sistema de turismo comunitario Colombia Raíces.

## 📋 Archivos de Instalación

### `instalar-colombia-raices.bat`

**Instalador principal completo** - Ejecuta todo el proceso de configuración automáticamente.

#### ¿Qué hace?

1. **Verificación de requisitos**: Node.js y npm
2. **Instalación de dependencias**: `npm install`
3. **Construcción de la aplicación**: `npm run build:renderer`
4. **Verificación del sistema**: Comprueba que todo esté funcionando
5. **Ejecución automática**: Opcionalmente inicia la aplicación

#### Cómo usar:

```cmd
# Desde la carpeta raíz del proyecto
instalar-colombia-raices.bat
```

### `ejecutar-colombia-raices.bat`

**Ejecutor rápido** - Inicia la aplicación después de la instalación.

#### ¿Qué hace?

1. **Verificación básica**: Comprueba que el proyecto esté instalado
2. **Ejecución**: Lanza la aplicación con `npm start`

#### Cómo usar:

```cmd
# Desde la carpeta raíz del proyecto
ejecutar-colombia-raices.bat
```

## ⚙️ Requisitos Previos

### Sistema Operativo

- ✅ Windows 10/11
- ✅ Windows Server 2019/2022

### Software Requerido

- **Node.js**: Versión 18.x o superior (LTS recomendada)
  - Descargar: https://nodejs.org/
- **npm**: Se incluye automáticamente con Node.js

### Recursos del Sistema

- **RAM**: Mínimo 4GB, recomendado 8GB
- **Espacio en disco**: Mínimo 2GB libres
- **Conexión a internet**: Requerida para descargar dependencias

## 🔧 Proceso de Instalación Detallado

### Instalación Completa (Recomendada)

1. **Abrir terminal/cmd** como administrador
2. **Navegar al proyecto**:
   ```cmd
   cd E:\ColombiaRaices
   ```
3. **Ejecutar instalador**:
   ```cmd
   instalar-colombia-raices.bat
   ```
4. **Seguir las instrucciones** en pantalla
5. **Probar la aplicación** cuando se ofrezca la opción

### Instalación Manual (Alternativa)

Si prefieres tener más control sobre el proceso:

```cmd
# 1. Instalar dependencias
npm install

# 2. Construir aplicación
npm run build:renderer

# 3. Ejecutar
npm start
```

## 🔍 Verificación de la Instalación

Después de ejecutar el instalador, verifica que estos archivos/carpetas existan:

```
✅ node_modules/          - Dependencias instaladas
✅ renderer/dist/         - Frontend construido
✅ data/                  - Carpeta de base de datos
✅ main/electron.js       - Backend de Electron
```

## 🐛 Solución de Problemas

### Error: "Node.js no está instalado"

**Solución**:

1. Descargar Node.js desde https://nodejs.org/
2. Instalar la versión LTS
3. Reiniciar la terminal/cmd
4. Ejecutar de nuevo el instalador

### Error: "Falló la instalación de dependencias"

**Posibles causas y soluciones**:

- **Sin internet**: Verificar conexión
- **Permisos**: Ejecutar como administrador
- **Cache corrupto**: Ejecutar `npm cache clean --force`
- **Proxy corporativo**: Configurar proxy npm

### Error: "Falló la construcción"

**Soluciones**:

1. Verificar que todas las dependencias se instalaron
2. Ejecutar manualmente: `npm run build:renderer`
3. Revisar logs de error en la consola
4. Contactar soporte técnico

### Error: "Build no encontrado"

**Solución**:

1. Ejecutar: `npm run build:renderer`
2. Verificar que se creó la carpeta `renderer/dist/`
3. Si persiste, eliminar `node_modules` y reinstalar

## 🎯 Comandos Útiles Post-Instalación

### Desarrollo

```cmd
npm run dev              # Modo desarrollo con hot reload
npm run build           # Build completo (incluye Electron)
npm run build:renderer  # Solo build del frontend
npm test                # Ejecutar pruebas
```

### Producción

```cmd
npm start               # Ejecutar aplicación
ejecutar-colombia-raices.bat  # Ejecutor rápido
```

### Mantenimiento

```cmd
npm install             # Reinstalar dependencias
npm cache clean --force # Limpiar cache
npm update              # Actualizar dependencias
```

## 📁 Estructura Post-Instalación

Después de la instalación exitosa, el proyecto tendrá esta estructura:

```
ColombiaRaices/
├── 📁 node_modules/           # Dependencias (auto-generado)
├── 📁 renderer/dist/          # Frontend construido (auto-generado)
├── 📁 data/                   # Base de datos SQLite
├── 📁 main/                   # Backend Electron
├── 📁 renderer/src/           # Código fuente frontend
├── 📁 docs/                   # Documentación
├── 📁 tests/                  # Pruebas unitarias
├── 🚀 instalar-colombia-raices.bat   # Instalador
├── ⚡ ejecutar-colombia-raices.bat   # Ejecutor
├── 📄 package.json            # Configuración del proyecto
└── 📖 README.md              # Documentación principal
```

## 🆘 Soporte Técnico

### Contacto

- **Email**: soporte@colombia-raices.co
- **GitHub Issues**: https://github.com/tuusuario/colombia-raices/issues

### Información del Sistema

Si necesitas reportar un error, incluye:

1. **Versión de Windows**: `winver`
2. **Versión de Node.js**: `node --version`
3. **Versión de npm**: `npm --version`
4. **Log de errores**: Captura de pantalla del error

### Logs Útiles

Los logs se guardan automáticamente en:

- **Electron**: `%APPDATA%/colombia-raices/logs/`
- **NPM**: `%USERPROFILE%/.npm/_logs/`

## ⚡ Consejos de Rendimiento

### Primera Instalación

- La primera vez puede tomar 5-15 minutos
- El build inicial consume más recursos
- Se recomienda cerrar otras aplicaciones pesadas

### Ejecuciones Posteriores

- Inicio rápido: ~10-30 segundos
- Modo desarrollo: Hot reload habilitado
- Base de datos: SQLite optimizado para rendimiento

## 🔒 Consideraciones de Seguridad

### Permisos de Administrador

Algunos comandos pueden requerir permisos elevados:

- Primera instalación de dependencias
- Creación de accesos directos
- Configuración de firewall (si es necesario)

### Antivirus

Si tu antivirus bloquea la instalación:

1. Agregar excepción para la carpeta del proyecto
2. Permitir `node.exe` y `npm.cmd`
3. Temporalmente deshabilitar escaneo en tiempo real

---

## 🎉 ¡Listo para Usar!

Una vez completada la instalación, Colombia Raíces estará listo para conectar a las comunidades con los viajeros y promover el turismo comunitario sostenible en Colombia.

**¡Disfruta explorando Colombia! 🇨🇴**
