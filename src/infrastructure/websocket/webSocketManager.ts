import type { WebSocket } from '@fastify/websocket';
import type { RealtimeNotifier } from '../../domain/notifications/realtimeNotifier.js';

export class WebSocketManager implements RealtimeNotifier {
  private connections = new Map<string, WebSocket>();

  add(userId: string, socket: WebSocket): void {
    this.connections.set(userId, socket);
    socket.on('close', () => this.connections.delete(userId));
  }

  send(userId: string, data: unknown): Promise<boolean> {
    const socket = this.connections.get(userId);
    if (socket && socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify(data));
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  isConnected(userId: string): boolean {
    return this.connections.has(userId);
  }
}
