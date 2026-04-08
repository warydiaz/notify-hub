export interface AlertsBySeverityResult {
  _id: string;
  count: number;
}

export interface NotificationSuccessRateResult {
  channel: string;
  total: number;
  successful: number;
  rate: number;
}

export interface AvgResolutionTimeResult {
  severity: string;
  avgResolutionTimeMinutes: number;
}

export interface TopActiveUserResult {
  userId: string;
  alertCount: number;
  name: string;
  email: string;
}

export interface StatsRepository {
  alertsBySeverity(): Promise<AlertsBySeverityResult[]>;
  notificationSuccessRate(): Promise<NotificationSuccessRateResult[]>;
  avgResolutionTimePerSeverity(): Promise<AvgResolutionTimeResult[]>;
  topActiveUsers(): Promise<TopActiveUserResult[]>;
}
