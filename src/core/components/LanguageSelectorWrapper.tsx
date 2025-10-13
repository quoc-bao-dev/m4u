'use client'

import LanguageSelector from './LanguageSelector'
import { useLanguageSelector } from '@/core/hooks/useLanguageSelector'

export default function LanguageSelectorWrapper() {
  const {
    isOpen,
    isInitialized,
    handleClose,
    handleLanguageSelect,
    handleSkip,
  } = useLanguageSelector()

  if (!isInitialized) {
    return null
  }

  return (
    <LanguageSelector
      isOpen={isOpen}
      onClose={handleClose}
      onLanguageSelect={handleLanguageSelect}
      onSkip={handleSkip}
    />
  )
}
