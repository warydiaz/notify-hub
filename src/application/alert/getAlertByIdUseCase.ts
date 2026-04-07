import type { AlertRepository } from '../../domain/alert/alertRepository.js';
import type { Alert } from '../../domain/alert/alert.js';

export class GetAlertByIdUseCase {
  constructor(private readonly alertRepo: AlertRepository) {}

  async execute(id: string): Promise<Alert> {
    const alert = await this.alertRepo.findById(id);
    if (!alert) throw new Error('Alerta no encontrada');
    return alert;
  }
}
