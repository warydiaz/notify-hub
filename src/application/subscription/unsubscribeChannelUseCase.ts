import type { UserRepository } from '../../domain/user/userRepository.js';
import type { EventBus } from '../../domain/events/eventBus.js';
import { Channel } from '../../domain/notifications/notificationChannel.js';
import { UserError } from './error/index.js';

export class UnsubscribeChannelUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(userId: string, channel: Channel): Promise<Channel[]> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw UserError.InvalidUser();

    const updated = await this.userRepo.updateChannels(
      userId,
      user.channels.filter((c) => c !== channel),
    );

    this.eventBus.publish('user.unsubscribed', { userId, channel });

    return updated.channels;
  }
}
