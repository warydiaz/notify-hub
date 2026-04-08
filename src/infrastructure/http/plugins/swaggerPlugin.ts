import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';

async function swaggerPlugin(fastify: FastifyInstance) {
  await fastify.register(import('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'notify-hub API',
        description: 'Sistema de notificaciones y alertas con Pub/Sub',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  });

  await fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
    },
  });
}

export default fp(swaggerPlugin, { name: 'swagger', dependencies: ['env'] });
