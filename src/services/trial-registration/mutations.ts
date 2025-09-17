import { useMutation, useQueryClient } from '@tanstack/react-query'
import { trialRegistrationApi } from './api'
import { useToast } from '@/core/hooks'

export const useAppendReviewProduct = () => {
  const { showSuccess, showError } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: trialRegistrationApi.appendReviewProduct,
    onSuccess: (data) => {
      if (data.data.result) {
        showSuccess(data.data.message)
        queryClient.invalidateQueries({ queryKey: ['product-list'] })
      } else {
        showError(data.data.message)
      }
    },
    onError: () => {
      showError('Thêm sản phẩm thất bại')
    },
  })
}
