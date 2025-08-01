#!/bin/bash

echo "🚀 Micro-Blog ESPE - Deployment Status Check"
echo "=============================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "\n📋 Checking deployment status..."

# Check if dist directory exists
if [ -d "dist" ]; then
    echo -e "${GREEN}✅ dist/ directory exists${NC}"
    echo "   Files in dist/:"
    ls -la dist/
else
    echo -e "${RED}❌ dist/ directory missing${NC}"
    echo "   Run: npm run build"
fi

# Check if files are built
if [ -f "dist/index.html" ]; then
    echo -e "${GREEN}✅ Frontend built successfully${NC}"
else
    echo -e "${RED}❌ Frontend not built${NC}"
fi

# Check if git is up to date
echo -e "\n📡 Git status:"
git status --porcelain

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Git repository is clean${NC}"
else
    echo -e "${YELLOW}⚠️  There are uncommitted changes${NC}"
fi

# Show last commit
echo -e "\n📝 Latest commit:"
git log --oneline -1

# Test URLs
echo -e "\n🌐 Testing deployment URLs..."

# Test Netlify URL
NETLIFY_URL="https://micro-blog-espe-devops.netlify.app"
echo -e "\n🔗 Testing Netlify: $NETLIFY_URL"
curl -s -o /dev/null -w "Status: %{http_code}\n" "$NETLIFY_URL" || echo "Connection failed"

# Test GitHub Pages
GITHUB_URL="https://stefanny26.github.io/micro-blog-espe-devops/"
echo -e "\n🔗 Testing GitHub Pages: $GITHUB_URL"
curl -s -o /dev/null -w "Status: %{http_code}\n" "$GITHUB_URL" || echo "Connection failed"

echo -e "\n✨ Deployment check complete!"
echo "📖 For more details, check: docs/netlify-deployment.md"
