import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/core/hooks'
import { apiReview } from './api'
import { useRouter } from 'next/navigation'

export const useSubmitReview = () => {
  const { showError, showSuccess } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  const queryFn = async ({ id, data }: { id: number; data: FormData }) => {
    const response = await apiReview.submitReview(id, data)
    return response.data
  }
  return useMutation({
    mutationFn: queryFn,
    onSuccess: (response) => {
      if (response.result) {
        showSuccess(response.message)
        queryClient.invalidateQueries({ queryKey: ['product-list'] })
        router.back()
      } else {
        showError(response.message)
      }
    },
    onError: (error) => {
      showError(error.message)
    },
  })
}
