-- Añadir columna categoría a la tabla contactos si no existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'contactos' AND column_name = 'categoria'
    ) THEN
        ALTER TABLE contactos ADD COLUMN categoria VARCHAR(50) DEFAULT 'general';
    END IF;
END $$; 