import { useMemo } from 'react'
import { useGetListProductsFilter } from './queries'

export type ProductFilterOptionView = {
  id: string
  label: string
  count?: number
}

export type ProductFilterGroupView = {
  id: string
  title: string
  options: ProductFilterOptionView[]
}

export const useProductFilterGroups = (): {
  groups: ProductFilterGroupView[]
  isLoading: boolean
} => {
  const { data: productFilters, isLoading } = useGetListProductsFilter()

  const groups = useMemo<ProductFilterGroupView[]>(() => {
    if (!productFilters || !Array.isArray(productFilters)) return []
    return productFilters.map((group) => ({
      id: String(group.id),
      title: group.name,
      options: Array.isArray(group.child)
        ? group.child.map((opt) => ({
            id: String(opt.id),
            label: opt.name,
            count:
              typeof opt.total_product === 'number'
                ? opt.total_product
                : undefined,
          }))
        : [],
    }))
  }, [productFilters])

  return { groups, isLoading }
}
