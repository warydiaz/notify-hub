import mongoose, { Schema } from 'mongoose';

interface EventLogDocument {
  eventName: string;
  payload: unknown;
}

const eventLogSchema = new Schema<EventLogDocument>(
  {
    eventName: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
);

export const EventLogModel = mongoose.model<EventLogDocument>('EventLog', eventLogSchema);
