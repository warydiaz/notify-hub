import type { FastifyInstance } from 'fastify';
import type { WebSocketManager } from '../../websocket/webSocketManager.js';

export function createWsRoutes(wsManager: WebSocketManager) {
  return async function wsRoutes(fastify: FastifyInstance) {
    await fastify.register(import('@fastify/websocket'));

    fastify.get('/ws', { websocket: true, config: { public: true } }, (socket, request) => {
      const token = request.query as { token?: string };

      if (!token.token) {
        socket.close();
        return;
      }

      try {
        const payload = fastify.jwt.verify<{ userId: string }>(token.token);
        wsManager.add(payload.userId, socket);
        fastify.log.info(`[WS] Usuario ${payload.userId} conectado`);
      } catch {
        socket.close();
      }
    });
  };
}
