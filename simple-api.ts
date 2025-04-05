import { Hono } from 'hono';

// Inicializar la app
const app = new Hono();

// Rutas básicas
app.get('/', (c) => {
  return c.json({ message: '¡Bienvenido a la API simplificada!' });
});

app.get('/test', (c) => {
  return c.text('Esta es una ruta de prueba');
});

// Iniciar el servidor
const port = 3002;
console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch
}; 