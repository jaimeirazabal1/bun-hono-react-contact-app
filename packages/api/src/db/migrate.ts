import { pool } from '../index';
import { readFileSync } from 'fs';
import { join } from 'path';

async function runMigrations() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Ejecutar migraciones en orden
    const migrations = [
      '01_create_tables.sql',
      '02_migrate_categorias.sql'
    ];

    for (const migration of migrations) {
      const filePath = join(__dirname, migration);
      const sql = readFileSync(filePath, 'utf8');
      await client.query(sql);
      console.log(`Migración ${migration} ejecutada correctamente`);
    }

    await client.query('COMMIT');
    console.log('Todas las migraciones se ejecutaron correctamente');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al ejecutar migraciones:', error);
    throw error;
  } finally {
    client.release();
  }
}

runMigrations().catch(console.error); 