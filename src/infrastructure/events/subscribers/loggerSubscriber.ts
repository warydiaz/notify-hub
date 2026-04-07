import type { EventBus } from '../../../domain/events/eventBus.js';
import { EventLogModel } from '../../persistence/eventLog/eventLogModel.js';


export class LoggerSubscriber {
  constructor(private readonly eventBus: EventBus) {}

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
        await EventLogModel.create({ eventName: event, payload });
      });
    }
  }
}
