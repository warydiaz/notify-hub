import type { FastifyInstance } from 'fastify';
import { RegisterUseCase } from '../../../application/auth/registerUseCase.js';
import { LoginUseCase } from '../../../application/auth/loginUseCase.js';
import { RefreshTokenUseCase } from '../../../application/auth/refreshTokenUseCase.js';
import { LogoutUseCase } from '../../../application/auth/logoutUseCase.js';
import { MongoUserRepository } from '../../persistence/user/mongoUserRepository.js';
import { MongoRefreshTokenRepository } from '../../persistence/auth/mongoRefreshTokenRepository.js';
import { BcryptPasswordHasher } from '../../auth/bcryptPasswordHasher.js';
import {
  registerSchema,
  loginSchema,
  refreshSchema,
  logoutSchema,
} from '../schemas/auth.schemas.js';
import { RegisterUserDto } from './dto/auth/register-user.dto.js';
import { validateBody } from '../middlewares/validateDto.js';
import { LoginUserDto } from './dto/auth/login.dto.js';
import { TokenDto } from './dto/auth/token.dto.js';

export async function authRoutes(fastify: FastifyInstance) {
  const userRepo = new MongoUserRepository();
  const refreshTokenRepo = new MongoRefreshTokenRepository();
  const passwordHasher = new BcryptPasswordHasher(fastify.config.SALT_ROUNDS);

  const registerUseCase = new RegisterUseCase(userRepo, passwordHasher);
  const loginUseCase = new LoginUseCase(
    userRepo,
    refreshTokenRepo,
    fastify.tokenGenerator,
    passwordHasher,
  );
  const refreshTokenUseCase = new RefreshTokenUseCase(
    refreshTokenRepo,
    fastify.tokenGenerator,
    fastify.tokenVerifier,
  );
  const logoutUseCase = new LogoutUseCase(refreshTokenRepo);

  fastify.post(
    '/auth/register',
    { config: { public: true }, schema: registerSchema, preHandler: validateBody(RegisterUserDto) },
    async (request, reply) => {
      const newUser = request.body as RegisterUserDto;
      const user = await registerUseCase.execute(newUser);
      return reply.status(201).send(user);
    },
  );

  fastify.post(
    '/auth/login',
    { config: { public: true }, schema: loginSchema, preHandler: validateBody(LoginUserDto) },
    async (request, reply) => {
      const dto = request.body as LoginUserDto;
      const result = await loginUseCase.execute(dto);
      return reply.send(result);
    },
  );

  fastify.post(
    '/auth/refresh',
    { config: { public: true }, schema: refreshSchema, preHandler: validateBody(TokenDto) },
    async (request, reply) => {
      const tokenDto = request.body as TokenDto;
      const result = await refreshTokenUseCase.execute(tokenDto);
      return reply.send(result);
    },
  );

  fastify.post(
    '/auth/logout',
    { schema: logoutSchema, preHandler: validateBody(TokenDto) },
    async (request, reply) => {
      const tokenDto = request.body as TokenDto;
      await logoutUseCase.execute(tokenDto.token);
      return reply.status(204).send();
    },
  );
}
