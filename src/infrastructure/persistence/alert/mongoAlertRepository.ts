import type {
  AlertRepository,
  AlertFilters,
  PaginatedResult,
} from '../../../domain/alert/alertRepository.js';
import type { Alert, CreateAlertInput } from '../../../domain/alert/alert.js';
import { AlertModel } from './alertModel.js';

export class MongoAlertRepository implements AlertRepository {
  private toAlert(doc: any): Alert {
    return {
      id: doc._id.toString(),
      title: doc.title,
      message: doc.message,
      severity: doc.severity,
      userId: doc.userId.toString(),
      resolved: doc.resolved,
      resolvedBy: doc.resolvedBy ? doc.resolvedBy.toString() : null,
      resolvedAt: doc.resolvedAt,
      createdAt: doc.createdAt,
    };
  }

  async save(input: CreateAlertInput): Promise<Alert> {
    const doc = await AlertModel.create(input);
    return this.toAlert(doc);
  }

  async findById(id: string): Promise<Alert | null> {
    const doc = await AlertModel.findById(id);
    return doc ? this.toAlert(doc) : null;
  }

  async findAll(
    filters: AlertFilters,
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Alert>> {
    const query: Record<string, unknown> = {};
    if (filters.severity) query.severity = filters.severity;
    if (filters.resolved !== undefined) query.resolved = filters.resolved;
    if (filters.userId) query.userId = filters.userId;

    const [docs, total] = await Promise.all([
      AlertModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
      AlertModel.countDocuments(query),
    ]);

    return {
      data: docs.map((doc) => this.toAlert(doc)),
      total,
      page,
      limit,
    };
  }

  async update(alert: Alert): Promise<Alert> {
    const doc = await AlertModel.findByIdAndUpdate(
      alert.id,
      {
        resolved: alert.resolved,
        resolvedBy: alert.resolvedBy,
        resolvedAt: alert.resolvedAt,
      },
      { new: true },
    );
    if (!doc) throw new Error('Alerta no encontrada');
    return this.toAlert(doc);
  }

  async delete(id: string): Promise<void> {
    await AlertModel.findByIdAndDelete(id);
  }
}
