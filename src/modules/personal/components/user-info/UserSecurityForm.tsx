'use client'

import { PasswordInput } from '@/core/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Controller, useForm } from 'react-hook-form'
import {
  createUserSecuritySchema,
  type UserSecurityFormData,
} from '../../schema'
import { useUpdatePassword } from '@/services/user'
import { useToast } from '@/core/hooks/useToast'
import { tokenManager } from '@/core/http/axiosInstance'
import { Info } from '@phosphor-icons/react'

const UserSecurityForm = () => {
  const t = useTranslations()
  const schema = createUserSecuritySchema(t)
  const updatePasswordMutation = useUpdatePassword()
  const { showSuccess, showError } = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<UserSecurityFormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const formValues = watch()

  const onSubmit = async (data: UserSecurityFormData) => {
    const token = tokenManager.getAccessToken()

    if (!token) {
      showError(t('personal.form.errors.noToken'))
      return
    }

    try {
      const response = await updatePasswordMutation.mutateAsync({
        token,
        password_old: data.oldPassword,
        password: data.newPassword,
      })

      // Check API response
      if (response?.data?.result === true) {
        showSuccess(t('personal.form.success.updatePassword'))
        // Reset form after successful password change
        reset()
      } else {
        showError(
          response?.data?.message ||
            t('personal.form.errors.updatePasswordFailed')
        )
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t('personal.form.errors.updatePasswordFailed')
      showError(errorMessage)
      console.error('Update password failed:', error)
    }
  }

  // Check if all required fields have values
  const hasAllRequiredValues =
    formValues.oldPassword?.trim() &&
    formValues.newPassword?.trim() &&
    formValues.confirmPassword?.trim()

  const doPasswordsMatch =
    formValues.newPassword === formValues.confirmPassword &&
    formValues.confirmPassword.length > 0

  const isFormValid = isValid && hasAllRequiredValues

  return (
    <div className="w-full px-1">
      {/* Header with tag line */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-[12px] h-[32px] bg-pink-500 rounded"></div>
        <h2 className="text-xl text-gray-900 font-semibold">
          {t('personal.form.security.title')}
        </h2>
      </div>

      {/* Separator line */}
      <div className="w-full h-px bg-gray-200 mb-8"></div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Old Password */}
        <Controller
          name="oldPassword"
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <PasswordInput
                label={t('personal.form.fields.oldPassword.label')}
                placeholder={t('personal.form.fields.oldPassword.placeholder')}
                value={field.value}
                onChange={field.onChange}
                required
                error={errors.oldPassword?.message}
              />
            </div>
          )}
        />

        {/* New Password */}
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <PasswordInput
                label={t('personal.form.fields.newPassword.label')}
                placeholder={t('personal.form.fields.newPassword.placeholder')}
                value={field.value}
                onChange={field.onChange}
                required
                error={errors.newPassword?.message}
              />
              <p className="pt-1 text-xs text-gray-400 flex gap-1">
                <Info size={16} />{' '}
                {t('personal.form.fields.newPassword.helperText')}
              </p>
            </div>
          )}
        />

        {/* Confirm New Password */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <PasswordInput
                label={t('personal.form.fields.confirmPassword.label')}
                placeholder={t(
                  'personal.form.fields.confirmPassword.placeholder'
                )}
                value={field.value}
                onChange={field.onChange}
                required
                error={errors.confirmPassword?.message}
              />
            </div>
          )}
        />

        {/* Submit button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={!isFormValid || updatePasswordMutation.isPending}
            className="px-8 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
          >
            {updatePasswordMutation.isPending
              ? t('personal.form.submit.saving')
              : t('personal.form.submit.saveChanges')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserSecurityForm
