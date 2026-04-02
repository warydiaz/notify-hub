import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';

const schema = {
  type: 'object',
  required: ['PORT', 'MONGODB_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET', 'JWT_EXPIRES_IN'],
  properties: {
    PORT: { type: 'number' },
    MONGODB_URI: { type: 'string' },
    JWT_SECRET: { type: 'string' },
    JWT_REFRESH_SECRET: { type: 'string' },
    JWT_EXPIRES_IN: { type: 'string' },
    SMTP_HOST: { type: 'string' },
    SMTP_PORT: { type: 'number' },
    SMTP_USER: { type: 'string' },
    SMTP_PASS: { type: 'string' },
    EMAIL_FROM: { type: 'string' },
  },
};

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number;
      MONGODB_URI: string;
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_EXPIRES_IN: string;
      SMTP_HOST?: string;
      SMTP_PORT?: number;
      SMTP_USER?: string;
      SMTP_PASS?: string;
      EMAIL_FROM?: string;
    };
  }
}

async function envPlugin(fastify: FastifyInstance) {
  await fastify.register(import('@fastify/env'), {
    schema,
    dotenv: true,
  });
}

export default fp(envPlugin, { name: 'env' });
