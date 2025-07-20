@echo off
echo 🚀 Starting Colombia Raices Application - Build Verification
echo ========================================================

echo 📍 Current directory: %CD%
echo 🕐 Start time: %DATE% %TIME%

echo 🔍 Checking build artifacts...
if exist "renderer\dist\index.html" (
    echo ✅ Frontend build found
) else (
    echo ❌ Frontend build missing
    exit /b 1
)

if exist "main\electron.js" (
    echo ✅ Backend files found
) else (
    echo ❌ Backend files missing
    exit /b 1
)

echo 🎯 Starting Electron application...
echo 📝 Output will be logged to app-output.log

npm start > app-output.log 2>&1
