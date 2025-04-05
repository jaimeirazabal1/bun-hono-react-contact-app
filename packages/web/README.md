# Directorio Telefónico - Frontend

Este es el frontend de la aplicación de directorio telefónico, construido con React, TypeScript, Vite y Tailwind CSS.

## Características

- Interfaz de usuario moderna y responsiva
- Gestión completa de contactos (crear, leer, actualizar, eliminar)
- Integración con la API de backend
- Validación de formularios
- Animaciones y transiciones suaves
- Diseño optimizado para móviles y escritorio

## Requisitos

- Node.js 18.0.0 o superior
- npm 8.0.0 o superior

## Instalación

1. Clona el repositorio
2. Navega al directorio del frontend:
   ```bash
   cd packages/web
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Construcción

Para construir la aplicación para producción:

```bash
npm run build
```

Los archivos generados se encontrarán en el directorio `dist`.

## Estructura del proyecto

```
src/
  ├── components/     # Componentes de React
  ├── services/       # Servicios y API
  ├── App.tsx         # Componente principal
  ├── main.tsx        # Punto de entrada
  └── index.css       # Estilos globales
```

## Tecnologías utilizadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Query
- React Router
- Heroicons
