import { useGlobalLoading } from '../context/GlobalLoadingContext'

interface UseLoadingReturn {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
  withLoading: <T>(asyncFn: () => Promise<T>) => Promise<T>
}

export const useLoading = (): UseLoadingReturn => {
  return useGlobalLoading()
}
