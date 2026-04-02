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
    channel: 'email' | 'ws'
  }
  'user.unsubscribed': {
    userId: string
    channel: 'email' | 'ws'
  }
  'notification.sent': {
    notificationId: string
    channel: 'email' | 'ws'
    success: boolean
  }
}