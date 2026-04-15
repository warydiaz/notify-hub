export type Channel = 'email' | 'ws';

export interface NotificationChannel {
    send(userId: string, data: unknown): Promise<boolean>;
}