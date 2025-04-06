-- Crear tabla de categorías si no existe
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion TEXT
);

-- Insertar categorías por defecto si no existen
INSERT INTO categorias (nombre, descripcion) VALUES 
  ('general', 'Categoría general por defecto'),
  ('familia', 'Contactos familiares'),
  ('amigos', 'Contactos de amigos'),
  ('trabajo', 'Contactos laborales'),
  ('servicios', 'Contactos de servicios'),
  ('otros', 'Otras categorías')
ON CONFLICT (nombre) DO NOTHING;

-- Añadir columna categoria_id a contactos si no existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'contactos' AND column_name = 'categoria_id'
    ) THEN
        -- Primero, añadir la columna
        ALTER TABLE contactos ADD COLUMN categoria_id INTEGER;
        
        -- Actualizar los contactos existentes con la categoría correspondiente
        UPDATE contactos c
        SET categoria_id = cat.id
        FROM categorias cat
        WHERE c.categoria = cat.nombre;
        
        -- Establecer el valor por defecto para los que no tengan categoría
        UPDATE contactos
        SET categoria_id = 1
        WHERE categoria_id IS NULL;
        
        -- Añadir la restricción de clave foránea
        ALTER TABLE contactos 
        ADD CONSTRAINT fk_contactos_categorias 
        FOREIGN KEY (categoria_id) 
        REFERENCES categorias(id);
        
        -- Establecer el valor por defecto para futuros registros
        ALTER TABLE contactos 
        ALTER COLUMN categoria_id 
        SET DEFAULT 1;
        
        -- Eliminar la columna antigua de categoría
        ALTER TABLE contactos 
        DROP COLUMN categoria;
    END IF;
END $$; 