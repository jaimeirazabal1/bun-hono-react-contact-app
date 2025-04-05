import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { pool } from '../index';

const contactosRoutes = new Hono();

// Schema para validación
const contactoSchema = z.object({
  nombre: z.string().min(2).max(100),
  apellido: z.string().min(2).max(100),
  telefono: z.string().min(9).max(20),
  email: z.string().email().optional(),
  direccion: z.string().optional()
});

// Obtener todos los contactos
contactosRoutes.get('/contactos', async (c) => {
  try {
    const resultado = await pool.query('SELECT * FROM contactos ORDER BY id');
    return c.json({ success: true, data: resultado.rows });
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    return c.json({ success: false, error: 'Error al obtener contactos' }, 500);
  }
});

// Obtener un contacto por ID
contactosRoutes.get('/contactos/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const resultado = await pool.query('SELECT * FROM contactos WHERE id = $1', [id]);
    if (resultado.rows.length === 0) {
      return c.json({ success: false, error: 'Contacto no encontrado' }, 404);
    }
    return c.json({ success: true, data: resultado.rows[0] });
  } catch (error) {
    console.error(`Error al obtener contacto ${id}:`, error);
    return c.json({ success: false, error: 'Error al obtener contacto' }, 500);
  }
});

// Crear un nuevo contacto
contactosRoutes.post('/contactos', zValidator('json', contactoSchema), async (c) => {
  const contacto = c.req.valid('json');
  
  try {
    const { nombre, apellido, telefono, email, direccion } = contacto;
    const query = `
      INSERT INTO contactos (nombre, apellido, telefono, email, direccion)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const valores = [nombre, apellido, telefono, email, direccion];
    const resultado = await pool.query(query, valores);
    
    return c.json({ success: true, data: resultado.rows[0] }, 201);
  } catch (error) {
    console.error('Error al crear contacto:', error);
    return c.json({ success: false, error: 'Error al crear contacto' }, 500);
  }
});

// Actualizar un contacto existente
contactosRoutes.put('/contactos/:id', zValidator('json', contactoSchema), async (c) => {
  const id = c.req.param('id');
  const contacto = c.req.valid('json');
  
  try {
    const { nombre, apellido, telefono, email, direccion } = contacto;
    const query = `
      UPDATE contactos
      SET nombre = $1, apellido = $2, telefono = $3, email = $4, direccion = $5
      WHERE id = $6
      RETURNING *
    `;
    const valores = [nombre, apellido, telefono, email, direccion, id];
    const resultado = await pool.query(query, valores);
    
    if (resultado.rows.length === 0) {
      return c.json({ success: false, error: 'Contacto no encontrado' }, 404);
    }
    
    return c.json({ success: true, data: resultado.rows[0] });
  } catch (error) {
    console.error(`Error al actualizar contacto ${id}:`, error);
    return c.json({ success: false, error: 'Error al actualizar contacto' }, 500);
  }
});

// Eliminar un contacto
contactosRoutes.delete('/contactos/:id', async (c) => {
  const id = c.req.param('id');
  
  try {
    const resultado = await pool.query('DELETE FROM contactos WHERE id = $1 RETURNING *', [id]);
    
    if (resultado.rows.length === 0) {
      return c.json({ success: false, error: 'Contacto no encontrado' }, 404);
    }
    
    return c.json({ success: true, message: 'Contacto eliminado correctamente' });
  } catch (error) {
    console.error(`Error al eliminar contacto ${id}:`, error);
    return c.json({ success: false, error: 'Error al eliminar contacto' }, 500);
  }
});

export default contactosRoutes; 