# 🌐 Guía de Deployment Netlify - Micro-Blog ESPE

## 📋 Arquitectura de Deployment

Con Netlify vamos a implementar una arquitectura híbrida:
- **Frontend**: Desplegado en Netlify (CDN global)
- **Backend**: Desplegado en Heroku (API)
- **CI/CD**: GitHub Actions para ambos

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │ -> │ GitHub Actions  │ -> │  Deployments    │
│                 │    │                 │    │                 │
│ - Frontend      │    │ - Build         │    │ Frontend: 🌐     │
│ - Backend       │    │ - Test          │    │ Netlify         │
│ - CI/CD         │    │ - Deploy        │    │                 │
│                 │    │                 │    │ Backend: ⚙️      │
└─────────────────┘    └─────────────────┘    │ Heroku          │
                                              └─────────────────┘
```

## 🚀 Pasos para Configurar Netlify

### 1. Crear Cuenta en Netlify

1. **Ir a [netlify.com](https://netlify.com)**
2. **Sign up with GitHub** (recomendado para integración)
3. **Verificar email**

### 2. Obtener Tokens de Acceso

#### Auth Token de Netlify
```bash
# En Netlify Dashboard:
# 1. User settings → Applications → Personal access tokens
# 2. New access token
# 3. Copiar el token generado
```

#### Site ID de Netlify
```bash
# Método 1: Crear sitio manualmente
# 1. Sites → Add new site → Import from Git
# 2. Conectar con GitHub
# 3. Seleccionar repositorio
# 4. El Site ID aparece en Site settings

# Método 2: Usar Netlify CLI
npm install -g netlify-cli
netlify login
netlify sites:create --name micro-blog-espe-[tu-nombre]
# El Site ID aparece en la respuesta
```

### 3. Configurar Secrets en GitHub

Ve a tu repositorio en GitHub:
**Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Valor | Descripción |
|-------------|-------|-------------|
| `NETLIFY_AUTH_TOKEN` | `[tu-token]` | Token de acceso a Netlify |
| `NETLIFY_SITE_ID` | `[tu-site-id]` | ID del sitio en Netlify |
| `HEROKU_API_KEY` | `[tu-heroku-key]` | Para el backend en Heroku |
| `HEROKU_BACKEND_APP_NAME` | `micro-blog-api-[nombre]` | Nombre de la app backend |
| `HEROKU_EMAIL` | `[tu-email]` | Email de Heroku |

### 4. Configurar Backend en Heroku (Para API)

```bash
# Crear app para backend
heroku create micro-blog-espe-backend-[tu-nombre]

# Configurar variables
heroku config:set NODE_ENV=production -a micro-blog-espe-backend-[tu-nombre]
heroku config:set PORT=80 -a micro-blog-espe-backend-[tu-nombre]

# Obtener URL del backend
heroku apps:info micro-blog-espe-backend-[tu-nombre] | grep "Web URL"
```

### 5. Actualizar Frontend para Conectar con Backend

El frontend ya está configurado para detectar automáticamente el entorno:
- **Desarrollo**: `http://localhost:3000/api`
- **Producción**: `/api` (proxy a través de Netlify redirects)

### 6. Deployment Manual (Testing)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login a Netlify
netlify login

# Build del frontend
npm run build

# Deploy de prueba
netlify deploy --dir=dist --site=[tu-site-id]

# Deploy a producción
netlify deploy --prod --dir=dist --site=[tu-site-id]
```

## 🔄 Deployment Automático con GitHub Actions

### Workflow Configurado

El archivo `.github/workflows/deploy-netlify.yml` incluye:

1. **Build Stage**: 
   - Setup de Node.js
   - Install dependencies
   - Build del frontend

2. **Deploy Stage**:
   - Deploy a Netlify
   - Configuración de redirects para API

3. **Verify Stage**:
   - Tests post-deployment
   - Verificación de funcionamiento

### Trigger del Deployment

```bash
# El deployment se activa automáticamente con:
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# O manualmente desde GitHub:
# Actions → Deploy to Netlify → Run workflow
```

## 🌐 URLs del Proyecto

Una vez configurado tendrás:

### Frontend (Netlify)
- **URL Principal**: `https://[site-name].netlify.app`
- **URL Custom** (opcional): `https://microblog.espe.edu.ec`

