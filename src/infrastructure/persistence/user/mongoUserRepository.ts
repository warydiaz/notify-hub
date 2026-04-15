import type { UserRepository } from '../../../domain/user/userRepository.js';
import type { User, CreateUserInput } from '../../../domain/user/user.js';
import { UserModel } from './userModel.js';
import type { Channel } from '../../../domain/notifications/notificationChannel.js';

export class MongoUserRepository implements UserRepository {
  private toUser(doc: any): User {
    return {
      id: doc._id.toString(),
      email: doc.email,
      password: doc.password,
      name: doc.name,
      channels: doc.channels,
      createdAt: doc.createdAt,
    };
  }

  async save(input: CreateUserInput): Promise<User> {
    const doc = await UserModel.create(input);
    return this.toUser(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email });
    return doc ? this.toUser(doc) : null;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    return doc ? this.toUser(doc) : null;
  }

  async updateChannels(userId: string, channels: Channel[]): Promise<User> {
    const doc = await UserModel.findByIdAndUpdate(userId, { channels }, { new: true });
    return this.toUser(doc);
  }

  async findAllByChannel(channel: Channel): Promise<User[]> {
    const docs = await UserModel.find({ channels: channel });
    return docs.map((doc) => this.toUser(doc));
  }
}
