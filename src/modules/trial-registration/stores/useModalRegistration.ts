import { create } from 'zustand'

interface ModalRegistrationState {
  isOpen: boolean
  productId?: string | number
  productImage?: string
  productName?: string
  productBrand?: string
  productColor?: string
  setIsOpen: (open: boolean) => void
  open: (params?: {
    productId?: string | number
    productImage?: string
    productName?: string
    productBrand?: string
    productColor?: string
  }) => void
  close: () => void
}

const useModalRegistration = create<ModalRegistrationState>((set) => ({
  isOpen: false,
  productId: undefined,
  productImage: undefined,
  productName: undefined,
  productBrand: undefined,
  productColor: undefined,
  setIsOpen: (open) => set({ isOpen: open }),
  open: (params) =>
    set((state) => ({
      isOpen: true,
      productId: params?.productId ?? state.productId,
      productImage: params?.productImage ?? state.productImage,
      productName: params?.productName ?? state.productName,
      productBrand: params?.productBrand ?? state.productBrand,
      productColor: params?.productColor ?? state.productColor,
    })),
  close: () => set({ isOpen: false }),
}))

export default useModalRegistration
