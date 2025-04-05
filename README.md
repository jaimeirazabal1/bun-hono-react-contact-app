# 📞 API de Directorio Telefónico con Bun y Hono

Una API REST ultra rápida para gestionar contactos telefónicos, construida con Bun, Hono, PostgreSQL y Docker.

## 🚀 Características

- **Velocidad sorprendente**: Bun + Hono = Rendimiento inigualable 🔥
- **API RESTful completa**: Operaciones CRUD para gestionar contactos
- **Base de datos PostgreSQL**: Almacenamiento robusto y confiable
- **Docker Compose**: Configuración rápida y sencilla
- **Documentación Swagger**: API documentada y fácil de probar
- **Validación con Zod**: Datos siempre validados y seguros

## 🛠️ Requisitos previos

- Docker y Docker Compose
- Bun (opcional para desarrollo local)

## 🏃‍♂️ Inicio rápido

1. **Clonar el repositorio**

```bash
git clone https://github.com/jaimeirazabal1/bun-hono-react-contact-app
cd bun-hono-react-contact-app
```

2. **Iniciar los servicios con Docker Compose**

```bash
docker-compose up -d
```

3. **Acceder a la API**

La API estará disponible en: http://localhost:3001

Documentación Swagger: http://localhost:3001/docs

## 📚 Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/contactos | Obtener todos los contactos |
| GET | /api/contactos/:id | Obtener un contacto por ID |
| POST | /api/contactos | Crear un nuevo contacto |
| PUT | /api/contactos/:id | Actualizar un contacto existente |
| DELETE | /api/contactos/:id | Eliminar un contacto |

## 🧑‍💻 Desarrollo local

Si prefieres desarrollar sin Docker:

1. **Instalar dependencias**

```bash
bun install
```

2. **Iniciar servidor de desarrollo**

```bash
bun run dev
```

## 📋 Estructura del proyecto

```
├── src/
│   ├── index.ts              # Punto de entrada de la aplicación
│   ├── routes/               # Rutas de la API
│   │   └── contactos.ts      # Controladores de contactos
│   └── swagger.json          # Documentación de la API
├── init.sql                  # Script de inicialización de la base de datos
├── docker-compose.yml        # Configuración de Docker Compose
├── Dockerfile                # Configuración de Docker para la API
└── package.json              # Dependencias y scripts
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de abrir issues o enviar pull requests. 

# Directorio Telefónico

Aplicación de directorio telefónico desarrollada con Bun, Hono, React y PostgreSQL.

## Requisitos Previos

- Node.js (v18 o superior)
- Bun (v1.0 o superior)
- Docker y Docker Compose
- PostgreSQL (opcional, se puede usar el contenedor Docker)

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_REPOSITORIO]
```

2. Instalar dependencias del backend:
```bash
cd packages/api
npm install
```

3. Instalar dependencias del frontend:
```bash
cd ../web
npm install
```

4. Volver a la raíz del proyecto:
```bash
cd ../..
```

## Configuración

1. Crear archivo `.env` en la raíz del proyecto:
```bash
cp .env.example .env
```

2. Ajustar las variables de entorno según sea necesario.

## Ejecución en Desarrollo

1. Iniciar la base de datos PostgreSQL con Docker:
```bash
docker-compose up -d postgres
```

2. Iniciar la aplicación en modo desarrollo:
```bash
npm start
```
Esto iniciará tanto el backend como el frontend en modo desarrollo.

## Ejecución en Producción

Para ejecutar la aplicación en producción:

```bash
docker-compose up -d
```

## Estructura del Proyecto

```
.
├── packages/
│   ├── api/          # Backend con Bun y Hono
│   └── web/          # Frontend con React
├── docker-compose.yml
└── README.md
```

## Licencia

[MIT](LICENSE) 