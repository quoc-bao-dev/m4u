import { create } from 'zustand'

// Tailwind CSS breakpoints
const BREAKPOINTS = {
  sm: 640, // Small devices (landscape phones)
  md: 768, // Medium devices (tablets)
  lg: 1024, // Large devices (desktops)
  xl: 1280, // Extra large devices (large desktops)
  '2xl': 1536, // 2X large devices (larger desktops)
} as const

interface DeviceState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  width: number
  height: number
  setDeviceInfo: (width: number, height: number) => void
}

export const useDeviceStore = create<DeviceState>((set: any) => ({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  width: 0,
  height: 0,
  setDeviceInfo: (width: number, height: number) => {
    const isMobile = width < BREAKPOINTS.md // < 768px
    const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg // 768px - 1023px
    const isDesktop = width >= BREAKPOINTS.lg // >= 1024px

    set({
      width,
      height,
      isMobile,
      isTablet,
      isDesktop,
    })
  },
}))

export const useDevice = () => {
  const { isMobile, isTablet, isDesktop, width, height } = useDeviceStore()

  return {
    isMobile,
    isTablet,
    isDesktop,
    width,
    height,
  }
}
