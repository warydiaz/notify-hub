export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  channels: ('email' | 'ws')[];
  createdAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}
