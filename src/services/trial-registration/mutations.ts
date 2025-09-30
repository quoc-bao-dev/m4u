import { useToast } from '@/core/hooks'
import useRegisterSuccessModal from '@/modules/trial-registration/stores/useRegisterSuccessModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { trialRegistrationApi } from './api'

export const useAppendReviewProduct = () => {
  const { showError } = useToast()
  const registerSuccessModal = useRegisterSuccessModal()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: trialRegistrationApi.appendReviewProduct,
    onSuccess: (data) => {
      if (data.data.result) {
        registerSuccessModal.open()
        queryClient.invalidateQueries({ queryKey: ['product-list'] })

        // Send notification to user
        // apiNotification.sendNotiRemindReview()
      } else {
        showError(data.data.message)
      }
    },
    onError: () => {
      showError('Thêm sản phẩm thất bại')
    },
  })
}
