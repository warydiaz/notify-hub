import type { StatsRepository, TopActiveUserResult } from '../../domain/stats/statsRepository.js';

export class GetTopActiveUsersUseCase {
  constructor(private readonly statsRepo: StatsRepository) {}

  execute(): Promise<TopActiveUserResult[]> {
    return this.statsRepo.topActiveUsers();
  }
}
