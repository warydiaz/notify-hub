import type { AlertRepository } from '../../domain/alert/alertRepository.js';

export class DeleteAlertUseCase {
  constructor(private readonly alertRepo: AlertRepository) {}

  async execute(alertId: string, userId: string): Promise<void> {
    const alert = await this.alertRepo.findById(alertId);
    if (!alert) throw new Error('Alerta no encontrada');
    if (alert.userId !== userId) throw new Error('No autorizado');
    await this.alertRepo.delete(alertId);
  }
}
