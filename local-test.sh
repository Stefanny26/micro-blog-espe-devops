#!/bin/bash

# Script para pruebas locales del Micro-Blog ESPE
# Ejecutar con: ./local-test.sh

echo "🧪 Ejecutando pruebas locales del Micro-Blog ESPE..."
echo "=================================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "backend/package.json" ]; then
    echo "❌ Error: Ejecuta este script desde la raíz del proyecto"
    exit 1
fi

# Navegar al backend
cd backend

echo "📦 Instalando dependencias..."
npm install

echo "🧪 Ejecutando pruebas unitarias..."
npm test

if [ $? -eq 0 ]; then
    echo "✅ Todas las pruebas pasaron!"
else
    echo "❌ Algunas pruebas fallaron"
    exit 1
fi

echo "🚀 Iniciando servidor local..."
echo "📱 Aplicación disponible en: http://localhost:3000"
echo "🔍 Health check: http://localhost:3000/api/health"
echo "📋 API Posts: http://localhost:3000/api/posts"
echo ""
echo "Presiona Ctrl+C para detener el servidor"

npm start
