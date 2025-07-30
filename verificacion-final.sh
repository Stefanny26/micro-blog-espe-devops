#!/bin/bash

# Verificación final para despliegue público inmediato
# Micro-Blog ESPE - DevOps Project

echo "🔍 VERIFICACIÓN FINAL - MICRO-BLOG ESPE"
echo "========================================"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

score=0
total=10

echo -e "\n${BLUE}📋 Verificando archivos críticos...${NC}"

# 1. Verificar index.html principal
if [ -f "index.html" ] && grep -q "Micro-Blog ESPE" index.html; then
    echo -e "${GREEN}✅ index.html principal presente y configurado${NC}"
    ((score++))
else
    echo -e "${RED}❌ index.html principal faltante o mal configurado${NC}"
fi

# 2. Verificar estructura del proyecto
if [ -d "frontend" ] && [ -d "backend" ] && [ -d "docs" ]; then
    echo -e "${GREEN}✅ Estructura de directorios completa${NC}"
    ((score++))
else
    echo -e "${RED}❌ Estructura de directorios incompleta${NC}"
fi

# 3. Verificar documentación
if [ -f "README.md" ] && [ -f "DESPLIEGUE-INMEDIATO.md" ] && [ -f "DEMO-LIVE.md" ]; then
    echo -e "${GREEN}✅ Documentación completa${NC}"
    ((score++))
else
    echo -e "${RED}❌ Documentación incompleta${NC}"
fi

# 4. Verificar CI/CD
if [ -f ".github/workflows/ci-cd.yml" ] && [ -f ".github/workflows/deploy-netlify.yml" ]; then
    echo -e "${GREEN}✅ Pipelines CI/CD configurados${NC}"
    ((score++))
else
    echo -e "${RED}❌ Pipelines CI/CD faltantes${NC}"
fi

# 5. Verificar tests
if [ -f "backend/tests/api.test.js" ] && [ -f "backend/jest.config.json" ]; then
    echo -e "${GREEN}✅ Tests automatizados configurados${NC}"
    ((score++))
else
    echo -e "${RED}❌ Tests automatizados faltantes${NC}"
fi

# 6. Verificar Git
if [ -d ".git" ] && git status >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Repositorio Git inicializado${NC}"
    ((score++))
else
    echo -e "${RED}❌ Repositorio Git no inicializado${NC}"
fi

# 7. Verificar configuraciones de despliegue
if [ -f "netlify.toml" ] && [ -f "backend/Procfile" ]; then
    echo -e "${GREEN}✅ Configuraciones de despliegue presentes${NC}"
    ((score++))
else
    echo -e "${RED}❌ Configuraciones de despliegue faltantes${NC}"
fi

# 8. Verificar scripts
if [ -f "setup-github-pages.sh" ] && [ -x "setup-github-pages.sh" ]; then
    echo -e "${GREEN}✅ Scripts de automatización listos${NC}"
    ((score++))
else
    echo -e "${RED}❌ Scripts de automatización faltantes${NC}"
fi

# 9. Verificar frontend funcional
if grep -q "localStorage" index.html && grep -q "Bootstrap" index.html; then
    echo -e "${GREEN}✅ Frontend funcional con persistencia${NC}"
    ((score++))
else
    echo -e "${RED}❌ Frontend no completamente funcional${NC}"
fi

# 10. Verificar backend
if [ -f "backend/server.js" ] && grep -q "express" backend/package.json; then
    echo -e "${GREEN}✅ Backend API implementado${NC}"
    ((score++))
else
    echo -e "${RED}❌ Backend API faltante${NC}"
fi

echo -e "\n${BLUE}📊 RESULTADOS:${NC}"
echo -e "Puntuación: ${GREEN}$score/$total${NC}"

if [ $score -eq $total ]; then
    echo -e "\n${GREEN}🎉 ¡PERFECTO! Todo listo para despliegue público${NC}"
    echo -e "\n${BLUE}🚀 PRÓXIMO PASO:${NC}"
    echo "1. Crear repo en GitHub: https://github.com/new"
    echo "2. Nombre: micro-blog-espe-devops (público)"
    echo "3. Ejecutar:"
    echo -e "   ${YELLOW}git remote add origin https://github.com/TU-USUARIO/micro-blog-espe-devops.git${NC}"
    echo -e "   ${YELLOW}git push -u origin main${NC}"
    echo "4. Activar GitHub Pages en Settings > Pages"
    echo -e "5. ${GREEN}¡App live en https://TU-USUARIO.github.io/micro-blog-espe-devops/${NC}"
elif [ $score -ge 8 ]; then
    echo -e "\n${YELLOW}⚠️  Casi listo - revisar elementos faltantes${NC}"
else
    echo -e "\n${RED}❌ Necesita correcciones antes del despliegue${NC}"
fi

echo -e "\n${BLUE}📖 Documentación:${NC}"
echo "- Guía rápida: DESPLIEGUE-INMEDIATO.md"
echo "- Setup completo: docs/github-setup.md"
echo "- Checklist final: FINAL-CHECKLIST.md"

echo -e "\n${BLUE}⏱️  Tiempo estimado hasta link público: 5-10 minutos${NC}"
