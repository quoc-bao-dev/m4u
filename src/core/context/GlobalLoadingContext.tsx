'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface GlobalLoadingContextType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
  withLoading: <T>(asyncFn: () => Promise<T>) => Promise<T>
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined)

interface GlobalLoadingProviderProps {
  children: ReactNode
}

export const GlobalLoadingProvider: React.FC<GlobalLoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = useCallback(() => {
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  const withLoading = useCallback(async <T,>(asyncFn: () => Promise<T>): Promise<T> => {
    try {
      startLoading()
      const result = await asyncFn()
      return result
    } finally {
      stopLoading()
    }
  }, [startLoading, stopLoading])

  const value: GlobalLoadingContextType = {
    isLoading,
    startLoading,
    stopLoading,
    withLoading
  }

  return (
    <GlobalLoadingContext.Provider value={value}>
      {children}
    </GlobalLoadingContext.Provider>
  )
}

export const useGlobalLoading = (): GlobalLoadingContextType => {
  const context = useContext(GlobalLoadingContext)
  if (context === undefined) {
    throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider')
  }
  return context
}
