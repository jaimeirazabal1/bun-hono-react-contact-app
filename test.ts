console.log("¡Hola mundo desde Bun!");

const server = Bun.serve({
  port: 3001,
  fetch(req) {
    return new Response("¡Hola desde un servidor básico de Bun!", {
      headers: { "Content-Type": "text/plain" }
    });
  },
});

console.log(`Servidor ejecutándose en http://localhost:${server.port}`); 