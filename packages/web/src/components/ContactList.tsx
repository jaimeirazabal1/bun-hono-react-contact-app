import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { contactsApi, Contact } from '../services/api';

export default function ContactList() {
  const queryClient = useQueryClient();
  
  const { data: contacts = [], isLoading, error } = useQuery({
    queryKey: ['contactos'],
    queryFn: contactsApi.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: contactsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactos'] });
    },
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error al eliminar el contacto:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-xl">Error al cargar los contactos</div>
        <p className="text-gray-600 mt-2">Por favor, intenta nuevamente más tarde</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Contactos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos tus contactos con su información detallada.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/contactos/nuevo"
            className="btn-primary block text-center"
          >
            Agregar contacto
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.length > 0 ? contacts.map((contact) => (
          <div
            key={contact.id}
            className="card group animate-slide-in"
          >
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {contact.nombre} {contact.apellido}
                </h3>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/contactos/${contact.id}/editar`}
                  className="p-1 text-gray-400 hover:text-primary-600"
                >
                  <PencilIcon className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center text-sm">
                <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span>{contact.telefono}</span>
              </div>
              {contact.email && (
                <div className="flex items-center text-sm">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.direccion && (
                <div className="flex items-center text-sm">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{contact.direccion}</span>
                </div>
              )}
            </div>
          </div>
        )) : (
          <div className="text-center py-12">
            <div className="text-gray-600 text-xl">No hay contactos</div>
          </div>
        )}
      </div>
    </div>
  );
} 