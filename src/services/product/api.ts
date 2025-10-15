import { envConfig } from '@/core/config'
import axiosInstance from '@/core/http/axiosInstance'
import {
  ProductDetailResponse,
  ProductListResponse,
  TopThreeProductsResponse,
  ProductFilterResponse,
} from './type'

export const productApi = {
  getProductList: ({
    _local,
    tag_product_filter,
  }: {
    _local?: string
    tag_product_filter?: string[]
  }) =>
    axiosInstance.get<ProductListResponse>('products/getList', {
      baseURL: envConfig.adminUrl,
      params: { _local, tag_product_filter },
    }),

  getProductRelationList: ({ _local, id }: { _local?: string; id: string }) =>
    axiosInstance.get<ProductListResponse>('products/getList?NotIsSig=1', {
      baseURL: envConfig.adminUrl,
      params: { _local, id, per_page: 3 },
    }),

  getProductDetail: ({ slug, _local }: { slug: string; _local?: string }) =>
    axiosInstance.get<ProductDetailResponse>(`products/getDetail/${slug}`, {
      baseURL: envConfig.adminUrl,
      params: { _local },
    }),

  getProductListDetail: ({ id_product }: { id_product: string[] }) =>
    axiosInstance.post<ProductListResponse>('products/getListDetail', {
      baseURL: envConfig.adminUrl,
      id_product: id_product || [],
    }),

  // Top 3 products
  getTopThreeProducts: ({ _local }: { _local?: string }) =>
    axiosInstance.get<TopThreeProductsResponse>('products/top_three_product', {
      baseURL: envConfig.adminUrl,
      params: { _local },
    }),

  // Product filters
  getListProductsFilter: ({ _local }: { _local?: string }) =>
    axiosInstance.get<ProductFilterResponse>(
      'products/get_list_products_filter',
      {
        baseURL: envConfig.adminUrl,
        params: { _local },
      }
    ),
}
