import type { Channel } from '../notifications/notificationChannel.js';

export type AppEvents = {
  'alert.created': {
    alertId: string
    userId: string
    severity: 'low' | 'medium' | 'high'
    title: string
  }
  'alert.resolved': {
    alertId: string
    resolvedBy: string
    resolvedAt: Date
  }
  'user.subscribed': {
    userId: string
    channel: Channel
  }
  'user.unsubscribed': {
    userId: string
    channel: Channel
  }
  'notification.sent': {
    notificationId: string
    channel: Channel
    success: boolean
  }
}