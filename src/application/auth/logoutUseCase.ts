import type { RefreshTokenRepository } from '../../domain/auth/refreshTokenRepository.js';

export class LogoutUseCase {
  constructor(private readonly refreshTokenRepo: RefreshTokenRepository) {}

  async execute(token: string): Promise<void> {
    await this.refreshTokenRepo.deleteByToken(token);
  }
}
