import type { AlertRepository, } from '../../domain/alert/alertRepository.js'
import type { EventBus } from '../../domain/events/eventBus.js'
import type { Alert, CreateAlertInput } from '../../domain/alert/alert.js'

export class CreateAlertUseCase {
  constructor(
    private readonly alertRepo: AlertRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(input: CreateAlertInput): Promise<Alert> {
    const alert = await this.alertRepo.save(input)

    this.eventBus.publish('alert.created', {
      alertId: alert.id,
      userId: alert.userId,
      severity: alert.severity,
      title: alert.title,
    })

    return alert
  }
}