import mongoose, { Schema } from 'mongoose';
import type { RefreshToken } from '../../../domain/auth/refreshToken.js';

type RefreshTokenDocument = Omit<RefreshToken, 'id' | 'userId'> & {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
};

const refreshTokenSchema = new Schema<RefreshTokenDocument>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
);

export const RefreshTokenModel = mongoose.model<RefreshTokenDocument>(
  'RefreshToken',
  refreshTokenSchema,
);
