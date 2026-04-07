import type { AlertRepository } from '../../domain/alert/alertRepository.js';
import type { EventBus } from '../../domain/events/eventBus.js';
import type { Alert } from '../../domain/alert/alert.js';

export class ResolveAlertUseCase {
  constructor(
    private readonly alertRepo: AlertRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(alertId: string, resolvedBy: string): Promise<Alert> {
    const alert = await this.alertRepo.findById(alertId);
    if (!alert) throw new Error('Alerta no encontrada');
    if (alert.resolved) throw new Error('La alerta ya está resuelta');

    const resolvedAt = new Date();
    const updated = await this.alertRepo.update({
      ...alert,
      resolved: true,
      resolvedBy,
      resolvedAt,
    });

    this.eventBus.publish('alert.resolved', {
      alertId: updated.id,
      resolvedBy,
      resolvedAt,
    });

    return updated;
  }
}
