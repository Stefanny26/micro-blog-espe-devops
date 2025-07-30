# 📋 Tablero Kanban - Micro-Blog Institucional ESPE

## 🎯 Épicas del Proyecto

### Epic 1: Backend API Development
- Desarrollo de la API REST para el micro-blog
- Gestión de posts y validaciones

### Epic 2: Frontend Development  
- Interfaz de usuario responsive
- Integración con la API

### Epic 3: DevOps Pipeline
- CI/CD automatizado
- Deployment y monitoreo

---

## 📊 Estado de las Historias de Usuario

### ✅ HECHO (DONE)

#### US-001: Setup del Proyecto
- **Descripción**: Como desarrollador, quiero inicializar el proyecto con la estructura básica
- **Criterios de Aceptación**:
  - [x] Estructura de directorios creada
  - [x] README.md documentado
  - [x] .gitignore configurado
- **Puntos de Historia**: 2
- **Asignado**: DevOps Team
- **Completado**: 30/07/2025

#### US-002: API REST Backend
- **Descripción**: Como usuario, quiero poder crear y ver posts a través de una API REST
- **Criterios de Aceptación**:
  - [x] Endpoint POST /api/posts para crear posts
  - [x] Endpoint GET /api/posts para listar posts
  - [x] Endpoint GET /api/posts/:id para obtener post específico
  - [x] Validación de contenido (máximo 280 caracteres)
  - [x] Endpoint GET /api/health para health check
- **Puntos de Historia**: 8
- **Asignado**: Backend Team
- **Completado**: 30/07/2025

#### US-003: Pruebas Automatizadas Backend
- **Descripción**: Como desarrollador, quiero pruebas automatizadas para garantizar calidad
- **Criterios de Aceptación**:
  - [x] Pruebas unitarias con Jest
  - [x] Pruebas de integración con Supertest
  - [x] Cobertura de al menos 80%
  - [x] 10 casos de prueba implementados
- **Puntos de Historia**: 5
- **Asignado**: QA Team
- **Completado**: 30/07/2025

#### US-004: Frontend Responsive
- **Descripción**: Como usuario, quiero una interfaz web intuitiva para usar el micro-blog
- **Criterios de Aceptación**:
  - [x] Formulario para crear posts
  - [x] Lista de posts ordenada cronológicamente
  - [x] Diseño responsive con Bootstrap
  - [x] Validación del lado cliente
  - [x] Estadísticas básicas
- **Puntos de Historia**: 8
- **Asignado**: Frontend Team
- **Completado**: 30/07/2025

#### US-005: Pipeline CI/CD
- **Descripción**: Como DevOps, quiero automatizar el build, test y deploy
- **Criterios de Aceptación**:
  - [x] GitHub Actions configurado
  - [x] Build automático en cada push
  - [x] Ejecución de pruebas automáticas
  - [x] Deploy automático a Heroku
  - [x] Verificación post-deploy
- **Puntos de Historia**: 8
- **Asignado**: DevOps Team
- **Completado**: 30/07/2025

#### US-006: Documentación Técnica
- **Descripción**: Como desarrollador, quiero documentación completa del proyecto
- **Criterios de Aceptación**:
  - [x] README.md con instrucciones claras
  - [x] Diagrama de arquitectura
  - [x] Plan de monitoreo documentado
  - [x] Instrucciones de desarrollo local
- **Puntos de Historia**: 3
- **Asignado**: Tech Writer
- **Completado**: 30/07/2025

### 🔄 EN PROGRESO (IN PROGRESS)

#### US-007: Deployment a Producción
- **Descripción**: Como usuario final, quiero acceder a la aplicación en línea
- **Criterios de Aceptación**:
  - [ ] Aplicación desplegada en Heroku
  - [ ] URL pública funcionando
  - [ ] Variables de entorno configuradas
  - [ ] Certificados SSL activos
- **Puntos de Historia**: 5
- **Asignado**: DevOps Team
- **Estado**: 50% - Configuración en proceso

#### US-008: Monitoreo y Alertas
- **Descripción**: Como administrador, quiero monitorear el estado de la aplicación
- **Criterios de Aceptación**:
  - [ ] UptimeRobot configurado
  - [ ] Alertas por email/SMS
  - [ ] Dashboard de métricas
  - [ ] Logs centralizados
- **Puntos de Historia**: 5
- **Asignado**: DevOps Team
- **Estado**: 25% - Investigación inicial

### 📋 PENDIENTE (TODO)

#### US-009: Release v1.0.0
- **Descripción**: Como PM, quiero publicar la primera versión estable
- **Criterios de Aceptación**:
  - [ ] Tag v1.0.0 en Git
  - [ ] Release notes publicadas
  - [ ] Changelog actualizado
  - [ ] Documentación final
- **Puntos de Historia**: 2
- **Asignado**: Product Manager
- **Prioridad**: Alta

#### US-010: Métricas de Negocio
- **Descripción**: Como administrador, quiero métricas de uso de la aplicación
- **Criterios de Aceptación**:
  - [ ] Google Analytics integrado
  - [ ] Métricas de posts creados
  - [ ] Usuarios activos por día
  - [ ] Dashboard de analytics
- **Puntos de Historia**: 3
- **Asignado**: DevOps Team
- **Prioridad**: Media

---

## 📈 Métricas del Sprint

- **Velocidad del Equipo**: 39 puntos completados
- **Burndown**: 85% del MVP completado
- **Calidad**: 0 bugs críticos, 10/10 tests pasando
- **Cobertura de Código**: 95%+

## 🎯 Objetivos del Próximo Sprint

1. **Completar deployment a producción**
2. **Configurar monitoreo completo**
3. **Publicar release v1.0.0**
4. **Documentar lecciones aprendidas**

---

## 🔗 Enlaces Útiles

- **Repositorio**: En configuración
- **CI/CD Pipeline**: GitHub Actions
- **Aplicación en Vivo**: Próximamente
- **Documentación**: [README.md](../README.md)
- **Plan de Monitoreo**: [monitoring-plan.md](./monitoring-plan.md)

---

*Última actualización: 30 de julio de 2025*
*Actualizado por: DevOps Team*
