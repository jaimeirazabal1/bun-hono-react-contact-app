import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { swaggerUI } from '@hono/swagger-ui';
import { Pool } from 'pg';
import contactosRoutes from './routes/contactos';
import swaggerDoc from './swagger.json';

// Configuración de la base de datos
const pool = new Pool({
  connectionString: 'postgres://admin:password@localhost:5432/directorio'
});

// Verificar conexión a la base de datos
pool.on('error', (err) => {
  console.error('Error inesperado en el pool de PostgreSQL', err);
});

// Inicializar la app
const app = new Hono();

// Middlewares
app.use('*', logger());
app.use('*', cors());

// Middleware para manejo de errores global
app.use('*', async (c, next) => {
  try {
    await next();
  } catch (error) {
    console.error('Error en la aplicación:', error);
    return c.json({ success: false, error: 'Error interno del servidor' }, 500);
  }
});

// Swagger
app.get('/docs', swaggerUI({ url: '/swagger.json' }));
app.get('/swagger.json', (c) => {
  return c.json(swaggerDoc);
});

// Rutas
app.get('/', async (c) => {
  try {
    // Verificar conexión a la base de datos
    await pool.query('SELECT 1');
    return c.json({ message: '¡Bienvenido a la API de Directorio Telefónico!' });
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    return c.json({ 
      message: '¡Bienvenido a la API de Directorio Telefónico!',
      dbStatus: 'Error de conexión a la base de datos. Verifica la configuración.'
    });
  }
});

// Montar las rutas de contactos
app.route('/api', contactosRoutes);

// Exportar el pool de conexión
export { pool };

// Iniciar el servidor
const port = 3001;
console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch
}; 