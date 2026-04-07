import type { WebSocket } from '@fastify/websocket';

export class WebSocketManager {
  private connections = new Map<string, WebSocket>();

  add(userId: string, socket: WebSocket): void {
    this.connections.set(userId, socket);
    socket.on('close', () => this.connections.delete(userId));
  }

  send(userId: string, data: unknown): void {
    const socket = this.connections.get(userId);
    if (socket && socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify(data));
    }
  }

  isConnected(userId: string): boolean {
    return this.connections.has(userId);
  }
}
