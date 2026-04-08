import type { EventLogRepository } from '../../../domain/eventLog/eventLogRepository.js';
import { EventLogModel } from './eventLogModel.js';

export class MongoEventLogRepository implements EventLogRepository {
  async create(eventName: string, payload: unknown): Promise<void> {
    await EventLogModel.create({ eventName, payload });
  }
}
