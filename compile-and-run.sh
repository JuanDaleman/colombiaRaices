#!/bin/bash

echo "🔄 Compilando y ejecutando Colombia Raíces..."

# Cambiar al directorio del proyecto
cd /e/ColombiaRaices

# Limpiar y compilar
echo "📦 Preparando aplicación..."
npm run desktop:prepare

# Ejecutar aplicación
echo "🚀 Iniciando aplicación de escritorio..."
npm start
