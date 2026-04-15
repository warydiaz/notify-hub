import type { EventBus } from '../../../domain/events/eventBus.js';
import type { AlertCreatedEmailHandler } from '../handlers/alertCreatedEmailHandler.js';
import type { AlertResolvedEmailHandler } from '../handlers/alertResolvedEmailHandler.js';

export class EmailSubscriber {
  constructor(
    private readonly eventBus: EventBus,
    private readonly alertCreatedHandler: AlertCreatedEmailHandler,
    private readonly alertResolvedHandler: AlertResolvedEmailHandler,
  ) {}

  register(): void {
    this.eventBus.subscribe('alert.created', (payload) => this.alertCreatedHandler.handle(payload));
    this.eventBus.subscribe('alert.resolved', (payload) => this.alertResolvedHandler.handle(payload));
  }
}
