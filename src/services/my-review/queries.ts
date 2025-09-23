import { useQuery } from '@tanstack/react-query'
import { apiMyReview } from './api'

export function useMyReview(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['my-review'],
    queryFn: () => apiMyReview.getMyReview().then((res) => res.data),
    ...options,
  })
}
