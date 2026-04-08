import type { UserRepository } from '../../domain/user/userRepository.js';

export class GetSubscriptionsUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string): Promise<('email' | 'ws')[]> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    return user.channels;
  }
}
