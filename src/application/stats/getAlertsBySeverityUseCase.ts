import type { StatsRepository, AlertsBySeverityResult } from '../../domain/stats/statsRepository.js';

export class GetAlertsBySeverityUseCase {
  constructor(private readonly statsRepo: StatsRepository) {}

  execute(): Promise<AlertsBySeverityResult[]> {
    return this.statsRepo.alertsBySeverity();
  }
}
