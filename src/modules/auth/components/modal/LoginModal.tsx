'use client'

import { ModalClient } from '@/core/components'
import { sMenuSignal } from '@/core/components/layout/menu/sMenuSignal'
import Button from '@/core/components/ui/button'
import Checkbox from '@/core/components/ui/checkbox'
import Input from '@/core/components/ui/input'
import PasswordInput from '@/core/components/ui/password-input'
import { useToast } from '@/core/hooks'
import { useLogin, useSendOTPForgotPassword } from '@/services/auth/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LoginFormData, createLoginSchema } from '../../schemas'
import { useForgotPass } from '../../stores/useForgotPass'
import useLoginModal from '../../stores/useLoginModal'

const LoginModal = () => {
  const { isOpen, close } = useLoginModal()
  const loginMutation = useLogin()
  const sendOTPMutation = useSendOTPForgotPassword()
  const { showError, showSuccess } = useToast()
  const t = useTranslations('auth')
  const { open } = useForgotPass()
  const [rememberAccount, setRememberAccount] = useState(true)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(createLoginSchema(t)),
    defaultValues: {
      phone: '',
      password: '',
      type_login: 'password',
    },
  })

  // Load saved account and checkbox state from localStorage on mount and when modal opens
  useEffect(() => {
    if (!isOpen) return // Only run when modal is open

    const savedPhone = localStorage.getItem('m4u_saved_phone')
    const savedPassword = localStorage.getItem('m4u_saved_password')
    const rememberState =
      localStorage.getItem('m4u_remember_account') === 'true'

    // Always restore checkbox state from localStorage
    setRememberAccount(rememberState)

    // Only fill form if remember is enabled and data exists
    if (rememberState && savedPhone && savedPassword) {
      setValue('phone', savedPhone)
      setValue('password', savedPassword)
    } else {
      // Reset form if remember is disabled or no saved data
      setValue('phone', '')
      setValue('password', '')
    }
  }, [setValue, isOpen])

  // Handle checkbox change and immediately save state to localStorage
  const handleRememberAccountChange = (checked: boolean) => {
    setRememberAccount(checked)
    localStorage.setItem('m4u_remember_account', checked.toString())

    if (checked) {
      // If checked, try to fill form with saved data if available
      const savedPhone = localStorage.getItem('m4u_saved_phone')
      const savedPassword = localStorage.getItem('m4u_saved_password')

      if (savedPhone && savedPassword) {
        setValue('phone', savedPhone)
        setValue('password', savedPassword)
      }
    } else {
      // If unchecked, immediately remove saved credentials and clear form
      localStorage.removeItem('m4u_saved_phone')
      localStorage.removeItem('m4u_saved_password')
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data)

      // Check if result is false (API returned error)
      if (response && response.result === false) {
        showError(response.message || 'Login failed. Please try again.')
        return
      }

      // Login thành công, cập nhật credentials nếu remember account được tích
      if (rememberAccount) {
        localStorage.setItem('m4u_saved_phone', data.phone)
        localStorage.setItem('m4u_saved_password', data.password)
      }

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

  const handleForgotPassword = async () => {
    const phoneValue = control._formValues?.phone || ''

    if (!phoneValue) {
      showError(t('forgot.enterPhoneFirst'))
      return
    }

    try {
      const response = await sendOTPMutation.mutateAsync({ phone: phoneValue })

      // Check if result is false (API returned error)
      if (response && response.result === false) {
        showError(response.message || t('forgot.otp.sendFailed'))
        return
      }

      // Nếu thành công, mở modal OTP và set phone vào store
      open(phoneValue)
      close()
      reset()
      showSuccess(t('forgot.otp.sendSuccess'))
    } catch (error: any) {
      // Log chi tiết lỗi từ BE
      console.error('Send OTP error:', error)
      console.error('Error response:', error?.response?.data)

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t('forgot.otp.sendFailed')
      showError(errorMessage)
    }
  }

  const handleClose = () => {
    // Reset form when closing modal to ensure clean state next time
    reset()
    close()
  }

  return (
    <ModalClient
      open={isOpen}
      onClose={handleClose}
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
          <p className="text-sm text-gray-600 mb-8">{t('welcomeBack')}</p>

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
              <div className="mt-2 flex justify-between items-center">
                <Checkbox
                  checked={rememberAccount}
                  onChange={handleRememberAccountChange}
                  label={t('rememberAccount')}
                />
                <button
                  type="button"
                  className="text-sm font-medium text-[#3B82F6] hover:underline"
                  onClick={handleForgotPassword}
                  disabled={sendOTPMutation.isPending}
                >
                  {sendOTPMutation.isPending
                    ? t('forgot.otp.sending')
                    : t('forgotPassword')}
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
