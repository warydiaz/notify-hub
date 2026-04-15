import type { User, CreateUserInput } from './user.js';
import type { Channel } from '../notifications/notificationChannel.js';

export interface UserRepository {
  save(input: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  updateChannels(userId: string, channels: Channel[]): Promise<User>;
  findAllByChannel(channel: Channel): Promise<User[]>;
}
