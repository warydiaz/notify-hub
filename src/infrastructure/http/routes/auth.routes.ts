import type { FastifyInstance } from 'fastify';
import { RegisterUseCase } from '../../../application/auth/registerUseCase.js';
import { LoginUseCase } from '../../../application/auth/loginUseCase.js';
import { RefreshTokenUseCase } from '../../../application/auth/refreshTokenUseCase.js';
import { LogoutUseCase } from '../../../application/auth/logoutUseCase.js';
import { MongoUserRepository } from '../../persistence/user/mongoUserRepository.js';
import { MongoRefreshTokenRepository } from '../../persistence/auth/mongoRefreshTokenRepository.js';
import { BcryptPasswordHasher } from '../../auth/bcryptPasswordHasher.js';
import { registerSchema, loginSchema, refreshSchema, logoutSchema } from '../schemas/auth.schemas.js'

export async function authRoutes(fastify: FastifyInstance) {
  const userRepo = new MongoUserRepository();
  const refreshTokenRepo = new MongoRefreshTokenRepository();
  const passwordHasher = new BcryptPasswordHasher();

  const registerUseCase = new RegisterUseCase(userRepo, passwordHasher);
  const loginUseCase = new LoginUseCase(userRepo, refreshTokenRepo, fastify.tokenGenerator, passwordHasher);
  const refreshTokenUseCase = new RefreshTokenUseCase(
    refreshTokenRepo,
    fastify.tokenGenerator,
    fastify.tokenVerifier,
  );
  const logoutUseCase = new LogoutUseCase(refreshTokenRepo);

  fastify.post('/auth/register', { config: { public: true }, schema: registerSchema }, async (request, reply) => {
    const { email, password, name } = request.body as {
      email: string;
      password: string;
      name: string;
    };
    const user = await registerUseCase.execute({ email, password, name });
    return reply.status(201).send(user);
  });

  fastify.post('/auth/login', { config: { public: true }, schema: loginSchema }, async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const result = await loginUseCase.execute({ email, password });
    return reply.send(result);
  });

  fastify.post('/auth/refresh', { config: { public: true }, schema: refreshSchema }, async (request, reply) => {
    const { token } = request.body as { token: string };
    const result = await refreshTokenUseCase.execute({ token });
    return reply.send(result);
  });

  fastify.post('/auth/logout', { schema: logoutSchema }, async (request, reply) => {
    const { token } = request.body as { token: string };
    await logoutUseCase.execute(token);
    return reply.status(204).send();
  });
}
