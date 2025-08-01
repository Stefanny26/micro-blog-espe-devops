# Micro-Blog Institucional ESPE 🎓

Una aplicación web de micro-blogging para fomentar la comunicación interna en la Universidad de las Fuerzas Armadas ESPE.

## 📋 Descripción del Proyecto

Esta aplicación permite a los usuarios publicar mensajes cortos (hasta 280 caracteres) que serán visibles para toda la comunidad universitaria, promoviendo la comunicación y el intercambio de ideas.

## ✨ Funcionalidades (MVP)

- **Publicar Mensaje**: Campo de texto y botón para crear nuevos posts
- **Listar Mensajes**: Visualización de todos los mensajes ordenados por fecha (más reciente primero)

## 🛠️ Tecnologías Utilizadas

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap para estilos responsivos

### Backend
- Node.js + Express.js
- Base de datos en memoria (para simplificar el MVP)

### DevOps
- **Control de Versiones**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Despliegue**: Heroku
- **Monitoreo**: UptimeRobot

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    HTTP     ┌─────────────────┐
│    Frontend     │ ◄─────────► │     Backend     │
│   (HTML/CSS/JS) │             │  (Node.js/API)  │
└─────────────────┘             └─────────────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │   Datos en      │
                                │    Memoria      │
                                └─────────────────┘
```

## 🚀 Cómo Ejecutar Localmente

### Prerrequisitos
- Node.js (v14 o superior)
- npm

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/[tu-usuario]/micro-blog-devops.git
cd micro-blog-devops

# Instalar dependencias del backend
cd backend
npm install

# Ejecutar el servidor
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🚀 Deployment

### Manual Netlify Setup (Required First Time)

Since this is a new project, you need to set up Netlify manually:

1. **Go to [netlify.com](https://netlify.com) and sign up with GitHub**
2. **Click "Add new site" → "Import from Git"**
3. **Connect to GitHub and select this repository**: `Stefanny26/micro-blog-espe-devops`
4. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: (leave empty)
5. **Deploy site**

The site will be available at: `https://[random-name].netlify.app`

### Optional: Custom Domain
To get a predictable URL like `micro-blog-espe-devops.netlify.app`:
1. In Netlify dashboard → Site settings → General → Change site name
2. Update the URL in this README

### Frontend (Netlify) - Auto Deploy
Once configured, the frontend deploys automatically:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Deploy Trigger**: Push to `main` branch

### GitHub Pages (Backup)
Also available in GitHub Pages as alternative:
- **URL**: https://stefanny26.github.io/micro-blog-espe-devops/
- **Setup**: Enable in repo Settings → Pages → Deploy from branch `main`

### Build Local
```bash
# Construir el frontend
npm run build

# Los archivos se generan en /dist/
ls dist/
```

## 🧪 Ejecutar Pruebas

```bash
# Ejecutar script de pruebas completo
./local-test.sh

# O ejecutar solo las pruebas del backend
cd backend
npm test
```

**Cobertura de Pruebas**: 10 casos de prueba cubriendo:
- Health check endpoint
- Creación de posts
- Validaciones (contenido vacío, límite de caracteres)
- Listado ordenado de posts
- Búsqueda por ID
- Manejo de errores

## 🔄 Flujo DevOps Implementado

```
PLAN → CODE → BUILD → TEST → RELEASE → DEPLOY → OPERATE → MONITOR
  ↑                                                            ↓
  └──────────────────── FEEDBACK LOOP ────────────────────────┘
```

### Etapas:
1. **PLAN**: Gestión de tareas con GitHub Projects
2. **CODE**: Desarrollo con commits semánticos
3. **BUILD**: Automatización con GitHub Actions
4. **TEST**: Pruebas unitarias automatizadas
5. **RELEASE**: Versionado semántico
6. **DEPLOY**: Despliegue automático a Heroku
7. **OPERATE**: Aplicación en producción
8. **MONITOR**: Monitoreo con UptimeRobot

## 📊 Estado del Proyecto

- ✅ Configuración inicial
- ✅ Estructura del proyecto  
- ✅ Backend API (10/10 tests pasando)
- ✅ Frontend responsivo
- ✅ Pipeline CI/CD (GitHub Actions)
- ✅ Build automático (`dist/` directory)
- ✅ Repositorio GitHub activo
- 📋 **NEXT**: Configurar manualmente Netlify (pasos arriba)
- 🔄 Monitoreo en configuración

## 🌐 Enlaces del Proyecto

- **Aplicación Frontend**: [Pendiente configuración manual Netlify](https://netlify.com) *(seguir pasos arriba)*
- **Demo Alternativo**: [GitHub Pages](https://stefanny26.github.io/micro-blog-espe-devops/) *(activar en Settings → Pages)*
- **Repositorio GitHub**: https://github.com/Stefanny26/micro-blog-espe-devops
- **Tablero Kanban**: [Ver estado de tareas](./docs/kanban-board.md)
- **Plan de Monitoreo**: [Ver estrategia](./docs/monitoring-plan.md)
- **Guía de Deployment**: [Ver instrucciones](./docs/deployment-guide.md)

## 📝 Notas de Versión

### v1.0.0 - MVP Release
- Funcionalidad básica de publicación de mensajes
- Listado de mensajes ordenado cronológicamente
- API REST completa
- Interface de usuario responsiva
- Pipeline CI/CD funcionando
- Despliegue automático

## 👥 Equipo de Desarrollo

- **Desarrollador**: [Tu Nombre]
- **Universidad**: ESPE - Universidad de las Fuerzas Armadas
- **Materia**: Programación Avanzada 202550

## 📄 Licencia

Este proyecto es desarrollado con fines académicos para la Universidad ESPE.

---

*Desarrollado con ❤️ para la comunidad ESPE*
