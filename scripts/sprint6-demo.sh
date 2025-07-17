#!/bin/bash

# Colombia Raíces - Sprint 6 Demo Script
# Demonstrates the complete authentication flow

echo "🇨🇴 Colombia Raíces - Sprint 6 Demo"
echo "===================================="
echo ""
echo "🎯 Acceptance Criteria: 'Usuario puede registrarse e iniciar sesión correctamente'"
echo ""

# Start the development server
echo "🚀 Starting development server..."
cd /e/ColombiaRaices
npm run dev:renderer &
DEV_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 5

echo ""
echo "✅ Development server started on http://localhost:3009"
echo ""

# Demo instructions
echo "🎮 DEMO INSTRUCTIONS:"
echo "===================="
echo ""
echo "1. 📝 REGISTRATION FLOW:"
echo "   • Navigate to: http://localhost:3009/register"
echo "   • Fill the form with any valid data"
echo "   • Select user type: 🧳 Viajero or 🏘️ Operador Comunitario"
echo "   • Submit the form"
echo "   • ✅ System will redirect to appropriate dashboard"
echo ""
echo "2. 🔐 LOGIN FLOW:"
echo "   • Navigate to: http://localhost:3009/login"
echo "   • Use test credentials:"
echo "     - Traveler: viajero@test.com / password123"
echo "     - Operator: operador@test.com / password123"
echo "   • ✅ System will redirect to correct dashboard based on user type"
echo ""
echo "3. 🎛️ DASHBOARD FEATURES:"
echo "   • Traveler Dashboard: Search experiences, manage reservations"
echo "   • Operator Dashboard: Publish experiences, manage bookings"
echo "   • Both have logout functionality"
echo ""
echo "4. 🔄 NAVIGATION:"
echo "   • Home → Login → Register → Dashboard"
echo "   • All forms have proper validation"
echo "   • Consistent UI/UX throughout"
echo ""

echo "🌐 Open your browser and navigate to: http://localhost:3009"
echo ""
echo "Press Ctrl+C to stop the demo server"
echo ""

# Keep the server running
wait $DEV_PID
