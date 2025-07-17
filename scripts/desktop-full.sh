#!/bin/bash

# Colombia Raíces - Script de Desarrollo para Aplicación de Escritorio
# Este script automatiza completamente el desarrollo de la aplicación de escritorio

echo "🖥️ Colombia Raíces - Desarrollo de Aplicación de Escritorio"
echo "==========================================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones auxiliares
log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_info() {
    echo -e "${BLUE}ℹ️ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

# Función para limpiar procesos anteriores
cleanup_processes() {
    log_info "Limpiando procesos anteriores..."
    
    # Matar procesos electron anteriores
    if pgrep -f "electron" > /dev/null 2>&1; then
        log_warning "Matando procesos Electron anteriores..."
        pkill -f "electron" 2>/dev/null || true
        sleep 2
    fi
    
    # Matar procesos webpack-dev-server
    if pgrep -f "webpack-dev-server" > /dev/null 2>&1; then
        log_warning "Matando procesos webpack-dev-server..."
        pkill -f "webpack-dev-server" 2>/dev/null || true
        sleep 1
    fi
    
    log_success "Procesos limpiados"
}

# Función para limpiar archivos de construcción
clean_build() {
    log_info "Limpiando archivos de construcción anteriores..."
    
    cd renderer
    rm -rf dist/*
    
    log_success "Archivos de construcción limpiados"
}

# Función para construir la aplicación
build_app() {
    log_info "Construyendo aplicación para escritorio..."
    
    cd renderer
    
    # Ejecutar webpack
    npx webpack --config webpack.config.js --mode production
    
    if [ $? -eq 0 ]; then
        log_success "Aplicación construida exitosamente"
    else
        log_error "Error al construir la aplicación"
        exit 1
    fi
}

# Función para copiar recursos
copy_resources() {
    log_info "Copiando recursos necesarios..."
    
    cd renderer
    
    # Crear directorios necesarios
    mkdir -p dist/images
    mkdir -p dist/icons
    mkdir -p dist/styles
    mkdir -p dist/assets
    
    # Copiar imágenes
    if [ -d "public/images" ]; then
        cp -r public/images/* dist/images/ 2>/dev/null || true
        log_success "Imágenes copiadas ($(ls dist/images | wc -l) archivos)"
    fi
    
    # Copiar iconos
    if [ -d "public/icons" ]; then
        cp -r public/icons/* dist/icons/ 2>/dev/null || true
        log_success "Iconos copiados"
    fi
    
    # Copiar estilos
    if [ -d "public/styles" ]; then
        cp -r public/styles/* dist/styles/ 2>/dev/null || true
        log_success "Estilos copiados"
    fi
    
    # Copiar otros assets
    if [ -d "public/assets" ]; then
        cp -r public/assets/* dist/assets/ 2>/dev/null || true
        log_success "Assets copiados"
    fi
    
    cd ..
}

# Función para verificar recursos
verify_resources() {
    log_info "Verificando recursos copiados..."
    
    # Verificar logos principales
    if [ -f "renderer/dist/images/LogoColombiaRaicesNoFondo.png" ]; then
        log_success "Logo principal encontrado"
    else
        log_error "Logo principal no encontrado"
        return 1
    fi
    
    # Verificar archivos de construcción
    if [ -f "renderer/dist/bundle.js" ] && [ -f "renderer/dist/index.html" ]; then
        log_success "Archivos de construcción presentes"
    else
        log_error "Archivos de construcción faltantes"
        return 1
    fi
    
    return 0
}

# Función para iniciar la aplicación
start_app() {
    log_info "Iniciando aplicación de escritorio..."
    
    # Verificar que la base de datos existe
    if [ ! -f "data/colombia_raices.db" ]; then
        log_warning "Base de datos no encontrada, se creará automáticamente"
    fi
    
    # Iniciar aplicación
    npm start
}

# Función para mostrar información del sistema
show_system_info() {
    log_info "Información del sistema:"
    echo "  - OS: $(uname -s)"
    echo "  - Directorio actual: $(pwd)"
    echo "  - Node.js: $(node --version 2>/dev/null || echo 'No instalado')"
    echo "  - NPM: $(npm --version 2>/dev/null || echo 'No instalado')"
    echo "  - Electron: $(npx electron --version 2>/dev/null || echo 'No instalado')"
    echo ""
}

# Función principal
main() {
    show_system_info
    
    # Verificar que estamos en el directorio correcto
    if [ ! -f "package.json" ]; then
        log_error "No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto."
        exit 1
    fi
    
    case "$1" in
        "clean")
            cleanup_processes
            clean_build
            ;;
        "build")
            build_app
            copy_resources
            verify_resources
            ;;
        "start")
            start_app
            ;;
        "full"|"")
            cleanup_processes
            clean_build
            build_app
            copy_resources
            if verify_resources; then
                echo ""
                log_success "¡Aplicación lista para ejecutar!"
                log_info "Iniciando aplicación de escritorio..."
                echo ""
                start_app
            else
                log_error "Error en la verificación de recursos"
                exit 1
            fi
            ;;
        "help")
            echo "Uso: $0 [clean|build|start|full|help]"
            echo ""
            echo "Comandos:"
            echo "  clean  - Limpiar procesos y archivos de construcción"
            echo "  build  - Solo construir la aplicación"
            echo "  start  - Solo iniciar la aplicación"
            echo "  full   - Proceso completo (por defecto)"
            echo "  help   - Mostrar esta ayuda"
            echo ""
            ;;
        *)
            log_error "Comando no reconocido: $1"
            echo "Usa '$0 help' para ver los comandos disponibles"
            exit 1
            ;;
    esac
}

# Ejecutar función principal
main "$@"
