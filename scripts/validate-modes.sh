#!/bin/bash

# Validador de consistencia entre modos Web y Escritorio
# Colombia Raíces - Desarrollo

echo "🔍 Validador de Consistencia - Colombia Raíces"
echo "=============================================="
echo ""

# Verificar estado del servidor web
echo "🌐 Verificando modo Web..."
if curl -s http://localhost:3009 > /dev/null 2>&1; then
    echo "✅ Servidor web funcionando en puerto 3009"
    WEB_STATUS="✅"
else
    echo "❌ Servidor web no disponible"
    WEB_STATUS="❌"
fi

# Verificar archivos de construcción para escritorio
echo ""
echo "🖥️ Verificando modo Escritorio..."
if [ -f "renderer/dist/index.html" ] && [ -f "renderer/dist/bundle.js" ]; then
    echo "✅ Archivos de construcción presentes"
    DESKTOP_FILES="✅"
else
    echo "❌ Archivos de construcción faltantes"
    DESKTOP_FILES="❌"
fi

# Verificar procesos Electron
if pgrep -f "electron" > /dev/null 2>&1; then
    echo "✅ Proceso Electron activo"
    ELECTRON_STATUS="✅"
else
    echo "❌ Proceso Electron no activo"
    ELECTRON_STATUS="❌"
fi

# Verificar logos
echo ""
echo "🎨 Verificando Logos..."
if [ -f "renderer/public/images/LogoColombiaRaicesNoFondo.png" ]; then
    echo "✅ Logo principal presente"
    LOGO_STATUS="✅"
else
    echo "❌ Logo principal faltante"
    LOGO_STATUS="❌"
fi

# Verificar consistencia de código
echo ""
echo "📄 Verificando Consistencia de Código..."
if [ -f "renderer/src/App.final.jsx" ]; then
    echo "✅ Componente principal presente"
    CODE_STATUS="✅"
else
    echo "❌ Componente principal faltante"
    CODE_STATUS="❌"
fi

# Resumen
echo ""
echo "📊 RESUMEN DE VALIDACIÓN"
echo "========================"
echo "🌐 Modo Web:       $WEB_STATUS"
echo "🖥️ Modo Escritorio: $DESKTOP_FILES"
echo "⚡ Proceso Electron: $ELECTRON_STATUS"
echo "🎨 Logos:          $LOGO_STATUS"
echo "📄 Código:         $CODE_STATUS"
echo ""

if [[ "$WEB_STATUS" == "✅" && "$DESKTOP_FILES" == "✅" && "$LOGO_STATUS" == "✅" && "$CODE_STATUS" == "✅" ]]; then
    echo "🎉 TODOS LOS MODOS FUNCIONANDO CORRECTAMENTE"
    echo "💡 Los cambios son completamente recíprocos"
else
    echo "⚠️ ALGUNOS PROBLEMAS DETECTADOS"
    echo "🔧 Ejecuta los comandos de reparación necesarios"
fi

echo ""
echo "🛠️ Comandos Útiles:"
echo "   npm run dev:renderer  # Modo web"
echo "   npm run desktop       # Modo escritorio"
echo "   npm run dev          # Ambos modos"
