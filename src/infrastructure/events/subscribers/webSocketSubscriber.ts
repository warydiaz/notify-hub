import type { EventBus } from '../../../domain/events/eventBus.js';
import type { UserRepository } from '../../../domain/user/userRepository.js';
import type { WebSocketManager } from '../../websocket/webSocketManager.js';

export class WebSocketSubscriber {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userRepo: UserRepository,
    private readonly wsManager: WebSocketManager,
  ) {}

  register(): void {
    this.eventBus.subscribe('alert.created', async (payload) => {
      const user = await this.userRepo.findById(payload.userId);
      if (!user) return;
      if (!user.channels.includes('ws')) return;

      const success = this.wsManager.isConnected(payload.userId);

      if (success) {
        this.wsManager.send(payload.userId, {
          event: 'alert.created',
          data: payload,
        });
      }

      this.eventBus.publish('notification.sent', {
        notificationId: payload.alertId,
        channel: 'ws',
        success,
      });
    });
  }
}
