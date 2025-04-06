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
  direccion: z.string().optional(),
  categoria_id: z.number().int().positive().optional().default(1)
});

// Obtener todas las categorías disponibles
contactosRoutes.get('/categorias', async (c) => {
  try {
    const resultado = await pool.query('SELECT id, nombre, descripcion FROM categorias ORDER BY nombre');
    return c.json({ success: true, data: resultado.rows });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return c.json({ success: false, error: 'Error al obtener categorías' }, 500);
  }
});

// Obtener todos los contactos con búsqueda y filtrado opcional
contactosRoutes.get('/', async (c) => {
  const search = c.req.query('search') || '';
  const categoria_id = c.req.query('categoria_id') || '';
  
  try {
    let query = `
      SELECT c.*, cat.nombre as categoria_nombre, cat.descripcion as categoria_descripcion
      FROM contactos c
      JOIN categorias cat ON c.categoria_id = cat.id
    `;
    let conditions: string[] = [];
    let values: (string | number)[] = [];
    let paramIndex = 1;
    
    if (search) {
      conditions.push(`(c.nombre ILIKE $${paramIndex} OR c.apellido ILIKE $${paramIndex} OR c.telefono ILIKE $${paramIndex} OR c.email ILIKE $${paramIndex})`);
      values.push(`%${search}%`);
      paramIndex++;
    }
    
    if (categoria_id) {
      conditions.push(`c.categoria_id = $${paramIndex}`);
      values.push(parseInt(categoria_id));
      paramIndex++;
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY c.id';
    const resultado = await pool.query(query, values);
    return c.json({ success: true, data: resultado.rows });
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    return c.json({ success: false, error: 'Error al obtener contactos' }, 500);
  }
});

// Obtener un contacto por ID
contactosRoutes.get('/:id', async (c) => {
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
contactosRoutes.post('/', zValidator('json', contactoSchema), async (c) => {
  const data = c.req.valid('json');
  
  try {
    const resultado = await pool.query(
      `INSERT INTO contactos (nombre, apellido, telefono, email, direccion, categoria_id) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [data.nombre, data.apellido, data.telefono, data.email, data.direccion, data.categoria_id]
    );
    return c.json({ success: true, data: resultado.rows[0] }, 201);
  } catch (error) {
    console.error('Error al crear contacto:', error);
    return c.json({ success: false, error: 'Error al crear contacto' }, 500);
  }
});

// Actualizar un contacto existente
contactosRoutes.put('/:id', zValidator('json', contactoSchema), async (c) => {
  const id = c.req.param('id');
  const data = c.req.valid('json');
  
  try {
    const resultado = await pool.query(
      `UPDATE contactos 
       SET nombre = $1, apellido = $2, telefono = $3, email = $4, direccion = $5, categoria_id = $6 
       WHERE id = $7 
       RETURNING *`,
      [data.nombre, data.apellido, data.telefono, data.email, data.direccion, data.categoria_id, id]
    );
    
    if (resultado.rowCount === 0) {
      return c.json({ success: false, error: 'Contacto no encontrado' }, 404);
    }
    
    return c.json({ success: true, data: resultado.rows[0] });
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
    return c.json({ success: false, error: 'Error al actualizar contacto' }, 500);
  }
});

// Eliminar un contacto
contactosRoutes.delete('/:id', async (c) => {
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