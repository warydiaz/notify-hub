import type { RefreshTokenRepository } from '../../domain/auth/refreshTokenRepository.js';
import { RefreshTokenError } from './error/index.js';
import type { TokenGenerator } from './loginUseCase.js';

export interface RefreshTokenInput {
  token: string;
}
export interface RefreshTokenOutput {
  accessToken: string;
}
export interface TokenVerifier {
  verifyRefreshToken(token: string): { userId: string; email: string };
}
export class RefreshTokenUseCase {
  constructor(
    private readonly refreshTokenRepo: RefreshTokenRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly tokenVerifier: TokenVerifier,
  ) {}

  async execute(input: RefreshTokenInput): Promise<RefreshTokenOutput> {
    const stored = await this.refreshTokenRepo.findByToken(input.token);
    if (!stored) {
      throw RefreshTokenError.InvalidToken();
    }

    const payload = this.tokenVerifier.verifyRefreshToken(input.token);

    const accessToken = this.tokenGenerator.generateAccessToken({
      userId: payload.userId,
      email: payload.email,
    });

    return { accessToken };
  }
}
