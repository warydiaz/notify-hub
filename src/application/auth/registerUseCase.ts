import bcrypt from 'bcrypt';
import type { UserRepository } from '../../domain/user/userRepository.js';
import type { User } from '../../domain/user/user.js';

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export class RegisterUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(input: RegisterInput): Promise<Omit<User, 'password'>> {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new Error('Email ya registrado');
    }

    const hashed = await bcrypt.hash(input.password, 10);

    const user = await this.userRepo.save({
      email: input.email,
      password: hashed,
      name: input.name,
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
