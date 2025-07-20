@echo off
echo Starting Colombia Raices Application...
cd /d E:\ColombiaRaices

echo Killing existing processes...
taskkill /F /IM electron.exe 2>nul
taskkill /F /IM node.exe 2>nul

echo Starting minimal Electron app...
node main/electron-minimal.js

pause
