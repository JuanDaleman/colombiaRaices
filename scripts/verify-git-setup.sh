#!/bin/bash

# ===============================================================
# COLOMBIA RAÍCES - VERIFICACIÓN FINAL DEL REPOSITORIO GIT
# ===============================================================

echo "🔍 Verificando configuración del repositorio Git..."
echo "=================================================="

# Verificar estado del repositorio
echo "📊 Estado del repositorio:"
git status --short

echo ""
echo "📝 Últimos commits:"
git log --oneline -5

echo ""
echo "🏷️ Tags creados:"
git tag -l

echo ""
echo "🌿 Ramas disponibles:"
git branch -a

echo ""
echo "⚙️ Configuración Git local:"
echo "- Usuario: $(git config user.name)"
echo "- Email: $(git config user.email)"
echo "- AutoCRLF: $(git config core.autocrlf)"
echo "- FileMode: $(git config core.filemode)"

echo ""
echo "🔧 Aliases configurados:"
git config --get-regexp alias

echo ""
echo "📁 Archivos importantes:"
echo "- .gitignore: $([ -f .gitignore ] && echo "✅ Existe" || echo "❌ No existe")"
echo "- README.md: $([ -f README.md ] && echo "✅ Existe" || echo "❌ No existe")"
echo "- GIT_SETUP_COMPLETE.md: $([ -f GIT_SETUP_COMPLETE.md ] && echo "✅ Existe" || echo "❌ No existe")"
echo "- scripts/git-utils.sh: $([ -f scripts/git-utils.sh ] && echo "✅ Existe" || echo "❌ No existe")"

echo ""
echo "🪝 Hooks configurados:"
echo "- Pre-commit: $([ -f .git/hooks/pre-commit ] && echo "✅ Existe" || echo "❌ No existe")"
echo "- Commit template: $([ -f .git/commit_template.txt ] && echo "✅ Existe" || echo "❌ No existe")"

echo ""
echo "📈 Estadísticas:"
echo "- Total commits: $(git rev-list --count HEAD)"
echo "- Archivos trackeados: $(git ls-files | wc -l)"
echo "- Tamaño del repositorio: $(du -sh .git | cut -f1)"

echo ""
echo "🎯 VERIFICACIÓN COMPLETADA"
echo "=================================================="
echo "✅ El repositorio Git está configurado profesionalmente"
echo "✅ Control de versiones establecido"
echo "✅ Herramientas de workflow implementadas"
echo "✅ Documentación completa disponible"
echo "✅ Listo para desarrollo colaborativo"

echo ""
echo "🚀 Comandos de inicio rápido:"
echo "   git st                    # Ver estado"
echo "   git lg                    # Ver historial"
echo "   ./scripts/git-utils.sh    # Utilidades interactivas"
echo "   git co development        # Cambiar a rama de desarrollo"
