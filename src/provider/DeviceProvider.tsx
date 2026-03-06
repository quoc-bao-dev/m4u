'use client'

import { useEffect } from 'react'
import { useDeviceStore } from '@/core/hooks/useDevice'

interface DeviceProviderProps {
  children: React.ReactNode
}

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const setDeviceInfo = useDeviceStore((state: any) => state.setDeviceInfo)

  useEffect(() => {
    // Function to update device info
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setDeviceInfo(width, height)
    }

    // Set initial device info
    updateDeviceInfo()

    // Add event listener for window resize
    window.addEventListener('resize', updateDeviceInfo)

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
    }
  }, [setDeviceInfo])

  return <>{children}</>
}
