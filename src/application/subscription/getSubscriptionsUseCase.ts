import { Channel } from '../../domain/notifications/notificationChannel.js';
import type { UserRepository } from '../../domain/user/userRepository.js';
import { UserError } from './error/index.js';

export class GetSubscriptionsUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string): Promise<(Channel[])> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw UserError.InvalidUser();
    return user.channels;
  }
}
