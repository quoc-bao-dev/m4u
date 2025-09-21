'use client'

import { DatePicker, Input, RadioGroup } from '@/core/components/ui'
import { useToast } from '@/core/hooks/useToast'
import { tokenManager } from '@/core/http/axiosInstance'
import { useAuth } from '@/modules/auth'
import { useUpdateAccount } from '@/services/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createUserGeneralSchema, type UserGeneralFormData } from '../../schema'
import { CameraPlus } from '@phosphor-icons/react'

const UserGeneralForm = () => {
  const t = useTranslations()
  const schema = createUserGeneralSchema(t)
  const updateAccountMutation = useUpdateAccount()
  const { showSuccess, showError } = useToast()
  const { user } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<UserGeneralFormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      gender: 'female',
      dateOfBirth: '',
      address: '',
    },
  })

  // Update form when user data is available
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullname || '',
        phoneNumber: user.phone || '',
        gender: (user.gender === 1
          ? 'male'
          : user.gender === 2
          ? 'female'
          : 'other') as 'female' | 'male' | 'other',
        dateOfBirth: user.birthday || '',
        address: user.address || '',
      })
    }
  }, [user, reset])

  const onSubmit = async (data: UserGeneralFormData) => {
    const token = tokenManager.getAccessToken()

    if (!token) {
      showError(t('personal.form.errors.noToken'))
      return
    }

    // Map gender from string to number
    const getGenderNumber = (gender: string): number => {
      switch (gender) {
        case 'male':
          return 1
        case 'female':
          return 2
        case 'other':
          return 3
        default:
          return 2
      }
    }

    try {
      const response = await updateAccountMutation.mutateAsync({
        token,
        fullname: data.fullName,
        gender: getGenderNumber(data.gender).toString(),
        address: data.address,
        phone: data.phoneNumber,
        birthday: data.dateOfBirth,
      })

      // Check API response
      if (response?.data?.result === true) {
        showSuccess(t('personal.form.success.updateAccount'))
      } else {
        showError(
          response?.data?.message || t('personal.form.errors.updateFailed')
        )
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t('personal.form.errors.updateFailed')
      showError(errorMessage)
      console.error('Update account failed:', error)
    }
  }

  // Check if all required fields have values
  const formValues = watch()
  const hasAllRequiredValues =
    formValues.fullName?.trim() &&
    formValues.phoneNumber?.trim() &&
    formValues.gender &&
    formValues.dateOfBirth?.trim() &&
    formValues.address?.trim()

  const isFormValid = isValid && hasAllRequiredValues

  return (
    <div className="w-full">
      {/* Header with tag line */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-[12px] h-[32px] bg-pink-500 rounded"></div>
        <h2 className="text-xl text-gray-900 font-semibold">
          {t('personal.form.general.title')}
        </h2>
      </div>

      {/* Separator line */}
      <div className="w-full h-px bg-gray-200 mb-8"></div>

      {/* Main form content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Avatar Column */}
        <div className="flex flex-col items-center lg:items-start">
          {/* Avatar upload area */}
          <div className="relative w-36 h-36 border-2 border-dashed border-gray-200 rounded-full flex items-center justify-center mb-3 cursor-pointer hover:border-gray-300 transition-colors">
            <div className="w-32 h-32 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden">
              <div className="flex items-center flex-col gap-2">
                <CameraPlus size={28} className="text-white" />
                <span className="text-white text-xs font-medium">
                  {t('personal.form.general.updatePhoto')}
                </span>
              </div>
            </div>
          </div>

          {/* Upload note */}
          <p className="text-xs text-gray-400 text-center max-w-32">
            {t('personal.form.general.uploadNote')}
            <br />
            {t('personal.form.general.uploadSize')}
          </p>
        </div>

        {/* Form Column */}
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First row - 2 columns on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4">
                {/* Full Name */}
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <div className="w-full">
                      <Input
                        label={t('personal.form.fields.fullName.label')}
                        placeholder={t(
                          'personal.form.fields.fullName.placeholder'
                        )}
                        value={field.value}
                        onChange={field.onChange}
                        required
                        error={errors.fullName?.message}
                      />
                    </div>
                  )}
                />

                {/* Phone Number - Mobile only */}
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <div className="lg:hidden w-full">
                      <Input
                        label={t('personal.form.fields.phoneNumber.label')}
                        type="tel"
                        placeholder={t(
                          'personal.form.fields.phoneNumber.placeholder'
                        )}
                        value={field.value}
                        onChange={field.onChange}
                        required
                        error={errors.phoneNumber?.message}
                      />
                    </div>
                  )}
                />

                {/* Gender */}
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <div className="w-full">
                      <RadioGroup
                        label={t('personal.form.fields.gender.label')}
                        name="gender"
                        value={field.value}
                        onChange={field.onChange}
                        options={[
                          {
                            value: 'female',
                            label: t(
                              'personal.form.fields.gender.options.female'
                            ),
                          },
                          {
                            value: 'male',
                            label: t(
                              'personal.form.fields.gender.options.male'
                            ),
                          },
                          {
                            value: 'other',
                            label: t(
                              'personal.form.fields.gender.options.other'
                            ),
                          },
                        ]}
                        required
                      />
                      {errors.gender && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* D.O.B - Mobile only */}
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <div className="lg:hidden w-full">
                      <DatePicker
                        label={t('personal.form.fields.dateOfBirth.label')}
                        value={field.value}
                        onChange={field.onChange}
                        required
                        placeholder={t(
                          'personal.form.fields.dateOfBirth.placeholder'
                        )}
                      />
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.dateOfBirth.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Right column - Desktop only */}
              <div className="hidden lg:block space-y-4">
                {/* Phone Number */}
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <div className="w-full">
                      <Input
                        label={t('personal.form.fields.phoneNumber.label')}
                        type="tel"
                        placeholder={t(
                          'personal.form.fields.phoneNumber.placeholder'
                        )}
                        value={field.value}
                        onChange={field.onChange}
                        required
                        error={errors.phoneNumber?.message}
                      />
                    </div>
                  )}
                />

                {/* D.O.B */}
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <div className="w-full">
                      <DatePicker
                        label={t('personal.form.fields.dateOfBirth.label')}
                        value={field.value}
                        onChange={field.onChange}
                        required
                        placeholder={t(
                          'personal.form.fields.dateOfBirth.placeholder'
                        )}
                      />
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.dateOfBirth.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Address - Full width */}
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <Input
                    label={t('personal.form.fields.address.label')}
                    placeholder={t('personal.form.fields.address.placeholder')}
                    value={field.value}
                    onChange={field.onChange}
                    required
                    error={errors.address?.message}
                  />
                </div>
              )}
            />

            {/* Submit button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={!isFormValid || updateAccountMutation.isPending}
                className="px-8 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
              >
                {updateAccountMutation.isPending
                  ? t('personal.form.submit.saving')
                  : t('personal.form.submit.saveChanges')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserGeneralForm
