#!/bin/bash
# Script para manejar puertos en el desarrollo de Colombia Raíces

# Función para mostrar puertos ocupados
show_ports() {
    echo "🔍 Puertos ocupados en el rango 3000-3010:"
    netstat -ano | findstr :300 | grep LISTENING
}

# Función para liberar puertos específicos
kill_port() {
    local port=$1
    if [ -z "$port" ]; then
        echo "❌ Error: Especifica un puerto. Uso: kill_port 3005"
        return 1
    fi
    
    echo "🔥 Liberando puerto $port..."
    local pid=$(netstat -ano | findstr :$port | grep LISTENING | head -1 | awk '{print $5}')
    
    if [ -n "$pid" ]; then
        cmd /c "taskkill /F /PID $pid"
        echo "✅ Puerto $port liberado"
    else
        echo "⚠️  Puerto $port no está en uso"
    fi
}

# Función para liberar todos los puertos de desarrollo
clean_dev_ports() {
    echo "🧹 Limpiando puertos de desarrollo (3000-3010)..."
    
    # Obtener todos los PIDs de puertos 3000-3010
    local pids=$(netstat -ano | grep -E ':300[0-9]' | grep LISTENING | awk '{print $5}' | sort -u)
    
    if [ -n "$pids" ]; then
        for pid in $pids; do
            echo "🔥 Terminando proceso PID: $pid"
            cmd /c "taskkill /F /PID $pid" 2>/dev/null
            # Esperar un momento para asegurar que el proceso termine
            sleep 1
        done
        echo "✅ Puertos de desarrollo liberados"
        
        # Verificar que los puertos se liberaron
        local remaining=$(netstat -ano | grep -E ':300[0-9]' | grep LISTENING | wc -l)
        if [ $remaining -eq 0 ]; then
            echo "✅ Confirmado: Todos los puertos liberados"
        else
            echo "⚠️  Algunos puertos pueden seguir ocupados"
        fi
    else
        echo "⚠️  No hay puertos de desarrollo en uso"
    fi
}

# Función para iniciar el servidor de desarrollo
start_dev() {
    echo "🚀 Iniciando servidor de desarrollo..."
    cd renderer && npx webpack serve --config webpack.config.js --mode development --port 3009
}

# Función para mostrar ayuda
show_help() {
    echo "📋 Colombia Raíces - Gestor de Puertos"
    echo "Uso: ./scripts/ports.sh [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  show         - Mostrar puertos ocupados"
    echo "  kill [port]  - Liberar puerto específico"
    echo "  clean        - Liberar todos los puertos de desarrollo"
    echo "  start        - Iniciar servidor de desarrollo"
    echo "  help         - Mostrar esta ayuda"
}

# Procesamiento de argumentos
case "$1" in
    "show")
        show_ports
        ;;
    "kill")
        kill_port $2
        ;;
    "clean")
        clean_dev_ports
        ;;
    "start")
        start_dev
        ;;
    "help"|"")
        show_help
        ;;
    *)
        echo "❌ Comando no reconocido: $1"
        show_help
        ;;
esac
