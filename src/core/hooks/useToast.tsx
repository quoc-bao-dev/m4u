import toast from 'react-hot-toast'
import { BellRinging } from '@phosphor-icons/react'

export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message)
  }

  const showError = (message: string) => {
    toast.error(message)
  }

  const showLoading = (message: string) => {
    return toast.loading(message)
  }

  const showInfo = (message: string) => {
    toast(message, {
      icon: (
        <div className="w-[30px]">
          <BellRinging size={28} className="text-blue-500" />
        </div>
      ),
      className: 'border border-blue-500 bg-blue-50/30',
    })
  }

  const dismiss = (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId)
    } else {
      toast.dismiss()
    }
  }

  const dismissAll = () => {
    toast.dismiss()
  }

  return {
    showSuccess,
    showError,
    showLoading,
    showInfo,
    dismiss,
    dismissAll,
  }
}
