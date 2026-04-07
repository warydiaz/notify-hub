import type { RefreshTokenRepository } from '../../domain/auth/refreshTokenRepository.js';
import type { TokenGenerator } from './loginUseCase.js';

export interface RefreshTokenInput {
  token: string;
}

export interface RefreshTokenOutput {
  accessToken: string;
}

export interface TokenVerifier {
  verifyRefreshToken(token: string): { userId: string };
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
      throw new Error('Refresh token inválido');
    }

    const payload = this.tokenVerifier.verifyRefreshToken(input.token);

    const accessToken = this.tokenGenerator.generateAccessToken({
      userId: payload.userId,
      email: '',
    });

    return { accessToken };
  }
}
