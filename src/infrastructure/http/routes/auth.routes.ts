import type { FastifyInstance } from 'fastify';
import { RegisterUseCase } from '../../../application/auth/registerUseCase.js';
import { LoginUseCase } from '../../../application/auth/loginUseCase.js';
import { RefreshTokenUseCase } from '../../../application/auth/refreshTokenUseCase.js';
import { LogoutUseCase } from '../../../application/auth/logoutUseCase.js';
import { MongoUserRepository } from '../../persistence/user/mongoUserRepository.js';
import { MongoRefreshTokenRepository } from '../../persistence/auth/mongoRefreshTokenRepository.js';

export async function authRoutes(fastify: FastifyInstance) {
  const userRepo = new MongoUserRepository();
  const refreshTokenRepo = new MongoRefreshTokenRepository();

  const registerUseCase = new RegisterUseCase(userRepo);
  const loginUseCase = new LoginUseCase(userRepo, refreshTokenRepo, fastify.tokenGenerator);
  const refreshTokenUseCase = new RefreshTokenUseCase(
    refreshTokenRepo,
    fastify.tokenGenerator,
    fastify.tokenGenerator,
  );
  const logoutUseCase = new LogoutUseCase(refreshTokenRepo);

  fastify.post('/auth/register', async (request, reply) => {
    const { email, password, name } = request.body as {
      email: string;
      password: string;
      name: string;
    };
    const user = await registerUseCase.execute({ email, password, name });
    return reply.status(201).send(user);
  });

  fastify.post('/auth/login', async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const result = await loginUseCase.execute({ email, password });
    return reply.send(result);
  });

  fastify.post('/auth/refresh', async (request, reply) => {
    const { token } = request.body as { token: string };
    const result = await refreshTokenUseCase.execute({ token });
    return reply.send(result);
  });

  fastify.post('/auth/logout', async (request, reply) => {
    const { token } = request.body as { token: string };
    await logoutUseCase.execute(token);
    return reply.status(204).send();
  });
}
