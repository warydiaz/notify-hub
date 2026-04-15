import { NotificationChannel } from "./notificationChannel.js"

export interface Notification {
  id: string
  userId: string
  alertId: string | null
  channel: NotificationChannel
  message: string
  read: boolean
  success: boolean
  sentAt: Date
}

export interface CreateNotificationInput {
  userId: string
  alertId: string | null
  channel: NotificationChannel
  message: string
  success: boolean
}