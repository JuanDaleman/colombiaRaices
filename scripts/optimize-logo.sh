#!/bin/bash
# Script para optimizar el logo de Colombia Raíces

echo "🖼️  Optimizando logo Colombia Raíces..."

# Crear directorio temporal
mkdir -p /tmp/logo-optimization

# Verificar si ImageMagick está instalado
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick no está instalado. Instalando..."
    # Para Windows con Chocolatey
    choco install imagemagick -y 2>/dev/null || {
        echo "❌ No se pudo instalar ImageMagick automáticamente"
        echo "📋 Instrucciones manuales:"
        echo "1. Instalar ImageMagick desde: https://imagemagick.org/script/download.php#windows"
        echo "2. O usar Chocolatey: choco install imagemagick"
        echo "3. Reiniciar terminal y ejecutar este script nuevamente"
        exit 1
    }
fi

# Ruta del logo original
LOGO_PATH="/e/ColombiaRaices/renderer/public/images/LogoColombiaRaicesCircular.png"

if [ ! -f "$LOGO_PATH" ]; then
    echo "❌ Logo no encontrado en: $LOGO_PATH"
    exit 1
fi

# Obtener información del logo original
echo "📊 Información del logo original:"
identify "$LOGO_PATH" 2>/dev/null || {
    echo "❌ No se pudo leer la información del logo"
    exit 1
}

# Crear versiones optimizadas
echo "🔧 Creando versiones optimizadas..."

# Versión pequeña (64x64) para logo en esquina
convert "$LOGO_PATH" -resize 64x64 -quality 85 "/e/ColombiaRaices/renderer/public/images/LogoColombiaRaicesCircular_small.png"

# Versión mediana (128x128) para uso general
convert "$LOGO_PATH" -resize 128x128 -quality 85 "/e/ColombiaRaices/renderer/public/images/LogoColombiaRaicesCircular_medium.png"

# Versión grande (256x256) para alta resolución
convert "$LOGO_PATH" -resize 256x256 -quality 85 "/e/ColombiaRaices/renderer/public/images/LogoColombiaRaicesCircular_large.png"

# Mostrar tamaños resultantes
echo "📏 Tamaños resultantes:"
ls -lh /e/ColombiaRaices/renderer/public/images/LogoColombiaRaicesCircular_*.png

echo "✅ Optimización completada"
echo "📋 Archivos creados:"
echo "   - LogoColombiaRaicesCircular_small.png (64x64)"
echo "   - LogoColombiaRaicesCircular_medium.png (128x128)"
echo "   - LogoColombiaRaicesCircular_large.png (256x256)"
