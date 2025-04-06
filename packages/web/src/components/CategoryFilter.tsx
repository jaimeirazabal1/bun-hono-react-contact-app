import { useQuery } from '@tanstack/react-query';
import { contactsApi } from '../services/api';
import { Categoria } from '../types';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const { data: categorias, isLoading } = useQuery({
    queryKey: ['categorias'],
    queryFn: async () => {
      const response = await contactsApi.getCategorias();
      return response.data as Categoria[];
    },
    staleTime: 60000,
  });

  return (
    <div className="mb-4">
      <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
        Filtrar por categoría
      </label>
      <select
        id="categoria"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="todas">Todas las categorías</option>
        {isLoading ? (
          <option>Cargando categorías...</option>
        ) : (
          categorias?.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))
        )}
      </select>
    </div>
  );
}; 

export default CategoryFilter;