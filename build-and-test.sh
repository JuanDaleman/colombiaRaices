#!/bin/bash

echo "🚀 Iniciando build y test de Colombia Raíces..."
echo "📁 Directorio actual: $(pwd)"
echo ""

# Verificar dependencias
echo "📦 Verificando dependencias..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi

echo "✅ npm encontrado"

# Verificar archivos principales
echo ""
echo "📋 Verificando archivos principales..."
files_to_check=(
    "main/electron.js"
    "renderer/src/App.jsx" 
    "renderer/webpack.config.js"
    "data/colombia_raices.db"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file existe"
    else
        echo "❌ $file NO existe"
    fi
done

# Verificar imágenes de comunidades
echo ""
echo "🖼️ Verificando imágenes de comunidades..."
community_images=(
    "renderer/public/images/communities/community_1.jpg"
    "renderer/public/images/communities/community_2.jpg"
    "renderer/public/images/communities/community_3.jpg"
    "renderer/public/images/communities/community_4.jpg"
    "renderer/public/images/communities/community_5.jpg"
)

for image in "${community_images[@]}"; do
    if [ -f "$image" ]; then
        echo "✅ $(basename $image) existe"
    else
        echo "❌ $(basename $image) NO existe"
    fi
done

echo ""
echo "🔧 Iniciando build del renderer..."
cd renderer && npx webpack --config webpack.config.js --mode development --stats minimal

echo ""
echo "⚡ Iniciando aplicación Electron..."
cd .. && npm start
