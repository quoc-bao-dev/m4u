import { create } from 'zustand'

interface FormData {
  fullName: string
  phoneNumber: string
  gender: 'female' | 'male' | 'other'
  dateOfBirth: string
  address: string
}

interface TrialOTPModalState {
  isOpen: boolean
  phone?: string
  length: number
  formData?: FormData
  productId?: string
  productImage?: string
  productName?: string
  productBrand?: string
  productColor?: string
  onConfirm?: (otp: string) => void
  open: (params?: {
    phone?: string
    length?: number
    formData?: FormData
    productId?: string
    productImage?: string
    productName?: string
    productBrand?: string
    productColor?: string
    onConfirm?: (otp: string) => void
  }) => void
  close: () => void
}

const useTrialOTPModal = create<TrialOTPModalState>((set) => ({
  isOpen: false,
  phone: undefined,
  length: 6,
  formData: undefined,
  productId: undefined,
  productImage: undefined,
  productName: undefined,
  productBrand: undefined,
  productColor: undefined,
  onConfirm: undefined,
  open: (params) =>
    set((state) => ({
      isOpen: true,
      phone: params?.phone ?? state.phone,
      length: params?.length ?? state.length,
      formData: params?.formData ?? state.formData,
      productId: params?.productId ?? state.productId,
      productImage: params?.productImage ?? state.productImage,
      productName: params?.productName ?? state.productName,
      productBrand: params?.productBrand ?? state.productBrand,
      productColor: params?.productColor ?? state.productColor,
      onConfirm: params?.onConfirm ?? state.onConfirm,
    })),
  close: () => set({ isOpen: false }),
}))

export default useTrialOTPModal
