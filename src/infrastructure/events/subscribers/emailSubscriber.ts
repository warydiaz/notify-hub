import type { EventBus } from '../../../domain/events/eventBus.js';
import type { UserRepository } from '../../../domain/user/userRepository.js';
import type { EmailSender } from '../../../domain/notifications/emailSender.js';

export class EmailSubscriber {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userRepo: UserRepository,
    private readonly emailSender: EmailSender,
  ) {}

  register(): void {
    this.eventBus.subscribe('alert.created', async (payload) => {
      const user = await this.userRepo.findById(payload.userId);
      if (!user) return;
      if (!user.channels.includes('email')) return;

      const success = await this.emailSender.send({
        to: user.email,
        subject: `[${payload.severity.toUpperCase()}] ${payload.title}`,
        html: `<p>Se ha creado una nueva alerta: <strong>${payload.title}</strong></p>`,
      });

      this.eventBus.publish('notification.sent', {
        notificationId: payload.alertId,
        channel: 'email',
        success,
      });
    });

    this.eventBus.subscribe('alert.resolved', async (payload) => {
      const users = await this.userRepo.findAllByChannel('email');

      for (const user of users) {
        const success = await this.emailSender.send({
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
    });
  }
}
