import axios from 'axios';
import { Contact, Categoria } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export interface ContactInput {
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string;
  direccion?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const contactsApi = {
  getAll: async (search?: string, categoria_id?: string) => {
    let url = `${API_URL}/contactos`;
    const params = new URLSearchParams();
    
    if (search) {
      params.append('search', search);
    }
    
    if (categoria_id && categoria_id !== 'todas') {
      params.append('categoria_id', categoria_id);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener contactos');
    }
    const data = await response.json();
    return data.data || [];
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/contactos/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el contacto');
    }
    return response.json();
  },

  create: async (contact: Omit<Contact, 'id'>) => {
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

  update: async (id: string, contact: Omit<Contact, 'id'>) => {
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

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/contactos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el contacto');
    }
    return response.json();
  },

  getCategorias: async () => {
    const response = await fetch(`${API_URL}/contactos/categorias`);
    if (!response.ok) {
      throw new Error('Error al obtener categorías');
    }
    return response.json();
  }
}; 