#!/bin/bash
cd "/e/ColombiaRaices"

echo "🔄 Killing existing processes..."
taskkill //F //IM electron.exe 2>/dev/null || echo "No electron processes to kill"
taskkill //F //IM node.exe 2>/dev/null || echo "No node processes to kill"

echo "🚀 Starting Electron application..."
npx electron .

echo "✅ Application started"
