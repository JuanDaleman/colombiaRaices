#!/bin/bash
# Script rápido para crear una versión pequeña del logo circular

echo "🔧 Creando versión optimizada del logo circular..."

# Verificar que el archivo existe
if [ ! -f "/e/ColombiaRaices/renderer/public/images/LogoColombiaRaicesCircular.png" ]; then
    echo "❌ Logo circular no encontrado"
    exit 1
fi

# Usar PowerShell para redimensionar la imagen (alternativa sin ImageMagick)
powershell -Command "
Add-Type -AssemblyName System.Drawing
\$image = [System.Drawing.Image]::FromFile('/e/ColombiaRaices/renderer/public/images/LogoColombiaRaicesCircular.png')
\$newImage = New-Object System.Drawing.Bitmap(64, 64)
\$graphics = [System.Drawing.Graphics]::FromImage(\$newImage)
\$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
\$graphics.DrawImage(\$image, 0, 0, 64, 64)
\$newImage.Save('/e/ColombiaRaices/renderer/public/images/LogoColombiaRaicesCircular_small.png', [System.Drawing.Imaging.ImageFormat]::Png)
\$graphics.Dispose()
\$newImage.Dispose()
\$image.Dispose()
"

if [ $? -eq 0 ]; then
    echo "✅ Logo optimizado creado: LogoColombiaRaicesCircular_small.png"
    ls -lh /e/ColombiaRaices/renderer/public/images/LogoColombiaRaicesCircular_small.png
else
    echo "❌ Error creando logo optimizado"
fi
