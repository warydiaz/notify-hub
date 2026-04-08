import type { NotificationChannel } from '../notifications/notificationChannel.js';

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
    channel: NotificationChannel
  }
  'user.unsubscribed': {
    userId: string
    channel: NotificationChannel
  }
  'notification.sent': {
    notificationId: string
    channel: NotificationChannel
    success: boolean
  }
}