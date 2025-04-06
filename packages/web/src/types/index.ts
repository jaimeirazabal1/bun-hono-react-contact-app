export interface Contact {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string;
  direccion?: string;
  categoria_id: number;
  categoria_nombre?: string;
  categoria_descripcion?: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
} 