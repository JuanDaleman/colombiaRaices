@echo off
chcp 65001 >nul

echo ================================================================
echo        PRUEBA DEL INSTALADOR COLOMBIA RAÍCES
echo ================================================================
echo.

:: Paso 1: Verificar ubicación
echo [1/5] Verificando ubicación del proyecto...
if not exist "package.json" (
    echo ❌ ERROR: package.json no encontrado
    goto error
)
echo ✅ Proyecto encontrado

:: Paso 2: Verificar Node.js
echo.
echo [2/5] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js no encontrado
    goto error
)
echo ✅ Node.js disponible

:: Paso 3: Verificar npm
echo.
echo [3/5] Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: npm no encontrado
    goto error
)
echo ✅ npm disponible

:: Paso 4: Verificar dependencias
echo.
echo [4/5] Verificando dependencias...
if not exist "node_modules" (
    echo ⚠️  Dependencias no instaladas (normal para primera ejecución)
) else (
    echo ✅ Dependencias encontradas
)

:: Paso 5: Verificar build
echo.
echo [5/5] Verificando build...
if not exist "renderer\dist" (
    echo ⚠️  Build no encontrado (se creará durante instalación)
) else (
    echo ✅ Build encontrado
)

echo.
echo ================================================================
echo ✅ PRUEBA COMPLETADA - INSTALADOR LISTO PARA USO
echo ================================================================
echo.
echo Para instalar el proyecto ejecuta:
echo   instalar-colombia-raices.bat
echo.
echo Para ejecutar la aplicación después de instalar:
echo   ejecutar-colombia-raices.bat
echo.
goto end

:error
echo.
echo ❌ Prueba fallida - revisa los requisitos
echo.

:end
pause
