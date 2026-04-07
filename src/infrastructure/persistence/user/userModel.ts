import mongoose, { Schema } from 'mongoose';
import type { User } from '../../../domain/user/user.js';

type UserDocument = Omit<User, 'id'> & { _id: mongoose.Types.ObjectId };

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    channels: { type: [String], default: [] },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
