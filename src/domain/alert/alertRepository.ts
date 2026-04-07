import type { Alert, CreateAlertInput } from './alert.js';

export interface AlertFilters {
  severity?: 'low' | 'medium' | 'high';
  resolved?: boolean;
  userId?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface AlertRepository {
  save(input: CreateAlertInput): Promise<Alert>;
  findById(id: string): Promise<Alert | null>;
  findAll(filters: AlertFilters, page: number, limit: number): Promise<PaginatedResult<Alert>>;
  update(alert: Alert): Promise<Alert>;
  delete(id: string): Promise<void>;
}
