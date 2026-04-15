import type { UserRepository } from '../../domain/user/userRepository.js';
import type { RefreshTokenRepository } from '../../domain/auth/refreshTokenRepository.js';
import type { PasswordHasher } from '../../domain/auth/passwordHasher.js';
import type { User } from '../../domain/user/user.js';
import { AuthError } from './error/index.js';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}

export interface TokenGenerator {
  generateAccessToken(payload: { userId: string; email: string }): string;
  generateRefreshToken(payload: { userId: string; email: string }): string;
}

export class LoginUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly refreshTokenRepo: RefreshTokenRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user) {
      throw AuthError.InvalidCredentials();
    }

    const validPassword = await this.passwordHasher.compare(input.password, user.password);
    if (!validPassword) {
      throw AuthError.InvalidCredentials();
    }

    const accessToken = this.tokenGenerator.generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = this.tokenGenerator.generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    await this.refreshTokenRepo.save(user.id, refreshToken);

    const { password: _, ...userWithoutPassword } = user;
    return { accessToken, refreshToken, user: userWithoutPassword };
  }
}
