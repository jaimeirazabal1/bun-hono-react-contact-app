-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar categorías predefinidas
INSERT INTO categorias (nombre, descripcion) VALUES
('General', 'Contactos sin categoría específica'),
('Familia', 'Miembros de la familia'),
('Amigos', 'Amigos y conocidos'),
('Trabajo', 'Contactos relacionados con el trabajo'),
('Servicios', 'Proveedores de servicios'),
('Otros', 'Otras categorías');

-- Crear tabla de contactos
CREATE TABLE IF NOT EXISTS contactos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  direccion TEXT,
  categoria_id INTEGER REFERENCES categorias(id) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo con categorías
INSERT INTO contactos (nombre, apellido, telefono, email, direccion, categoria_id) VALUES
('Juan', 'Pérez', '+34612345678', 'juan.perez@ejemplo.com', 'Calle Mayor 123, Madrid', 1),
('María', 'López', '+34623456789', 'maria.lopez@ejemplo.com', 'Avenida Principal 45, Barcelona', 2),
('Carlos', 'González', '+34634567890', 'carlos.gonzalez@ejemplo.com', 'Plaza Central 7, Valencia', 3),
('Ana', 'Martínez', '+34645678901', 'ana.martinez@ejemplo.com', 'Calle Nueva 56, Sevilla', 4),
('Pedro', 'Rodríguez', '+34656789012', 'pedro.rodriguez@ejemplo.com', 'Avenida Norte 89, Bilbao', 5),
('Laura', 'Sánchez', '+34667890123', 'laura.sanchez@ejemplo.com', 'Calle Sur 23, Málaga', 2),
('Miguel', 'Fernández', '+34678901234', 'miguel.fernandez@ejemplo.com', 'Plaza del Sol 4, Zaragoza', 3),
('Sofía', 'Díaz', '+34689012345', 'sofia.diaz@ejemplo.com', 'Avenida Este 12, Murcia', 4),
('David', 'Torres', '+34690123456', 'david.torres@ejemplo.com', 'Calle Oeste 67, Palma', 5),
('Elena', 'Ruiz', '+34601234567', 'elena.ruiz@ejemplo.com', 'Plaza Mayor 8, Las Palmas', 1); 