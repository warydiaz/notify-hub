import { NotificationChannel } from "./notificationChannel.js";

export interface RealtimeNotifier extends NotificationChannel {
  isConnected(userId: string): boolean;
  send(userId: string, data: unknown): Promise<boolean>;
}
