#!/bin/bash

# Script de desarrollo para Colombia Raíces
# Permite elegir entre desarrollo web o aplicación de escritorio

echo "🇨🇴 Colombia Raíces - Selector de Modo de Desarrollo"
echo "=================================================="
echo ""
echo "Selecciona el modo de desarrollo:"
echo "1) 🌐 Desarrollo Web (Hot Reload) - Recomendado para desarrollo"
echo "2) 🖥️  Aplicación de Escritorio - Para pruebas finales"
echo "3) 🔄 Ambos modos en paralelo"
echo "4) 🏗️  Construir aplicación para escritorio"
echo "5) 🧹 Limpiar puertos y reiniciar"
echo ""
read -p "Ingresa tu opción (1-5): " choice

case $choice in
    1)
        echo "🚀 Iniciando desarrollo web..."
        echo "URL: http://localhost:3009"
        cd renderer && npm run dev:renderer
        ;;
    2)
        echo "🏗️ Construyendo aplicación..."
        cd renderer && npx webpack --config webpack.config.js --mode production
        echo "🖥️ Iniciando aplicación de escritorio..."
        cd .. && npm start
        ;;
    3)
        echo "🔄 Iniciando ambos modos..."
        npm run dev
        ;;
    4)
        echo "🏗️ Construyendo aplicación para escritorio..."
        cd renderer && npx webpack --config webpack.config.js --mode production
        echo "✅ Aplicación construida en renderer/dist/"
        echo "💡 Ahora puedes ejecutar: npm start"
        ;;
    5)
        echo "🧹 Limpiando puertos..."
        npm run ports:clean
        echo "🚀 Reiniciando desarrollo web..."
        npm run dev:renderer
        ;;
    *)
        echo "❌ Opción inválida. Usa 1-5."
        exit 1
        ;;
esac
