import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { useLoading } from './useLoading'

// Hook cho useQuery với global loading
export const useQueryWithLoading = <TData = unknown, TError = unknown>(
  options: UseQueryOptions<TData, TError> & {
    showGlobalLoading?: boolean
  }
) => {
  const { showGlobalLoading = true, ...queryOptions } = options
  const { startLoading, stopLoading } = useLoading()

  const query = useQuery({
    ...queryOptions,
    onSettled: (data, error) => {
      // Gọi onSettled gốc nếu có
      if (queryOptions.onSettled) {
        queryOptions.onSettled(data, error)
      }
      
      // Dừng global loading
      if (showGlobalLoading) {
        stopLoading()
      }
    },
    onSuccess: (data) => {
      // Gọi onSuccess gốc nếu có
      if (queryOptions.onSuccess) {
        queryOptions.onSuccess(data)
      }
    },
    onError: (error) => {
      // Gọi onError gốc nếu có
      if (queryOptions.onError) {
        queryOptions.onError(error)
      }
    }
  })

  // Bắt đầu loading khi query bắt đầu
  if (showGlobalLoading && query.isLoading && !query.isFetching) {
    startLoading()
  }

  return query
}

// Hook cho useMutation với global loading
export const useMutationWithLoading = <TData = unknown, TError = unknown, TVariables = unknown>(
  options: UseMutationOptions<TData, TError, TVariables> & {
    showGlobalLoading?: boolean
  }
) => {
  const { showGlobalLoading = true, ...mutationOptions } = options
  const { startLoading, stopLoading } = useLoading()

  const mutation = useMutation({
    ...mutationOptions,
    onMutate: (variables) => {
      // Bắt đầu global loading
      if (showGlobalLoading) {
        startLoading()
      }
      
      // Gọi onMutate gốc nếu có
      if (mutationOptions.onMutate) {
        return mutationOptions.onMutate(variables)
      }
    },
    onSettled: (data, error, variables, context) => {
      // Dừng global loading
      if (showGlobalLoading) {
        stopLoading()
      }
      
      // Gọi onSettled gốc nếu có
      if (mutationOptions.onSettled) {
        mutationOptions.onSettled(data, error, variables, context)
      }
    },
    onSuccess: (data, variables, context) => {
      // Gọi onSuccess gốc nếu có
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(data, variables, context)
      }
    },
    onError: (error, variables, context) => {
      // Gọi onError gốc nếu có
      if (mutationOptions.onError) {
        mutationOptions.onError(error, variables, context)
      }
    }
  })

  return mutation
}

// Hook đơn giản hơn - chỉ wrap query với loading
export const useQueryLoading = <TData = unknown, TError = unknown>(
  queryKey: any[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> & {
    showGlobalLoading?: boolean
  }
) => {
  return useQueryWithLoading({
    queryKey,
    queryFn,
    ...options
  })
}

// Hook đơn giản hơn - chỉ wrap mutation với loading
export const useMutationLoading = <TData = unknown, TError = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> & {
    showGlobalLoading?: boolean
  }
) => {
  return useMutationWithLoading({
    mutationFn,
    ...options
  })
}
