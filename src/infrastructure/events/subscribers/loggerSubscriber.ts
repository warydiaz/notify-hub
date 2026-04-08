import type { EventBus } from '../../../domain/events/eventBus.js';
import type { EventLogRepository } from '../../../domain/eventLog/eventLogRepository.js';

export class LoggerSubscriber {
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventLogRepo: EventLogRepository,
  ) {}

  register(): void {
    const events = [
      'alert.created',
      'alert.resolved',
      'user.subscribed',
      'user.unsubscribed',
      'notification.sent',
    ] as const;

    for (const event of events) {
      this.eventBus.subscribe(event, async (payload) => {
        await this.eventLogRepo.create(event, payload);
      });
    }
  }
}
