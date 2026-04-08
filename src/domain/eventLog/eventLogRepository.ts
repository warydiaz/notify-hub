export interface EventLogRepository {
  create(eventName: string, payload: unknown): Promise<void>;
}
