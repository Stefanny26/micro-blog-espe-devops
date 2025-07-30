const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad y optimización
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Base de datos en memoria (para el MVP)
let posts = [
  {
    id: 1,
    content: "¡Bienvenidos al Micro-Blog Institucional de ESPE! 🎓",
    timestamp: new Date('2025-07-30T10:00:00Z'),
    author: "Sistema"
  },
  {
    id: 2,
    content: "Compartamos conocimiento y experiencias en nuestra comunidad universitaria 📚",
    timestamp: new Date('2025-07-30T10:05:00Z'),
    author: "Administrador"
  }
];

let nextId = 3;

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ========== RUTAS API ==========

// GET /api/health - Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// GET /api/posts - Obtener todos los posts
app.get('/api/posts', (req, res) => {
  try {
    // Ordenar por timestamp descendente (más reciente primero)
    const sortedPosts = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json({
      success: true,
      data: sortedPosts,
      count: sortedPosts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/posts - Crear un nuevo post
app.post('/api/posts', (req, res) => {
  try {
    const { content, author } = req.body;

    // Validaciones
    if (!content || typeof content !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'El contenido es requerido y debe ser un texto'
      });
    }

    if (content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'El contenido no puede estar vacío'
      });
    }

    if (content.length > 280) {
      return res.status(400).json({
        success: false,
        error: 'El contenido no puede exceder 280 caracteres'
      });
    }

    // Crear nuevo post
    const newPost = {
      id: nextId++,
      content: content.trim(),
      author: author?.trim() || 'Anónimo',
      timestamp: new Date()
    };

    posts.push(newPost);

    res.status(201).json({
      success: true,
      data: newPost,
      message: 'Post creado exitosamente'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/posts/:id - Obtener un post específico
app.get('/api/posts/:id', (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post no encontrado'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Ruta para servir el frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📱 Aplicación disponible en: http://localhost:${PORT}`);
  console.log(`🔍 API Health Check: http://localhost:${PORT}/api/health`);
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

module.exports = app;
