import type { AppEvents } from './appEvents.js';

export interface EventBus {
  publish<K extends keyof AppEvents>(event: K, payload: AppEvents[K]): void;
  subscribe<K extends keyof AppEvents>(
    event: K,
    handler: (payload: AppEvents[K]) => Promise<void> | void,
  ): void;
  unsubscribe<K extends keyof AppEvents>(
    event: K,
    handler: (payload: AppEvents[K]) => Promise<void> | void,
  ): void;
}
