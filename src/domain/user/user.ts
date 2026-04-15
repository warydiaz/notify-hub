import type { Channel } from '../notifications/notificationChannel.js';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  channels: Channel[];
  createdAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}
