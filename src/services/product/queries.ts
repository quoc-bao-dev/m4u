import { useLanguageSwitch } from '@/locale'
import { useQuery } from '@tanstack/react-query'
import { productApi } from './api'
import { ProductFilterResponse } from './type'

export const useGetProductList = ({
  tag_product_filter,
}: {
  tag_product_filter?: string[]
}) => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  const queryFn = async () => {
    const response = await productApi.getProductList({
      _local: _locale,
      tag_product_filter,
    })
    return response.data
  }
  return useQuery({
    queryKey: ['product-list', _locale, tag_product_filter],
    queryFn: queryFn,
  })
}

export const useGetProductRelationList = ({ id }: { id: string }) => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  const queryFn = async () => {
    const response = await productApi.getProductRelationList({
      _local: _locale,
      id,
    })
    return response.data
  }
  return useQuery({
    queryKey: ['product-relation-list', _locale, id],
    queryFn: queryFn,
    enabled: !!id,
  })
}

export const useGetProductDetail = ({ slug }: { slug: string }) => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  const queryFn = async () => {
    const response = await productApi.getProductDetail({
      slug,
      _local: _locale,
    })
    return response.data
  }
  return useQuery({
    queryKey: ['product-detail', { slug, _locale }],
    queryFn: queryFn,
    enabled: !!slug,
  })
}

export const useGetProductListDetail = ({ ids }: { ids: string[] }) => {
  const queryFn = async () => {
    const response = await productApi.getProductListDetail({ id_product: ids })
    return response.data.data
  }
  return useQuery({
    queryKey: ['product-list-detail', { ids }],
    queryFn: queryFn,
    enabled: Array.isArray(ids) && ids.length > 0,
  })
}

export const useGetTopThreeProducts = () => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  const queryFn = async () => {
    const response = await productApi.getTopThreeProducts({ _local: _locale })
    return response.data
  }
  return useQuery({
    queryKey: ['product-top-three', _locale],
    queryFn: queryFn,
  })
}

export const useGetListProductsFilter = () => {
  const { currentLocale } = useLanguageSwitch()
  const _locale = currentLocale
  const queryFn = async () => {
    const response = await productApi.getListProductsFilter({ _local: _locale })
    return response.data as ProductFilterResponse
  }
  return useQuery<ProductFilterResponse>({
    queryKey: ['product-filters', _locale],
    queryFn: queryFn,
  })
}
