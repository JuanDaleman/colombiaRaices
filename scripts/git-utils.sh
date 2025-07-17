#!/bin/bash

# ===============================================================
# COLOMBIA RAÍCES - UTILIDADES GIT
# ===============================================================
# Script de utilidades para operaciones comunes con Git

COLOR_GREEN='\033[0;32m'
COLOR_YELLOW='\033[1;33m'
COLOR_RED='\033[0;31m'
COLOR_BLUE='\033[0;34m'
COLOR_RESET='\033[0m'

echo -e "${COLOR_BLUE}🚀 Colombia Raíces - Utilidades Git${COLOR_RESET}"
echo "================================================="

# Función para mostrar el estado del repositorio
show_status() {
    echo -e "${COLOR_YELLOW}📊 Estado del Repositorio:${COLOR_RESET}"
    echo "----------------------------------------"
    
    # Rama actual
    current_branch=$(git branch --show-current)
    echo -e "📍 Rama actual: ${COLOR_GREEN}$current_branch${COLOR_RESET}"
    
    # Número de commits
    commit_count=$(git rev-list --count HEAD)
    echo -e "📝 Total commits: ${COLOR_GREEN}$commit_count${COLOR_RESET}"
    
    # Último commit
    last_commit=$(git log -1 --format="%h - %s (%cr)")
    echo -e "🕐 Último commit: ${COLOR_GREEN}$last_commit${COLOR_RESET}"
    
    # Archivos modificados
    modified_files=$(git status --porcelain | wc -l)
    if [ $modified_files -gt 0 ]; then
        echo -e "📋 Archivos modificados: ${COLOR_YELLOW}$modified_files${COLOR_RESET}"
    else
        echo -e "📋 Archivos modificados: ${COLOR_GREEN}0 (repositorio limpio)${COLOR_RESET}"
    fi
    
    echo ""
}

# Función para limpiar archivos temporales
cleanup_temp_files() {
    echo -e "${COLOR_YELLOW}🧹 Limpiando archivos temporales...${COLOR_RESET}"
    
    # Eliminar archivos de prueba temporales
    find . -name "test-*.js" -not -path "./node_modules/*" -not -path "./tests/*" -delete 2>/dev/null
    find . -name "*-test.js" -not -path "./node_modules/*" -not -path "./tests/*" -delete 2>/dev/null
    find . -name "verify-*.js" -not -path "./node_modules/*" -delete 2>/dev/null
    find . -name "simple-*.js" -not -path "./node_modules/*" -delete 2>/dev/null
    
    # Eliminar archivos de backup
    find . -name "*.backup" -delete 2>/dev/null
    find . -name "*.bak" -delete 2>/dev/null
    find . -name "*.old" -delete 2>/dev/null
    find . -name "*.tmp" -delete 2>/dev/null
    
    # Eliminar archivo 'nul' si existe
    [ -f "nul" ] && rm "nul" 2>/dev/null
    
    echo -e "${COLOR_GREEN}✅ Limpieza completada${COLOR_RESET}"
    echo ""
}

# Función para crear una nueva rama de feature
create_feature_branch() {
    echo -e "${COLOR_YELLOW}🌟 Crear nueva rama de feature${COLOR_RESET}"
    read -p "Nombre de la feature (sin 'feature/'): " feature_name
    
    if [ -z "$feature_name" ]; then
        echo -e "${COLOR_RED}❌ Error: Nombre de feature requerido${COLOR_RESET}"
        return 1
    fi
    
    # Cambiar a development y actualizar
    git checkout development
    git pull origin development 2>/dev/null || true
    
    # Crear nueva rama
    git checkout -b "feature/$feature_name"
    
    echo -e "${COLOR_GREEN}✅ Rama feature/$feature_name creada y activada${COLOR_RESET}"
    echo ""
}

# Función para hacer commit con formato estándar
smart_commit() {
    echo -e "${COLOR_YELLOW}💾 Commit inteligente${COLOR_RESET}"
    
    # Limpiar archivos temporales primero
    cleanup_temp_files
    
    # Mostrar estado
    git status --short
    
    echo ""
    echo "Tipos de commit disponibles:"
    echo "1. feat - Nueva característica"
    echo "2. fix - Corrección de bug"
    echo "3. docs - Actualización de documentación"
    echo "4. refactor - Refactorización de código"
    echo "5. test - Añadir o actualizar tests"
    echo "6. chore - Tareas de mantenimiento"
    
    read -p "Selecciona tipo (1-6): " commit_type_num
    read -p "Descripción breve: " commit_description
    
    case $commit_type_num in
        1) commit_type="feat";;
        2) commit_type="fix";;
        3) commit_type="docs";;
        4) commit_type="refactor";;
        5) commit_type="test";;
        6) commit_type="chore";;
        *) echo -e "${COLOR_RED}❌ Tipo inválido${COLOR_RESET}"; return 1;;
    esac
    
    if [ -z "$commit_description" ]; then
        echo -e "${COLOR_RED}❌ Error: Descripción requerida${COLOR_RESET}"
        return 1
    fi
    
    # Añadir archivos y hacer commit
    git add .
    git commit -m "$commit_type: $commit_description"
    
    echo -e "${COLOR_GREEN}✅ Commit realizado exitosamente${COLOR_RESET}"
    echo ""
}

# Menú principal
case "${1:-menu}" in
    "status"|"st")
        show_status
        ;;
    "clean"|"cleanup")
        cleanup_temp_files
        ;;
    "feature"|"feat")
        create_feature_branch
        ;;
    "commit"|"ci")
        smart_commit
        ;;
    "menu"|*)
        show_status
        echo -e "${COLOR_BLUE}🔧 Comandos disponibles:${COLOR_RESET}"
        echo "• $0 status     - Mostrar estado del repositorio"
        echo "• $0 clean      - Limpiar archivos temporales"
        echo "• $0 feature    - Crear nueva rama de feature"
        echo "• $0 commit     - Hacer commit inteligente"
        echo ""
        echo -e "${COLOR_BLUE}📖 Aliases Git configurados:${COLOR_RESET}"
        echo "• git st        - git status"
        echo "• git co        - git checkout"
        echo "• git br        - git branch"
        echo "• git lg        - git log --oneline --graph --all"
        echo "• git unstage   - git reset HEAD --"
        ;;
esac
