import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyRequest {
    userId: string;
    email: string;
  }
}

async function authMiddleware(fastify: FastifyInstance) {
  fastify.decorateRequest('userId', '');
  fastify.decorateRequest('email', '');

  fastify.addHook('preHandler', async (request, reply) => {
    const routeConfig = request.routeOptions.config as { public?: boolean };
    if (routeConfig.public) return;

    try {
      const payload = await request.jwtVerify<{ userId: string; email: string }>();
      request.userId = payload.userId;
      request.email = payload.email;
    } catch {
      reply.status(401).send({ message: 'No autorizado' });
    }
  });
}

export default fp(authMiddleware, { name: 'authMiddleware', dependencies: ['jwt'] });
