import { useNavigate } from '@/locale'
import { NotificationItem as ApiNotificationItem } from '@/services/notification/type'
import { useNotificationActionStore } from '../stores/useNotificationActionStore'

export interface NotificationHandlerProps {
  onClick?: () => void
}

export const useNotificationHandler = ({
  onClick,
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
        reviewId: jsonData.id!,
        active: jsonData.active!,
        timestamp: Date.now(),
      })
      if (onClick) {
        onClick()
      }
      // Navigate to my-reviews page first
      nav('/my-reviews')

      // The my-reviews page will handle the modal opening based on Zustand store data
    } else if (notification.object_type === 'send_review') {
      const jsonData = notification.json_data

      if (!jsonData) return

      if (onClick) {
        onClick()
      }
      // Navigate to submit-review page with the review id
      nav(`/submit-review/${jsonData.id_review}`)
    } else if (notification.object_type === 'sign_up_review') {
      const jsonData = notification.json_data

      if (!jsonData) return

      if (onClick) {
        onClick()
      }
      // Navigate to submit-review page with the review id
      nav(`/submit-review/${jsonData.id_review}`)
    }
  }

  return {
    handleNotificationClick,
  }
}
