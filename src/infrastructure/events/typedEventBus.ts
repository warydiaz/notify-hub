import EventEmitter from 'node:events';
import type { AppEvents } from '../../domain/events/appEvents.js';
import type { EventBus } from '../../domain/events/eventBus.js';

export class TypedEventBus implements EventBus {
  private readonly emitter = new EventEmitter();

  publish<K extends keyof AppEvents>(event: K, payload: AppEvents[K]): void {
    setImmediate(() => {
      this.emitter.emit(event as string, payload);
    });
  }

  subscribe<K extends keyof AppEvents>(
    event: K,
    handler: (payload: AppEvents[K]) => Promise<void> | void,
  ): void {
    const safeHandler = async (payload: AppEvents[K]) => {
      try {
        await handler(payload);
      } catch (err) {
        console.error(`[EventBus] Error en suscriptor de "${String(event)}":`, err);
      }
    };

    this.emitter.on(event as string, safeHandler);
  }

  unsubscribe<K extends keyof AppEvents>(
    event: K,
    handler: (payload: AppEvents[K]) => Promise<void> | void,
  ): void {
    this.emitter.off(event as string, handler);
  }
}
