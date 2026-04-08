import type { UserRepository } from '../../domain/user/userRepository.js';
import type { EventBus } from '../../domain/events/eventBus.js';

export class SubscribeChannelUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(userId: string, channel: 'email' | 'ws'): Promise<('email' | 'ws')[]> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    if (user.channels.includes(channel)) {
      return user.channels;
    }

    const updated = await this.userRepo.updateChannels(userId, [...user.channels, channel]);

    this.eventBus.publish('user.subscribed', { userId, channel });

    return updated.channels;
  }
}
