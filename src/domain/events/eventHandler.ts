import type { AppEvents } from './appEvents.js';

export interface EventHandler<K extends keyof AppEvents> {
  handle(payload: AppEvents[K]): Promise<void>;
}
