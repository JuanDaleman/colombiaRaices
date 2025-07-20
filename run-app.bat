@echo off
REM 🚀 Script de Windows para ejecutar Colombia Raíces
REM Ejecutar con: run-app.bat

echo 🧹 Limpiando procesos previos...
call npm run ports:clean

echo 🔄 Limpiando cache de npm...
call npm cache clean --force

echo 🏗️ Compilando aplicacion...
call npm run build:renderer

echo ✅ Build completado!
echo 📋 INSTRUCCIONES DE TESTING:
echo    1. La aplicacion se abrira en unos segundos
echo    2. Verifica que la LANDING PAGE muestre el header verde correctamente
echo    3. Navega a 'Reservas' y verifica que aparezca el TravelerHeader
echo    4. Abre DevTools (F12) para ver los logs de debug
echo.
echo 🔍 Logs a buscar en la consola:
echo    - ✅ Showing navigation for route: /
echo    - 🚫 Hiding navigation for route: /reservations
echo.

echo 🚀 Ejecutando aplicacion...
call npm start
