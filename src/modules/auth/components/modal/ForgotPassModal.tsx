'use client'

import { ModalClient } from '@/core/components'
import { sMenuSignal } from '@/core/components/layout/menu/sMenuSignal'
import Button from '@/core/components/ui/button'
import PasswordInput from '@/core/components/ui/password-input'
import { useToast } from '@/core/hooks'
import { useLogin, useSaveNewPassword } from '@/services/auth/mutations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useForgotPass } from '../../stores/useForgotPass'

const createSchema = (mismatchMessage: string) =>
  z
    .object({
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: mismatchMessage,
      path: ['confirmPassword'],
    })

type FormData = { password: string; confirmPassword: string }

const ForgotPassModal = () => {
  const t = useTranslations('auth')
  const { isResetOpen, phone, otp, resetAll } = useForgotPass()
  const { showError, showSuccess } = useToast()
  const saveNewPassword = useSaveNewPassword()
  const loginMutation = useLogin()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createSchema(t('forgot.reset.passwordsNotMatch'))),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await saveNewPassword.mutateAsync({
        phone,
        key_code: otp,
        password: data.password,
      })

      if (!response?.result) {
        showError(response?.message || t('forgot.reset.saveFailed'))
        return
      }

      // Đổi mật khẩu thành công -> tự động đăng nhập lại
      const loginRes = await loginMutation.mutateAsync({
        phone,
        password: data.password,
        type_login: 'password',
      })
      sMenuSignal.set('open')

      if (!loginRes?.result) {
        showError(loginRes?.message || t('forgot.reset.loginFailed'))
        return
      }

      reset()
      showSuccess(t('forgot.reset.success'))
      resetAll()
    } catch (error: any) {
      showError(
        error?.response?.data?.message || 'Đổi mật khẩu thất bại. Thử lại.'
      )
    }
  }

  const handleClose = () => {
    reset()
    resetAll()
  }

  return (
    <ModalClient
      open={isResetOpen}
      onClose={handleClose}
      showCloseButton={true}
      className="w-full mx-3 md:mx-0 md:w-[530px] h-fit md:h-auto rounded-4xl"
    >
      <div className="relative p-8 rounded-4xl overflow-hidden">
        <div className="absolute top-0 right-0">
          <img src="/image/trial/top-gradient.png" alt="decor" />
        </div>

        <div className="relative z-10">
          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-2">
            {t('forgot.reset.title')}
          </h2>
          <p className="text-sm text-gray-600 mb-6">{t('forgot.reset.desc')}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="w-full">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    label={t('forgot.reset.newPassword')}
                    placeholder="••••••••"
                    {...field}
                    error={errors.password?.message}
                  />
                )}
              />
            </div>

            <div className="w-full">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    label={t('forgot.reset.confirmPassword')}
                    placeholder="••••••••"
                    {...field}
                    error={errors.confirmPassword?.message}
                  />
                )}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                size="sm"
                className="w-full"
                disabled={saveNewPassword.isPending}
              >
                {saveNewPassword.isPending
                  ? t('forgot.reset.submitting')
                  : t('forgot.reset.submit')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ModalClient>
  )
}

export default ForgotPassModal
