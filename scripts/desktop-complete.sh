#!/bin/bash

# Script completo para desarrollo desktop de Colombia Raíces
# Autor: GitHub Copilot
# Fecha: $(date)

echo "🚀 Iniciando desarrollo desktop de Colombia Raíces..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Cambiar al directorio del proyecto
cd "e:\ColombiaRaices"

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    error "No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
fi

log "✅ Directorio del proyecto verificado"

# Compilar la aplicación (esto ahora copia automáticamente las imágenes)
log "⚙️ Compilando aplicación React con webpack..."
cd renderer
npx webpack --config webpack.config.js --mode production

if [ $? -eq 0 ]; then
    log "✅ Compilación exitosa - Imágenes copiadas automáticamente"
else
    error "❌ Error en la compilación"
    exit 1
fi

# Volver al directorio raíz
cd ..

# Verificar que el archivo bundle.js existe
if [ -f "renderer/dist/bundle.js" ]; then
    log "✅ Bundle JavaScript creado correctamente"
else
    error "❌ Bundle JavaScript no encontrado"
    exit 1
fi

# Verificar que las imágenes fueron copiadas
if [ -f "renderer/dist/images/LogoColombiaRaicesNoFondo.png" ]; then
    log "✅ Logo principal copiado correctamente"
else
    error "❌ Logo principal no encontrado"
    exit 1
fi

# Mostrar información de debug
log "📊 Información de la aplicación:"
echo "   - Tamaño del bundle: $(du -h renderer/dist/bundle.js | cut -f1)"
echo "   - Archivos en dist: $(ls -la renderer/dist/ | wc -l) archivos"
echo "   - Logos disponibles: $(ls -la renderer/dist/images/ | wc -l) archivos"

# Ejecutar la aplicación desktop
log "🖥️ Iniciando aplicación desktop..."
echo ""
echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}                    COLOMBIA RAÍCES DESKTOP                     ${NC}"
echo -e "${BLUE}================================================================${NC}"
echo ""
echo -e "${GREEN}✅ Aplicación compilada y lista para usar${NC}"
echo -e "${GREEN}✅ Imágenes copiadas automáticamente por webpack${NC}"
echo -e "${GREEN}✅ Logos disponibles en ./images/${NC}"
echo ""
echo -e "${YELLOW}🚀 Iniciando Electron...${NC}"
echo ""

# Ejecutar electron
npm start

echo ""
log "🛑 Aplicación cerrada"
