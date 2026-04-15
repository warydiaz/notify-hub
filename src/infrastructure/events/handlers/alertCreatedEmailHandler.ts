import type { EventBus } from '../../../domain/events/eventBus.js';
import type { EventHandler } from '../../../domain/events/eventHandler.js';
import type { UserRepository } from '../../../domain/user/userRepository.js';
import type { EmailSender } from '../../../domain/notifications/emailSender.js';
import type { AppEvents } from '../../../domain/events/appEvents.js';

export class AlertCreatedEmailHandler implements EventHandler<'alert.created'> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly emailSender: EmailSender,
    private readonly eventBus: EventBus,
  ) {}

  async handle(payload: AppEvents['alert.created']): Promise<void> {
    const users = await this.userRepo.findAllByChannel('email');

    let success = true;

    for (const user of users) {
      success =
        success &&
        (await this.emailSender.send(user.id, {
          to: user.email,
          subject: `[CREATED] Alerta creada`,
          html: `<p>La alerta <strong>${payload.alertId}</strong> ha sido creada con el titulo ${payload.title}.</p>`,
        }));
    }

    this.eventBus.publish('notification.sent', {
      notificationId: payload.alertId,
      channel: 'email',
      success,
    });
  }
}
