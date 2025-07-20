@echo off
chcp 65001 >nul
title Colombia Raíces - Ejecutar Aplicación

:: ================================================================
:: EJECUTAR COLOMBIA RAÍCES - TURISMO COMUNITARIO
:: Script de ejecución rápida
:: ================================================================

cls
echo ================================================================
echo       🇨🇴 COLOMBIA RAÍCES - TURISMO COMUNITARIO 🇨🇴
echo ================================================================
echo.
echo Iniciando aplicación...
echo.

:: Verificar que estamos en la carpeta correcta
if not exist "package.json" (
    echo ❌ ERROR: No se encontró el archivo package.json
    echo.
    echo Ejecuta este script desde la carpeta raíz del proyecto.
    echo.
    pause
    exit /b 1
)

:: Verificar que el proyecto esté instalado
if not exist "node_modules" (
    echo ❌ ERROR: Dependencias no instaladas
    echo.
    echo Ejecuta primero: instalar-colombia-raices.bat
    echo O ejecuta manualmente: npm install
    echo.
    pause
    exit /b 1
)

:: Verificar que el build existe
if not exist "renderer\dist" (
    echo 🔧 Build no encontrado, construyendo aplicación...
    echo.
    npm run build:renderer
    if errorlevel 1 (
        echo ❌ ERROR: Falló la construcción
        pause
        exit /b 1
    )
)

echo ✅ Verificaciones completadas
echo.
echo 🚀 Ejecutando Colombia Raíces...
echo.
echo ℹ️ La aplicación se abrirá en unos momentos.
echo   Puedes cerrar esta ventana una vez que la aplicación esté abierta.
echo.

:: Ejecutar la aplicación
npm start

pause
