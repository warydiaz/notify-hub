import type {
  AlertRepository,
  AlertFilters,
  PaginatedResult,
} from '../../domain/alert/alertRepository.js';
import type { Alert } from '../../domain/alert/alert.js';

export class GetAlertsUseCase {
  constructor(private readonly alertRepo: AlertRepository) {}

  async execute(
    filters: AlertFilters,
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Alert>> {
    return this.alertRepo.findAll(filters, page, limit);
  }
}
