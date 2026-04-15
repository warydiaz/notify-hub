import type { EventBus } from '../../../domain/events/eventBus.js';
import type { EventHandler } from '../../../domain/events/eventHandler.js';
import type { UserRepository } from '../../../domain/user/userRepository.js';
import type { EmailSender } from '../../../domain/notifications/emailSender.js';
import type { AppEvents } from '../../../domain/events/appEvents.js';

export class AlertResolvedEmailHandler implements EventHandler<'alert.resolved'> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly emailSender: EmailSender,
    private readonly eventBus: EventBus,
  ) {}

  async handle(payload: AppEvents['alert.resolved']): Promise<void> {
    const users = await this.userRepo.findAllByChannel('email');

    for (const user of users) {
      const success = await this.emailSender.send(user.id, {
        to: user.email,
        subject: `[RESOLVED] Alerta resuelta`,
        html: `<p>La alerta <strong>${payload.alertId}</strong> ha sido resuelta el ${payload.resolvedAt.toISOString()}.</p>`,
      });

      this.eventBus.publish('notification.sent', {
        notificationId: payload.alertId,
        channel: 'email',
        success,
      });
    }
  }
}
