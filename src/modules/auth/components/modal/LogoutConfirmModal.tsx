'use client'
import { ModalClient } from '@/core/components'
import { envConfig } from '@/core/config'
import { useToast } from '@/core/hooks'
import { useAuth } from '@/modules/auth'
import useLogoutConfirmModal from '@/modules/auth/stores/useLogoutConfirmModal'
import { useLogout } from '@/services/auth/mutations'
import { tokenManager } from '@/core/http/axiosInstance'
import { useTranslations } from 'next-intl'

const LogoutConfirmModal = () => {
  const { isOpen, close } = useLogoutConfirmModal()
  const { clearUser } = useAuth()
  const { showSuccess } = useToast()
  const logoutMutation = useLogout()
  const t = useTranslations('auth')

  const handleConfirm = () => {
    const token = tokenManager.getAccessToken()

    if (token) {
      logoutMutation.mutate(token)
    }

    clearUser()
    showSuccess(t('logoutSuccess'))
    localStorage.removeItem(envConfig.accessTokenKey)
    close()
  }

  return (
    <ModalClient
      open={isOpen}
      onClose={close}
      showCloseButton={true}
      className="w-full mx-3 md:mx-0 md:w-[480px] h-fit md:h-auto rounded-4xl"
    >
      <div className="relative p-8 rounded-4xl overflow-hidden">
        <div className="absolute top-0 right-0">
          <img src="/image/trial/top-gradient.png" alt="decor" />
        </div>

        <div className="relative z-10">
          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-2">
            Confirm Logout
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Are you sure you want to log out of your account?
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={close}
              className="cursor-pointer flex-1 rounded-full border border-pink-500 text-pink-600 hover:bg-pink-50 px-4 py-2 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="cursor-pointer flex-1 rounded-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </ModalClient>
  )
}

export default LogoutConfirmModal
