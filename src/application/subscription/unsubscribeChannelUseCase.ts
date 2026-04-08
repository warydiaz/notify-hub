import type { UserRepository } from '../../domain/user/userRepository.js';
import type { EventBus } from '../../domain/events/eventBus.js';

export class UnsubscribeChannelUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(userId: string, channel: 'email' | 'ws'): Promise<('email' | 'ws')[]> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const updated = await this.userRepo.updateChannels(
      userId,
      user.channels.filter((c) => c !== channel),
    );

    this.eventBus.publish('user.unsubscribed', { userId, channel });

    return updated.channels;
  }
}
