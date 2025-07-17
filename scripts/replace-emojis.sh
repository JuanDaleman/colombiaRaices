#!/bin/bash
# Script para reemplazar emojis por iconos personalizados en Colombia Raíces

echo "🔄 Iniciando reemplazo de emojis por iconos personalizados..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para mostrar progreso
show_progress() {
    echo -e "${YELLOW}⏳ $1${NC}"
}

# Función para mostrar éxito
show_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para mostrar error
show_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Función para reemplazar emoji en archivo
replace_emoji() {
    local file="$1"
    local emoji="$2"
    local icon_component="$3"
    
    if [ -f "$file" ]; then
        # Usar perl para reemplazo más preciso
        perl -i -pe "s/\Q$emoji\E/<$icon_component \/>/g" "$file"
        show_success "Reemplazado '$emoji' por '$icon_component' en $file"
    else
        show_error "Archivo no encontrado: $file"
    fi
}

# Función para añadir import de Icon al archivo
add_icon_import() {
    local file="$1"
    
    if [ -f "$file" ]; then
        # Verificar si ya existe el import
        if ! grep -q "import.*Icon.*from.*Icon" "$file"; then
            # Añadir import después de otros imports
            sed -i "5i import { UIIcon, CategoryIcon, ActionIcon } from '../components/common/Icon';" "$file"
            show_success "Añadido import de Icon a $file"
        else
            show_success "Import de Icon ya existe en $file"
        fi
    fi
}

# Archivos a procesar
HOMEPAGE_FILE="renderer/src/pages/HomePage.jsx"
NAVIGATION_FILE="renderer/src/components/common/Navigation.jsx"

show_progress "Procesando HomePage.jsx..."

# Añadir imports necesarios
add_icon_import "$HOMEPAGE_FILE"

# Reemplazos específicos para HomePage
replace_emoji "$HOMEPAGE_FILE" "📸" "UIIcon name=\"image\""
replace_emoji "$HOMEPAGE_FILE" "📍" "UIIcon name=\"location\""
replace_emoji "$HOMEPAGE_FILE" "⏱️" "UIIcon name=\"time\""
replace_emoji "$HOMEPAGE_FILE" "🏘️" "CategoryIcon name=\"community\""

show_progress "Procesando Navigation.jsx..."

# Añadir imports necesarios
add_icon_import "$NAVIGATION_FILE"

# Reemplazos específicos para Navigation
replace_emoji "$NAVIGATION_FILE" "🏠" "UIIcon name=\"home\""
replace_emoji "$NAVIGATION_FILE" "🎯" "UIIcon name=\"experiences\""
replace_emoji "$NAVIGATION_FILE" "👥" "UIIcon name=\"communities\""
replace_emoji "$NAVIGATION_FILE" "📋" "UIIcon name=\"reservations\""
replace_emoji "$NAVIGATION_FILE" "👤" "UIIcon name=\"profile\""

show_progress "Creando iconos SVG de ejemplo..."

# Crear estructura de carpetas para iconos
mkdir -p renderer/public/icons/{ui,navigation,categories,actions}

# Crear iconos SVG básicos de ejemplo
cat > renderer/public/icons/ui/image.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
</svg>
EOF

cat > renderer/public/icons/ui/location.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
</svg>
EOF

cat > renderer/public/icons/ui/time.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
</svg>
EOF

cat > renderer/public/icons/categories/community.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
</svg>
EOF

cat > renderer/public/icons/ui/home.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
</svg>
EOF

show_success "Iconos SVG de ejemplo creados"

show_progress "Generando estadísticas..."

# Mostrar estadísticas
echo ""
echo "📊 ESTADÍSTICAS DE REEMPLAZO:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📁 Archivos procesados: 2"
echo "🔄 Emojis reemplazados: 9"
echo "📦 Iconos SVG creados: 5"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
show_success "🎉 Proceso completado exitosamente!"
echo ""
echo "📋 PRÓXIMOS PASOS:"
echo "1. Revisar los archivos modificados"
echo "2. Personalizar los iconos SVG según diseño"
echo "3. Probar la aplicación"
echo "4. Añadir más iconos según necesidad"
echo ""
echo "📍 Ubicación de iconos: renderer/public/icons/"
echo "📖 Documentación: docs/ICONS_MANAGEMENT.md"
