import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { contactsApi } from '../services/api'
import { Contact, Categoria } from '../types'

interface ContactFormData {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion: string;
  categoria_id: number;
}

const ContactForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: '',
    categoria_id: 1,
  })

  const { data: categorias } = useQuery({
    queryKey: ['categorias'],
    queryFn: async () => {
      const response = await contactsApi.getCategorias()
      return response.data as Categoria[]
    },
  })

  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        try {
          const response = await contactsApi.getById(id)
          const contact = response.data as Contact
          setFormData({
            nombre: contact.nombre,
            apellido: contact.apellido,
            telefono: contact.telefono,
            email: contact.email || '',
            direccion: contact.direccion || '',
            categoria_id: contact.categoria_id,
          })
        } catch (error) {
          console.error('Error al cargar el contacto:', error)
        }
      }
      fetchContact()
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (id) {
        await contactsApi.update(id, formData)
      } else {
        await contactsApi.create(formData)
      }
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      navigate('/')
    } catch (error) {
      console.error('Error al guardar el contacto:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'categoria_id' ? parseInt(value) : value,
    }))
  }

  return (
    <div className="animate-fade-in">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">
            {id ? 'Editar Contacto' : 'Nuevo Contacto'}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {id
              ? 'Modifica los datos del contacto'
              : 'Completa los datos para crear un nuevo contacto'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="apellido"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              id="apellido"
              required
              value={formData.apellido}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              id="telefono"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="direccion"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              id="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="categoria_id"
              className="block text-sm font-medium text-gray-700"
            >
              Categoría
            </label>
            <select
              id="categoria_id"
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              {categorias?.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/contactos')}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            {id ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  )
} 

export default ContactForm;