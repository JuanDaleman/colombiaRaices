#!/bin/bash

echo "🚀 Empaquetando Colombia Raíces para Windows..."

# Limpiar build anterior
rm -rf dist/

# Compilar renderer
echo "📦 Compilando renderer..."
npm run build:renderer

# Crear directorio de distribución
mkdir -p dist

# Empaquetar con electron-packager
echo "🔧 Empaquetando aplicación..."
npx electron-packager . colombia-raices \
  --platform=win32 \
  --arch=x64 \
  --out=dist \
  --overwrite \
  --ignore=node_modules/bcrypt \
  --ignore=node_modules/sqlite3 \
  --ignore="\.git" \
  --ignore="tests/" \
  --ignore="docs/" \
  --ignore="scripts/" \
  --ignore="\.vscode" \
  --ignore="\.gitignore" \
  --ignore="README.md" \
  --prune=true

echo "✅ Aplicación empaquetada en dist/colombia-raices-win32-x64/"
echo "🎯 Puedes ejecutar: dist/colombia-raices-win32-x64/colombia-raices.exe"
