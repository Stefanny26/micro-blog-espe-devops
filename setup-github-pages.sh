#!/bin/bash

# Script para configurar GitHub Pages automaticamente
# Micro-Blog ESPE - DevOps Project

set -e

echo "🚀 Configurando GitHub Pages para Micro-Blog ESPE..."
echo "=================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "README.md" ] || [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Ejecuta este script desde el directorio raíz del proyecto${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Verificando estado del proyecto...${NC}"

# Verificar archivos críticos
critical_files=("index.html" "README.md" "DEMO-LIVE.md" "frontend/index.html" "backend/server.js")
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file no encontrado${NC}"
        exit 1
    fi
done

echo -e "\n${BLUE}🔧 Configurando Git si es necesario...${NC}"

# Configurar git si no está configurado
if ! git config user.name >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Configurando usuario Git...${NC}"
    echo "Ingresa tu nombre para Git:"
    read -r git_name
    git config user.name "$git_name"
fi

if ! git config user.email >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Configurando email Git...${NC}"
    echo "Ingresa tu email para Git:"
    read -r git_email
    git config user.email "$git_email"
fi

echo -e "\n${BLUE}📝 Preparando commit...${NC}"

# Agregar todos los archivos
git add .

# Commit si hay cambios
if ! git diff --staged --quiet; then
    echo -e "${GREEN}💾 Creando commit...${NC}"
    git commit -m "feat: configuración completa del proyecto micro-blog ESPE

- ✅ Backend API con Express y validaciones
- ✅ Frontend responsive con Bootstrap
- ✅ Tests automatizados con Jest
- ✅ CI/CD con GitHub Actions
- ✅ Demo funcional con localStorage
- ✅ Documentación completa
- ✅ Configuración para Heroku y Netlify
- ✅ Monitoreo y métricas
- 🚀 Listo para GitHub Pages

Entregable 3 - Ciclo DevOps Completo"
else
    echo -e "${YELLOW}⚠️  No hay cambios para commitear${NC}"
fi

echo -e "\n${BLUE}🌐 Configurando para GitHub Pages...${NC}"

# Verificar que index.html existe en la raíz
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ index.html no encontrado en la raíz${NC}"
    exit 1
fi

echo -e "\n${GREEN}✅ ¡Configuración completada!${NC}"
echo -e "\n${BLUE}📋 PRÓXIMOS PASOS:${NC}"
echo "1. Crear repositorio en GitHub:"
echo "   - Ve a https://github.com/new"
echo "   - Nombre: micro-blog-espe-devops"
echo "   - Público ✅"
echo "   - NO inicializar con README"
echo ""
echo "2. Conectar y subir el código:"
echo -e "   ${YELLOW}git remote add origin https://github.com/TU-USUARIO/micro-blog-espe-devops.git${NC}"
echo -e "   ${YELLOW}git branch -M main${NC}"
echo -e "   ${YELLOW}git push -u origin main${NC}"
echo ""
echo "3. Activar GitHub Pages:"
echo "   - Settings > Pages > Source: Deploy from a branch"
echo "   - Branch: main > / (root) > Save"
echo ""
echo "4. Tu app estará live en:"
echo -e "   ${GREEN}https://TU-USUARIO.github.io/micro-blog-espe-devops/${NC}"
echo ""
echo -e "${BLUE}📖 Para más detalles ver: docs/github-setup.md${NC}"
echo ""
echo -e "${GREEN}🎉 ¡Proyecto listo para despliegue público!${NC}"
