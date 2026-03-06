import { usePathname } from 'next/navigation'

export const useForMobileApp = () => {
  const refix = 'for-mobile-app'
  const pathname = usePathname()
  const forMobileApp = pathname.includes(refix)

  return forMobileApp
}
