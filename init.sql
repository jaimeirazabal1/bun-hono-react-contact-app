-- Crear tabla de contactos
CREATE TABLE IF NOT EXISTS contactos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  direccion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO contactos (nombre, apellido, telefono, email, direccion) VALUES
('Juan', 'Pérez', '+34612345678', 'juan.perez@ejemplo.com', 'Calle Mayor 123, Madrid'),
('María', 'López', '+34623456789', 'maria.lopez@ejemplo.com', 'Avenida Principal 45, Barcelona'),
('Carlos', 'González', '+34634567890', 'carlos.gonzalez@ejemplo.com', 'Plaza Central 7, Valencia'),
('Ana', 'Martínez', '+34645678901', 'ana.martinez@ejemplo.com', 'Calle Nueva 56, Sevilla'),
('Pedro', 'Rodríguez', '+34656789012', 'pedro.rodriguez@ejemplo.com', 'Avenida Norte 89, Bilbao'),
('Laura', 'Sánchez', '+34667890123', 'laura.sanchez@ejemplo.com', 'Calle Sur 23, Málaga'),
('Miguel', 'Fernández', '+34678901234', 'miguel.fernandez@ejemplo.com', 'Plaza del Sol 4, Zaragoza'),
('Sofía', 'Díaz', '+34689012345', 'sofia.diaz@ejemplo.com', 'Avenida Este 12, Murcia'),
('David', 'Torres', '+34690123456', 'david.torres@ejemplo.com', 'Calle Oeste 67, Palma'),
('Elena', 'Ruiz', '+34601234567', 'elena.ruiz@ejemplo.com', 'Plaza Mayor 8, Las Palmas'); 