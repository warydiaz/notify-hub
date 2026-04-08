import mongoose, { Schema } from 'mongoose';

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    alertId: { type: Schema.Types.ObjectId, ref: 'Alert', default: null },
    channel: { type: String, enum: ['email', 'ws'], required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    success: { type: Boolean, required: true },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: false },
);

export const NotificationModel = mongoose.model('Notification', notificationSchema);
