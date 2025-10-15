'use client'

import { create } from 'zustand'

type OpenParams = {
  imageSrc: string
  onConfirm: (blob: Blob) => Promise<void> | void
}

interface AvatarCropperState {
  isOpen: boolean
  imageSrc: string | null
  onConfirm?: (blob: Blob) => Promise<void> | void
  open: (params: OpenParams) => void
  close: () => void
}

const useAvatarCropper = create<AvatarCropperState>((set) => ({
  isOpen: false,
  imageSrc: null,
  onConfirm: undefined,
  open: ({ imageSrc, onConfirm }) => set({ isOpen: true, imageSrc, onConfirm }),
  close: () => set({ isOpen: false, imageSrc: null, onConfirm: undefined }),
}))

export default useAvatarCropper
