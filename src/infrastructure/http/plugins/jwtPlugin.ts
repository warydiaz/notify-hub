import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import type { TokenGenerator } from '../../../application/auth/loginUseCase.js';
import type { TokenVerifier } from '../../../application/auth/refreshTokenUseCase.js';

declare module 'fastify' {
  interface FastifyInstance {
    tokenGenerator: TokenGenerator;
    tokenVerifier: TokenVerifier;
  }
}

async function jwtPlugin(fastify: FastifyInstance) {
  await fastify.register(import('@fastify/jwt'), {
    secret: fastify.config.JWT_SECRET,
  });

  const tokenGenerator: TokenGenerator = {
    generateAccessToken(payload) {
      return fastify.jwt.sign(payload, { expiresIn: fastify.config.JWT_EXPIRES_IN });
    },
    generateRefreshToken(payload) {
      return fastify.jwt.sign(payload, {
        key: fastify.config.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });
    },
  };

  const tokenVerifier: TokenVerifier = {
    verifyRefreshToken(token) {
      return fastify.jwt.verify<{ userId: string; email: string }>(token, {
        key: fastify.config.JWT_REFRESH_SECRET,
      });
    },
  };

  fastify.decorate('tokenGenerator', tokenGenerator);
  fastify.decorate('tokenVerifier', tokenVerifier);
}

export default fp(jwtPlugin, { name: 'jwt', dependencies: ['env'] });
