# 🔧 Configuración de Repositorio GitHub - Micro-Blog ESPE

## 📋 Pasos para Configurar el Repositorio

### 1. Crear Repositorio en GitHub

1. **Ir a [github.com](https://github.com)**
2. **Click en "New repository"**
3. **Configurar el repositorio**:
   - **Repository name**: `micro-blog-institucional-espe`
   - **Description**: `Micro-Blog Institucional ESPE - Proyecto DevOps 2025`
   - **Visibility**: Public ✅
   - **Initialize this repository with**: 
     - [ ] ❌ README (ya tenemos uno)
     - [ ] ❌ .gitignore (ya tenemos uno)
     - [ ] ❌ License (opcional)

### 2. Conectar Repositorio Local

```bash
# En tu terminal, desde el directorio del proyecto:
cd /home/stefy/Escritorio/micro-blog-devops

# Agregar origin remoto
git remote add origin https://github.com/[tu-usuario]/micro-blog-institucional-espe.git

# Verificar remote
git remote -v

# Push inicial
git push -u origin main
```

### 3. Configurar GitHub Secrets para CI/CD

Ve a tu repositorio en GitHub:

**Settings → Secrets and variables → Actions → New repository secret**

Agregar estos secrets:

| Secret Name | Descripción | Cómo obtener |
|-------------|-------------|--------------|
| `HEROKU_API_KEY` | API Key de Heroku | `heroku auth:token` |
| `HEROKU_APP_NAME` | Nombre de tu app | `micro-blog-espe-[tu-nombre]` |
| `HEROKU_EMAIL` | Tu email de Heroku | Email de tu cuenta |

### 4. Configurar GitHub Projects (Kanban)

1. **En tu repositorio**: Tab "Projects"
2. **Create a project**: 
   - Template: "Board"
   - Name: "Micro-Blog DevOps Sprint"
3. **Configurar columnas**:
   - 📋 Backlog
   - 🔄 In Progress  
   - 👀 In Review
   - ✅ Done

4. **Importar issues desde kanban-board.md**

### 5. Proteger Branch Main

**Settings → Branches → Add rule**

Configuraciones recomendadas:
- ✅ **Require status checks to pass**
- ✅ **Require branches to be up to date**
- ✅ **CI/CD Pipeline** (cuando esté funcionando)
- ✅ **Restrict pushes that create files larger than 100 MB**

## 🔄 Workflow de Desarrollo

### Branching Strategy

```bash
# Feature branch
git checkout -b feature/nueva-funcionalidad
git add .
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
# Después del merge:
git checkout main
git pull origin main
```

### Semantic Commits (Ya implementado)

```bash
# Ejemplos de commits semánticos:
git commit -m "feat: agregar endpoint de posts"
git commit -m "fix: corregir validación de contenido"
git commit -m "docs: actualizar README"
git commit -m "ci: configurar GitHub Actions"
git commit -m "test: agregar pruebas de integración"
git commit -m "refactor: mejorar estructura de código"
```

## 📊 Configurar Issues y Milestones

### Milestones Sugeridos

1. **MVP v1.0.0** (30 Jul 2025)
   - Backend API completo
   - Frontend funcional
   - CI/CD configurado

2. **Production Deploy** (31 Jul 2025)
   - Deployment a Heroku
   - Monitoreo configurado
   - Documentación final

### Labels Útiles

- `epic` (violeta) - Épicas grandes
- `feature` (verde) - Nuevas funcionalidades  
- `bug` (rojo) - Bugs
- `docs` (azul) - Documentación
- `ci/cd` (amarillo) - DevOps
- `priority:high` (rojo) - Alta prioridad

## 🔍 Verificar Configuración

### Checklist Post-Setup

- [ ] ✅ Repositorio creado en GitHub
- [ ] ✅ Código pusheado a main
- [ ] ✅ Secrets configurados correctamente
- [ ] ✅ GitHub Actions funcionando
- [ ] ✅ Branch protection activada
- [ ] ✅ Projects/Kanban configurado
- [ ] ✅ Issues y milestones creados

### Comandos de Verificación

```bash
# Verificar remote
git remote -v

# Verificar último commit
git log --oneline -5

# Verificar status
git status

# Verificar branches
git branch -a
```

## 🌐 URLs del Proyecto

Una vez configurado, tendrás estas URLs:

- **Repositorio**: `https://github.com/[usuario]/micro-blog-institucional-espe`
- **Actions**: `https://github.com/[usuario]/micro-blog-institucional-espe/actions`
- **Projects**: `https://github.com/[usuario]/micro-blog-institucional-espe/projects`
- **Issues**: `https://github.com/[usuario]/micro-blog-institucional-espe/issues`

## 🚀 Trigger Primer Deploy

```bash
# Hacer un cambio menor para trigger el pipeline
echo "# Deploy Test" >> README.md
git add README.md
git commit -m "ci: trigger first deployment pipeline"
git push origin main
```

Ve a la tab "Actions" en GitHub para ver el pipeline ejecutándose.

---

## 📞 Soporte

Si tienes problemas:

1. **Verificar logs de GitHub Actions**
2. **Revisar configuración de secrets**
3. **Consultar documentación de Heroku**
4. **Revisar este README para troubleshooting**

---

*Guía creada por: DevOps Team ESPE*
*Fecha: 30 de julio de 2025*
