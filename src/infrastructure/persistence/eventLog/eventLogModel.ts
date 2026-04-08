import mongoose, { Schema } from 'mongoose';

interface IEventLog {
  eventName: string;
  payload: unknown;
}

const eventLogSchema = new Schema<IEventLog>(
  {
    eventName: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
);

eventLogSchema.index({ eventName: 1 });
eventLogSchema.index({ createdAt: -1 });

export const EventLogModel = mongoose.model<IEventLog>('EventLog', eventLogSchema);
