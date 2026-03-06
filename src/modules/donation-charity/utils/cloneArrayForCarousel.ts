/**
 * Utils function để clone mảng cho carousel
 * Giữ nguyên ID gốc, chỉ thêm prop key để render
 */

interface CloneableItem {
  id: string
  [key: string]: any
}

/**
 * Clone mảng cho carousel với số lần lập được chỉ định
 * @param originalArray - Mảng gốc cần clone
 * @param repeatCount - Số lần lập (mặc định là 4)
 * @returns Mảng mới với các phần tử được clone, giữ nguyên ID gốc và thêm key
 */
export const cloneArrayForCarousel = <T extends CloneableItem>(
  originalArray: T[],
  repeatCount: number = 4
): (T & { key: string })[] => {
  if (!originalArray || originalArray.length === 0) {
    return []
  }

  const clonedArray: (T & { key: string })[] = []

  for (let i = 0; i < repeatCount; i++) {
    const clonedItems = originalArray.map((item, index) => ({
      ...item,
      key: `${item.id}_clone_${i}_${index}`, // Thêm key unique cho render
    }))

    clonedArray.push(...clonedItems)
  }

  return clonedArray
}

/**
 * Clone mảng với cấu trúc Product cụ thể cho donation-charity
 * @param products - Mảng sản phẩm gốc
 * @param repeatCount - Số lần lập (mặc định là 4)
 * @returns Mảng sản phẩm đã được clone với key để render
 */
export const cloneProductsForCarousel = (
  products: Array<{
    id: string
    brand: string
    productName: string
    contributionPercentage: number
    imageSrc: string
    customColorHex?: string | null
  }>,
  repeatCount: number = 4
) => {
  return cloneArrayForCarousel(products, repeatCount)
}

/**
 * Clone mảng với cấu trúc Event cụ thể cho donation-charity
 * @param events - Mảng sự kiện gốc
 * @param repeatCount - Số lần lập (mặc định là 4)
 * @returns Mảng sự kiện đã được clone với key để render
 */
export const cloneEventsForCarousel = (
  events: Array<{
    id: string
    status: 'happening' | 'coming' | 'ended'
    date: string
    title: string
    productCount: number | string
    fundAmount: string
    imageSrc: string
    slug?: string
    typeSponsor?: number
    idStatus?: number
    serverBadgeName?: string
    serverBadgeColor?: string
    useServerBadge?: boolean
  }>,
  repeatCount: number = 4
) => {
  return cloneArrayForCarousel(events, repeatCount)
}
