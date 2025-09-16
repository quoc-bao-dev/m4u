'use client'

import { ModalClient } from '@/core/components'
import { sMenuSignal } from '@/core/components/layout/menu/sMenuSignal'
import Button from '@/core/components/ui/button'
import Input from '@/core/components/ui/input'
import PasswordInput from '@/core/components/ui/password-input'
import { useToast } from '@/core/hooks'
import { useLogin } from '@/services/auth/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { LoginFormData, loginSchema } from '../../schemas'
import useLoginModal from '../../stores/useLoginModal'
import { useTranslations } from 'next-intl'

const LoginModal = () => {
  const { isOpen, close } = useLoginModal()
  const loginMutation = useLogin()
  const { showError, showSuccess } = useToast()
  const t = useTranslations('auth')

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
      type_login: 'password',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data)

      // Check if result is false (API returned error)
      if (response && response.result === false) {
        showError(response.message || 'Login failed. Please try again.')
        return
      }

      // Login thành công, reset form và đóng modal
      showSuccess(t('loginSuccess'))
      reset()
      close()
      sMenuSignal.set('open')
    } catch (error: any) {
      // Extract error message from API response
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Login failed. Please try again.'
      showError(errorMessage)
      console.error('Login failed:', error)
    }
  }

  return (
    <ModalClient
      open={isOpen}
      onClose={close}
      showCloseButton={true}
      className="w-full mx-3 md:mx-0 md:w-[530px] h-fit md:h-auto rounded-4xl"
    >
      <div className="relative p-8 rounded-4xl overflow-hidden">
        <div className="absolute top-0 right-0">
          <img src="/image/trial/top-gradient.png" alt="decor" />
        </div>

        <div className="relative z-10">
          <h2 className="text-[28px] md:text-[40px] font-bold text-gray-900 mb-2">
            {t('signIn')}
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            {t('welcomeBack')}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('phoneNumber')}
                    placeholder={t('enterPhoneNumber')}
                    type="tel"
                    {...field}
                    error={errors.phone?.message}
                  />
                )}
              />
            </div>

            <div className="w-full">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    label={t('password')}
                    placeholder="••••••••"
                    {...field}
                    error={errors.password?.message}
                  />
                )}
              />
              <div className="mt-2 text-right">
                <button
                  type="button"
                  className="text-sm font-medium text-[#3B82F6] hover:underline"
                >
                  {t('forgotPassword')}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                size="sm"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? t('signingIn') : t('signIn')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ModalClient>
  )
}

export default LoginModal
