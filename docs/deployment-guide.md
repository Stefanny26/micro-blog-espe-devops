# 🚀 Guía de Deployment - Micro-Blog ESPE

## 📋 Prerrequisitos

### Heroku CLI Instalado
```bash
# Ubuntu/Debian
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh

# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Descargar desde https://devcenter.heroku.com/articles/heroku-cli
```

### Cuenta de Heroku
- Registrarse en [heroku.com](https://heroku.com)
- Verificar email
- Configurar método de pago (requerido para add-ons)

## 🔧 Configuración Local

### 1. Login a Heroku
```bash
heroku login
```

### 2. Crear Aplicación
```bash
heroku create micro-blog-espe-[tu-nombre]
# Ejemplo: heroku create micro-blog-espe-devops
```

### 3. Configurar Variables de Entorno
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=80
```

## 📦 Deployment Manual

### 1. Preparar Repositorio
```bash
# Asegurarse de que todos los cambios están committeados
git status
git add .
git commit -m "feat: prepare for Heroku deployment"
```

### 2. Conectar con Heroku
```bash
# Agregar remote de Heroku
heroku git:remote -a [nombre-de-tu-app]
```

### 3. Deploy
```bash
# Push a Heroku
git push heroku main
```

### 4. Verificar Deployment
```bash
# Abrir la aplicación
heroku open

# Ver logs
heroku logs --tail
```

## 🔄 Deployment Automático (CI/CD)

### GitHub Actions (Ya configurado)

El archivo `.github/workflows/ci-cd.yml` ya incluye:

1. **Build & Test**: En cada push
2. **Deploy**: Automático en main branch
3. **Post-Deploy Test**: Verificación después del deploy

### Configurar Secrets en GitHub

1. Ir a tu repositorio en GitHub
2. Settings > Secrets and variables > Actions
3. Agregar estos secrets:

```
HEROKU_API_KEY: [tu-api-key-de-heroku]
HEROKU_APP_NAME: [nombre-de-tu-app]
HEROKU_EMAIL: [tu-email-de-heroku]
```

Para obtener tu API Key:
```bash
heroku auth:token
```

## 🌐 URLs y Endpoints

### Aplicación Desplegada
- **Frontend**: `https://[tu-app].herokuapp.com/`
- **API Health**: `https://[tu-app].herokuapp.com/api/health`
- **API Posts**: `https://[tu-app].herokuapp.com/api/posts`

### Pruebas Post-Deploy
```bash
# Health Check
curl https://[tu-app].herokuapp.com/api/health

# Obtener posts
curl https://[tu-app].herokuapp.com/api/posts

# Crear post
curl -X POST https://[tu-app].herokuapp.com/api/posts \
  -H "Content-Type: application/json" \
  -d '{"content": "¡Hola desde Heroku!", "author": "DevOps Team"}'
```

## 🐛 Troubleshooting

### Problemas Comunes

#### 1. Application Error (H10)
```bash
# Verificar logs
heroku logs --tail

# Verificar Procfile
cat Procfile

# Verificar que el puerto esté configurado
heroku config:get PORT
```

#### 2. Build Failures
```bash
# Verificar dependencias
heroku run npm list

# Revisar package.json engines
heroku run node --version
```

#### 3. Database Issues (Future)
```bash
# Para cuando agreguemos base de datos
heroku addons:create heroku-postgresql:hobby-dev
heroku config:get DATABASE_URL
```

## 📊 Monitoreo Post-Deploy

### Heroku Metrics
```bash
# Ver métricas
heroku ps
heroku logs --tail

# Verificar recursos
heroku run bash
```

### UptimeRobot (Ver monitoring-plan.md)
1. Crear cuenta en uptimerobot.com
2. Agregar monitor para tu URL
3. Configurar alertas

## 🔒 Seguridad

### Variables de Entorno Seguras
```bash
# Nunca commitear secrets
heroku config:set API_SECRET=xxx
heroku config:set DB_PASSWORD=xxx
```

### Headers de Seguridad (ya implementados)
- CORS configurado
- Content-Type validation
- Input sanitization

## 🚀 Próximos Pasos

1. **Custom Domain**:
   ```bash
   heroku domains:add www.microblog-espe.edu.ec
   ```

2. **SSL Certificates**:
   ```bash
   heroku certs:auto:enable
   ```

3. **Scaling**:
   ```bash
   heroku ps:scale web=2
   ```

---

## 📝 Checklist de Deployment

- [ ] Heroku CLI instalado
- [ ] Aplicación creada en Heroku
- [ ] Variables de entorno configuradas
- [ ] Secrets de GitHub configurados
- [ ] Pipeline CI/CD funcionando
- [ ] URL pública accesible
- [ ] Health check respondiendo
- [ ] Frontend cargando correctamente
- [ ] API endpoints funcionando
- [ ] Monitoreo configurado
- [ ] Release notes publicadas

---

*Última actualización: 30 de julio de 2025*
*Documentado por: DevOps Team ESPE*
