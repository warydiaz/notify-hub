import mongoose, { Schema } from 'mongoose';
import type { Alert } from '../../../domain/alert/alert.js';

type AlertDocument = Omit<Alert, 'id' | 'userId' | 'resolvedBy'> & {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  resolvedBy: mongoose.Types.ObjectId | null;
};

const alertSchema = new Schema<AlertDocument>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    resolved: { type: Boolean, default: false },
    resolvedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    resolvedAt: { type: Date, default: null },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
);

export const AlertModel = mongoose.model<AlertDocument>('Alert', alertSchema);
