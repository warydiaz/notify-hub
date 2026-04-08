import type { StatsRepository, AvgResolutionTimeResult } from '../../domain/stats/statsRepository.js';

export class GetResolutionTimeUseCase {
  constructor(private readonly statsRepo: StatsRepository) {}

  execute(): Promise<AvgResolutionTimeResult[]> {
    return this.statsRepo.avgResolutionTimePerSeverity();
  }
}
