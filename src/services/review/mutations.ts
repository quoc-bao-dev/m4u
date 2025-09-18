import { useMutation } from "@tanstack/react-query"
import { reviewApi } from "./api"
import { useToast } from "@/core/hooks"

export const useSubmitReview = () => {
  const { showError, showSuccess } = useToast()

  const queryFn = async (data: FormData) => {
    const response = await reviewApi.submitReview(data)
    return response.data
  }
  return useMutation({
    mutationFn: queryFn,
    onSuccess: (response) => {
        if (response.result) {
      showSuccess(response.message)
        } else {
      showError(response.message)
        }
    },
    onError: (error) => {
      showError(error.message)
    },
  })
}