import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/core/hooks"
import { apiReview } from "./api"

export const useSubmitReview = () => {
  const { showError, showSuccess } = useToast()

  const queryFn = async (data: FormData) => {
    const response = await apiReview.submitReview(data)
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