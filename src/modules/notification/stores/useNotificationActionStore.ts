import { create } from 'zustand'

interface NotificationActionData {
  reviewId: number
  active: number
  timestamp: number
}

interface NotificationActionStore {
  notificationAction: NotificationActionData | null
  setNotificationAction: (data: NotificationActionData | null) => void
  clearNotificationAction: () => void
}

export const useNotificationActionStore = create<NotificationActionStore>(
  (set) => ({
    notificationAction: null,
    setNotificationAction: (data) => set({ notificationAction: data }),
    clearNotificationAction: () => set({ notificationAction: null }),
  })
)
