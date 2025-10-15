import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import apiReviewHub from './api'

export const useGetDataReviewHub = () => {
  const queryFn = async () => {
    const response = await apiReviewHub.getDataReviewHub({
      per_page: 9,
      current_page: 1,
    })
    return response.data.data.data
  }
  return useQuery({
    queryKey: ['getDataReviewHub'],
    queryFn: queryFn,
  })
}

export const useGetDataReviewHubProduct = (id_product: number) => {
  const queryFn = async () => {
    const response = await apiReviewHub.dataReviewHubProduct(id_product, {
      per_page: 10,
      current_page: 1,
    })
    return response.data.data
  }
  return useQuery({
    queryKey: ['dataReviewHubProduct', id_product],
    queryFn: queryFn,
  })
}

export const useGetDataReviewHubDetail = (slug: string) => {
  const queryFn = async () => {
    const response = await apiReviewHub.dataReviewHubDetail(slug, {
      per_page: 8,
      current_page: 1,
    })
    return response.data.data
  }
  return useQuery({
    queryKey: ['dataReviewHubDetail', slug],
    queryFn: queryFn,
    enabled: !!slug,
  })
}

export const useGetDataReviewHubDetailInfinite = (slug: string) => {
  const queryFn = async ({ pageParam = 1 }) => {
    const response = await apiReviewHub.dataReviewHubDetail(slug, {
      per_page: 8,
      current_page: pageParam,
    })
    return response.data.data
  }
  
  return useInfiniteQuery({
    queryKey: ['dataReviewHubDetailInfinite', slug],
    queryFn: queryFn,
    enabled: !!slug,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Kiểm tra nếu có dữ liệu review và còn trang tiếp theo
      if (lastPage?.review?.next_page_url) {
        return lastPage.review.current_page + 1
      }
      return undefined
    },
  })
}

export const useGetProductRelationListReviewHub = ({ id }: { id: string }) => {
  const queryFn = async () => {
    const response = await apiReviewHub.getProductRelationListReviewHub({ id })
    return response.data.data.data
  }
  return useQuery({
    queryKey: ['product-relation-list-review-hub', id],
    queryFn: queryFn,
    enabled: !!id,
  })
}