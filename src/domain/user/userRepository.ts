import type { User, CreateUserInput } from './user.js';

export interface UserRepository {
  save(input: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  updateChannels(userId: string, channels: ('email' | 'ws')[]): Promise<User>;
}
