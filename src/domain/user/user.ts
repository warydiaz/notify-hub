import type { NotificationChannel } from '../notifications/notificationChannel.js';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  channels: NotificationChannel[];
  createdAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}
