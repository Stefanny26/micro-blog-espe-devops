const request = require('supertest');
const app = require('../server');

describe('Micro-Blog API Tests', () => {
  
  describe('Health Check', () => {
    test('GET /api/health should return status OK', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(response.body.status).toBe('OK');
      expect(response.body.version).toBe('1.0.0');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('Posts API', () => {
    
    test('GET /api/posts should return array of posts', async () => {
      const response = await request(app)
        .get('/api/posts')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeGreaterThanOrEqual(0);
    });

    test('POST /api/posts should create a new post with valid data', async () => {
      const newPost = {
        content: 'Este es un mensaje de prueba para el sistema de testing',
        author: 'Test User'
      };

      const response = await request(app)
        .post('/api/posts')
        .send(newPost)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.content).toBe(newPost.content);
      expect(response.body.data.author).toBe(newPost.author);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.timestamp).toBeDefined();
    });

    test('POST /api/posts should reject empty content', async () => {
      const invalidPost = {
        content: '   ', // Espacios en blanco
        author: 'Test User'
      };

      const response = await request(app)
        .post('/api/posts')
        .send(invalidPost)
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('El contenido no puede estar vacío');
    });

    test('POST /api/posts should reject content over 280 characters', async () => {
      const longContent = 'a'.repeat(281); // 281 caracteres
      const invalidPost = {
        content: longContent,
        author: 'Test User'
      };

      const response = await request(app)
        .post('/api/posts')
        .send(invalidPost)
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('280 caracteres');
    });

    test('POST /api/posts should handle missing author (default to Anónimo)', async () => {
      const postWithoutAuthor = {
        content: 'Mensaje sin autor especificado'
      };

      const response = await request(app)
        .post('/api/posts')
        .send(postWithoutAuthor)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.author).toBe('Anónimo');
    });

    test('GET /api/posts should return posts ordered by timestamp (newest first)', async () => {
      // Crear dos posts con delay para asegurar diferentes timestamps
      const post1 = { content: 'Primer post', author: 'Usuario1' };
      const post2 = { content: 'Segundo post', author: 'Usuario2' };

      await request(app).post('/api/posts').send(post1);
      
      // Pequeño delay para garantizar timestamp diferente
      await new Promise(resolve => setTimeout(resolve, 10));
      
      await request(app).post('/api/posts').send(post2);

      const response = await request(app)
        .get('/api/posts')
        .expect(200);
      
      expect(response.body.data.length).toBeGreaterThanOrEqual(2);
      
      // Verificar que estén ordenados por timestamp descendente
      const posts = response.body.data;
      for (let i = 0; i < posts.length - 1; i++) {
        const currentTime = new Date(posts[i].timestamp);
        const nextTime = new Date(posts[i + 1].timestamp);
        expect(currentTime >= nextTime).toBe(true);
      }
    });

    test('GET /api/posts/:id should return specific post', async () => {
      // Crear un post primero
      const newPost = {
        content: 'Post para testing de búsqueda por ID',
        author: 'Test User'
      };

      const createResponse = await request(app)
        .post('/api/posts')
        .send(newPost);
      
      const postId = createResponse.body.data.id;

      const response = await request(app)
        .get(`/api/posts/${postId}`)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(postId);
      expect(response.body.data.content).toBe(newPost.content);
    });

    test('GET /api/posts/:id should return 404 for non-existent post', async () => {
      const response = await request(app)
        .get('/api/posts/99999')
        .expect(404);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('no encontrado');
    });
  });

  describe('Error Handling', () => {
    
    test('Should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('no encontrada');
    });
  });
});
