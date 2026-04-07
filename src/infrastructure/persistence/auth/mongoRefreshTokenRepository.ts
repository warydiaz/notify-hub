import type { RefreshTokenRepository } from '../../../domain/auth/refreshTokenRepository.js';
import type { RefreshToken } from '../../../domain/auth/refreshToken.js';
import { RefreshTokenModel } from './refreshTokenModel.js';

export class MongoRefreshTokenRepository implements RefreshTokenRepository {
  private toRefreshToken(doc: any): RefreshToken {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      token: doc.token,
      createdAt: doc.createdAt,
    };
  }

  async save(userId: string, token: string): Promise<RefreshToken> {
    const doc = await RefreshTokenModel.create({ userId, token });
    return this.toRefreshToken(doc);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const doc = await RefreshTokenModel.findOne({ token });
    return doc ? this.toRefreshToken(doc) : null;
  }

  async deleteByToken(token: string): Promise<void> {
    await RefreshTokenModel.deleteOne({ token });
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    await RefreshTokenModel.deleteMany({ userId });
  }
}
