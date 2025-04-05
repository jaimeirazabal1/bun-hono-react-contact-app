FROM oven/bun:1.0

WORKDIR /app

# Copiar todo el código primero
COPY . .

# Instalar dependencias sin generar lockfile
RUN bun install --no-save --production

EXPOSE 3000

CMD ["bun", "run", "start"] 