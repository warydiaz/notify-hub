import type { EventBus } from '../../../domain/events/eventBus.js';
import type { UserRepository } from '../../../domain/user/userRepository.js';
import type { NodemailerEmailSender } from '../../email/nodemailerEmailSender.js';
import { EventLogModel } from '../../persistence/eventLog/eventLogModel.js';

export class EmailSubscriber {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userRepo: UserRepository,
    private readonly emailSender: NodemailerEmailSender,
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
  }
}
