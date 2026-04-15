import { NotificationChannel } from "./notificationChannel.js";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export interface EmailSender extends NotificationChannel {
  send(userId: string, data: unknown): Promise<boolean>;
}
