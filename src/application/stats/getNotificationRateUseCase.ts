import type { StatsRepository, NotificationSuccessRateResult } from '../../domain/stats/statsRepository.js';

export class GetNotificationRateUseCase {
  constructor(private readonly statsRepo: StatsRepository) {}

  execute(): Promise<NotificationSuccessRateResult[]> {
    return this.statsRepo.notificationSuccessRate();
  }
}
