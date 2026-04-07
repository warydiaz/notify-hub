export type Severity = 'low' | 'medium' | 'high';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: Severity;
  userId: string;
  resolved: boolean;
  resolvedBy: string | null;
  resolvedAt: Date | null;
  createdAt: Date;
}

export interface CreateAlertInput {
  title: string;
  message: string;
  severity: Severity;
  userId: string;
}
