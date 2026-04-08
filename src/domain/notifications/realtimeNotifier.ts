export interface RealtimeNotifier {
  isConnected(userId: string): boolean;
  send(userId: string, data: unknown): void;
}