### Backend (Heroku) 
- **API Base**: `https://micro-blog-espe-backend-[nombre].herokuapp.com`
- **Health Check**: `https://micro-blog-espe-backend-[nombre].herokuapp.com/api/health`

## 🔧 Configuración de Redirects

El archivo `netlify.toml` configura:

```toml
# Proxy API calls al backend en Heroku
[[redirects]]
  from = "/api/*"
  to = "https://micro-blog-espe-backend-[tu-app].herokuapp.com/api/:splat"
  status = 200
  force = true

# SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📊 Verificar Deployment

### Checklist Post-Deploy

- [ ] ✅ Frontend carga en Netlify URL
- [ ] ✅ Backend responde en Heroku URL
- [ ] ✅ API calls funcionan desde frontend
- [ ] ✅ Posts se pueden crear y ver
- [ ] ✅ Responsive design funciona
- [ ] ✅ GitHub Actions pasa todas las etapas

### Comandos de Verificación

```bash
# Verificar frontend
curl -f https://[tu-sitio].netlify.app

# Verificar backend directamente
curl -f https://[tu-backend].herokuapp.com/api/health

# Verificar API a través del frontend
curl -f https://[tu-sitio].netlify.app/api/health

# Test crear post
curl -X POST https://[tu-sitio].netlify.app/api/posts \
  -H "Content-Type: application/json" \
  -d '{"content": "¡Hola desde Netlify!", "author": "DevOps Team"}'
```

## 🛠️ Troubleshooting

### Problemas Comunes

#### 1. API Calls Fallan (CORS)
```javascript
// Verificar que el backend tenga CORS configurado
// En backend/server.js ya está configurado
```

#### 2. 404 en Rutas del Frontend
```toml
# Verificar que netlify.toml tenga la regla SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 3. Build Failures
```bash
# Verificar logs en GitHub Actions
# Verificar que package.json tenga script "build"
```

## 📈 Monitoreo y Métricas

### Netlify Analytics
- **Métricas incluidas**: Page views, unique visitors, bandwidth
- **Performance**: Core Web Vitals, loading times
- **Geographic**: Distribución global de usuarios

### Configurar UptimeRobot
```bash
# URLs a monitorear:
1. https://[tu-sitio].netlify.app (Frontend)
2. https://[tu-sitio].netlify.app/api/health (API via proxy)
3. https://[tu-backend].herokuapp.com/api/health (Backend directo)
```

## 🚀 Deployment de Producción

### Comando Final para Deploy

```bash
# 1. Asegurar que todo está committeado
git status
git add .
git commit -m "feat: ready for production deployment"

# 2. Push para activar CI/CD
git push origin main

# 3. Verificar en GitHub Actions
# Ve a tu repo → Actions → Ver workflow ejecutándose

# 4. Obtener URLs finales
# Frontend: Check Netlify dashboard
# Backend: heroku apps:info [tu-app-backend]
```

### Actualizar Documentación

Una vez deployado, actualizar:
1. **README.md**: Agregar URLs reales
2. **RELEASE-NOTES.md**: Incluir enlaces de producción
3. **Monitoreo**: Configurar UptimeRobot con URLs reales

---

## ✅ Checklist de Deployment

- [ ] Cuenta Netlify creada
- [ ] Tokens y Site ID obtenidos
- [ ] Secrets configurados en GitHub
- [ ] Backend desplegado en Heroku
- [ ] Frontend desplegado en Netlify
- [ ] API proxy funcionando
- [ ] Tests post-deploy pasando
- [ ] Monitoreo configurado
- [ ] URLs documentadas

---

## 📞 Soporte

### Recursos Útiles
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **GitHub Actions**: [docs.github.com/actions](https://docs.github.com/en/actions)
- **Heroku Docs**: [devcenter.heroku.com](https://devcenter.heroku.com)

### Logs y Debugging
```bash
# Netlify deploy logs
netlify logs --site=[site-id]

# GitHub Actions logs
# Ve a tu repo → Actions → Click en workflow run

# Heroku logs
heroku logs --tail -a [tu-app-backend]
```

---

*Guía actualizada para deployment híbrido Netlify + Heroku*  
*DevOps Team ESPE - 30 de julio de 2025*
