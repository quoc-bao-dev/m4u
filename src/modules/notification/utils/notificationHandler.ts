import { useNavigate } from '@/locale'
import { NotificationItem as ApiNotificationItem } from '@/services/notification/type'
import { useNotificationActionStore } from '../stores/useNotificationActionStore'

export interface NotificationHandlerProps {
  onOpenRejectModal?: (reason: string, reviewId: number) => void
  onOpenDetailModal?: (reviewId: number) => void
  onNavigateToMyReviews?: (reviewId?: number) => void
}

export const useNotificationHandler = ({
  onOpenRejectModal,
  onOpenDetailModal,
  onNavigateToMyReviews,
}: NotificationHandlerProps) => {
  const nav = useNavigate()
  const { setNotificationAction } = useNotificationActionStore()

  const handleNotificationClick = (notification: ApiNotificationItem) => {
    // Check object_type
    if (notification.object_type === 'change_active_review') {
      const jsonData = notification.json_data

      if (!jsonData) return

      // Store notification data in Zustand store
      setNotificationAction({
        reviewId: jsonData.id,
        active: jsonData.active,
        timestamp: Date.now(),
      })

      // Navigate to my-reviews page first
      if (onNavigateToMyReviews) {
        onNavigateToMyReviews(jsonData.id)
      } else {
        nav('/my-reviews')
      }

      // The my-reviews page will handle the modal opening based on Zustand store data
    }
  }

  return {
    handleNotificationClick,
  }
}
