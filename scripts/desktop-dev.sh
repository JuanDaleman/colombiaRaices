#!/bin/bash

# Script de desarrollo para aplicación de escritorio - Colombia Raíces
# Automatiza la construcción y copia de recursos

echo "🖥️ Colombia Raíces - Desarrollo Aplicación de Escritorio"
echo "======================================================"
echo ""

# Función para construir la aplicación
build_desktop() {
    echo "🏗️ Construyendo aplicación..."
    cd renderer
    
    # Construir con webpack
    echo "📦 Ejecutando webpack..."
    npx webpack --config webpack.config.js --mode production
    
    if [ $? -eq 0 ]; then
        echo "✅ Construcción exitosa"
    else
        echo "❌ Error en construcción"
        exit 1
    fi
    
    # Copiar recursos necesarios
    echo "📁 Copiando recursos..."
    
    # Crear directorios necesarios
    mkdir -p dist/images
    mkdir -p dist/icons
    mkdir -p dist/styles
    
    # Copiar imágenes
    if [ -d "public/images" ]; then
        cp -r public/images/* dist/images/ 2>/dev/null || true
        echo "✅ Imágenes copiadas"
    fi
    
    # Copiar iconos
    if [ -d "public/icons" ]; then
        cp -r public/icons/* dist/icons/ 2>/dev/null || true
        echo "✅ Iconos copiados"
    fi
    
    # Copiar estilos
    if [ -d "public/styles" ]; then
        cp -r public/styles/* dist/styles/ 2>/dev/null || true
        echo "✅ Estilos copiados"
    fi
    
    cd ..
    echo "🎉 Recursos copiados correctamente"
}

# Función para iniciar la aplicación
start_desktop() {
    echo "🚀 Iniciando aplicación de escritorio..."
    npm start
}

# Función para limpiar archivos anteriores
clean_build() {
    echo "🧹 Limpiando construcción anterior..."
    rm -rf renderer/dist/*
    echo "✅ Limpieza completada"
}

# Función para desarrollo completo
full_development() {
    clean_build
    build_desktop
    start_desktop
}

# Función para solo reconstruir recursos
rebuild_resources() {
    echo "🔄 Reconstruyendo solo recursos..."
    cd renderer
    
    # Recrear directorios
    mkdir -p dist/images
    mkdir -p dist/icons
    mkdir -p dist/styles
    
    # Copiar recursos
    cp -r public/images/* dist/images/ 2>/dev/null || true
    cp -r public/icons/* dist/icons/ 2>/dev/null || true
    cp -r public/styles/* dist/styles/ 2>/dev/null || true
    
    cd ..
    echo "✅ Recursos actualizados"
}

# Menú principal
case "$1" in
    "build")
        build_desktop
        ;;
    "start")
        start_desktop
        ;;
    "clean")
        clean_build
        ;;
    "resources")
        rebuild_resources
        ;;
    "full"|"")
        full_development
        ;;
    *)
        echo "Uso: $0 [build|start|clean|resources|full]"
        echo ""
        echo "  build     - Solo construir la aplicación"
        echo "  start     - Solo iniciar la aplicación"
        echo "  clean     - Limpiar archivos de construcción"
        echo "  resources - Solo copiar recursos"
        echo "  full      - Proceso completo (por defecto)"
        echo ""
        ;;
esac
