export type ProductItem = {
  id: string
  image: string
  imageAlt?: string
  rate: number
  bgColor: string
  hex: string
  brand: string
  productName: string
  participation: number // 0-100
  time?: string // HH:MM:SS
}

export const PRODUCTS_MOCK: ProductItem[] = [
  {
    id: 'p-002',
    image: '/image/home/deal1.png',
    imageAlt: 'Toner cân bằng da',
    rate: 4.7,
    bgColor: '#FFF1F2',
    hex: '#FB7185',
    brand: 'AquaSkin',
    productName: 'Balancing Toner 200ml',
    participation: 65,
    time: '12:10:45',
  },
  {
    id: 'p-003',
    image: '/image/home/deal2.png',
    imageAlt: 'Kem dưỡng sáng da',
    rate: 4.8,
    bgColor: '#FFF7E6',
    hex: '#FF9800',
    brand: 'SunnyCare',
    productName: 'Brightening Cream 50ml',
    participation: 70,
    time: '08:30:00',
  },
  {
    id: 'p-004',
    image: '/image/home/deal3.png',
    imageAlt: 'Sữa rửa mặt dịu nhẹ',
    rate: 4.6,
    bgColor: '#E9F9F1',
    hex: '#22C55E',
    brand: 'PureLeaf',
    productName: 'Gentle Cleanser 150ml',
    participation: 58,
    time: '02:15:20',
  },
  {
    id: 'p-005',
    image: '/image/home/deal3.png',
    imageAlt: 'Sữa rửa mặt dịu nhẹ',
    rate: 4.6,
    bgColor: '#E9F9F1',
    hex: '#22C55E',
    brand: 'PureLeaf',
    productName: 'Gentle Cleanser 150ml',
    participation: 58,
    time: '02:15:20',
  },
  {
    id: 'p-006',
    image: '/image/home/deal1.png',
    imageAlt: 'Kem chống nắng SPF50+',
    rate: 4.9,
    bgColor: '#FFF1F2',
    hex: '#FB7185',
    brand: 'SunGuard',
    productName: 'Daily UV Shield SPF50+',
    participation: 85,
    time: '22:05:30',
  },
  {
    id: 'p-007',
    image: '/image/home/deal3.png',
    imageAlt: 'Mặt nạ phục hồi',
    rate: 4.4,
    bgColor: '#E9F9F1',
    hex: '#22C55E',
    brand: 'Re:Skin',
    productName: 'Recovery Mask Pack',
    participation: 37,
    time: '16:40:00',
  },
  {
    id: 'p-008',
    image: '/image/home/deal2.png',
    imageAlt: 'Dầu gội phục hồi tóc',
    rate: 4.6,
    bgColor: '#FEF3C7',
    hex: '#F59E0B',
    brand: 'HairCare+',
    productName: 'Repair Shampoo 300ml',
    participation: 52,
    time: '10:00:00',
  },
  {
    id: 'p-007',
    image: '/image/home/deal3.png',
    imageAlt: 'Mặt nạ phục hồi',
    rate: 4.4,
    bgColor: '#E9F9F1',
    hex: '#22C55E',
    brand: 'Re:Skin',
    productName: 'Recovery Mask Pack',
    participation: 37,
    time: '16:40:00',
  },
]

export default PRODUCTS_MOCK
