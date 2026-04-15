import type { UserRepository } from '../../domain/user/userRepository.js';
import type { EventBus } from '../../domain/events/eventBus.js';
import { Channel } from '../../domain/notifications/notificationChannel.js';
import { UserError } from './error/index.js';

export class SubscribeChannelUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(userId: string, channel: Channel): Promise<Channel[]> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw UserError.InvalidUser();

    if (user.channels.includes(channel)) {
      return user.channels;
    }

    const updated = await this.userRepo.updateChannels(userId, [...user.channels, channel]);

    this.eventBus.publish('user.subscribed', { userId, channel });

    return updated.channels;
  }
}
