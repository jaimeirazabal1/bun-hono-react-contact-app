-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion TEXT
);

-- Insertar categorías por defecto
INSERT INTO categorias (nombre, descripcion) VALUES 
  ('general', 'Categoría general por defecto'),
  ('familia', 'Contactos familiares'),
  ('amigos', 'Contactos de amigos'),
  ('trabajo', 'Contactos laborales'),
  ('servicios', 'Contactos de servicios'),
  ('otros', 'Otras categorías')
ON CONFLICT (nombre) DO NOTHING;

-- Crear tabla de contactos con clave foránea a categorías
CREATE TABLE IF NOT EXISTS contactos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  direccion TEXT,
  categoria_id INTEGER REFERENCES categorias(id) DEFAULT 1
); 