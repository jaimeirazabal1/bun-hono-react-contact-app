import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export interface Contact {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string;
  direccion?: string;
}

export interface ContactInput {
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string;
  direccion?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const contactsApi = {
  getAll: async (): Promise<Contact[]> => {
    const response = await fetch(`${API_URL}/contactos`);
    if (!response.ok) {
      throw new Error('Error al obtener los contactos');
    }
    const result = await response.json();
    return result ? result.data : [];
  },

  getById: async (id: number): Promise<Contact> => {
    const response = await fetch(`${API_URL}/contactos/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el contacto');
    }
    const result = await response.json();
    return result ? result.data : null;
    // return response.json();
  },

  create: async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
    const response = await fetch(`${API_URL}/contactos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Error al crear el contacto');
    }
    return response.json();
  },

  update: async (id: number, contact: Partial<Contact>): Promise<Contact> => {
    const response = await fetch(`${API_URL}/contactos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el contacto');
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/contactos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el contacto');
    }
  },
}; 