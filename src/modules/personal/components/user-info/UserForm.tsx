'use client'

import { DatePicker, Input, RadioGroup } from '@/core/components/ui'
import Button from '@/core/components/ui/button'
import PasswordInput from '@/core/components/ui/password-input'
import { cn } from '@/core/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

// Form schema
const createUserFormSchema = (t: any) =>
  z
    .object({
      fullName: z.string().trim().min(2, t('user.form.validation.fullNameMin')),
      phoneNumber: z
        .string()
        .trim()
        .min(8, t('user.form.validation.phoneInvalid'))
        .max(15, t('user.form.validation.phoneInvalid')),
      gender: z.enum(['female', 'male', 'other'] as const, {
        message: t('user.form.validation.genderRequired'),
      }),
      dateOfBirth: z.string().min(1, t('user.form.validation.dobRequired')),
      address: z.string().trim().min(5, t('user.form.validation.addressMin')),
      oldPassword: z
        .string()
        .min(1, t('user.form.validation.oldPasswordRequired')),
      newPassword: z.string().min(8, t('user.form.validation.newPasswordMin')),
      confirmPassword: z
        .string()
        .min(1, t('user.form.validation.confirmPasswordRequired')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('user.form.validation.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    })

type UserFormData = z.infer<ReturnType<typeof createUserFormSchema>>

interface UserFormProps {
  onSubmit?: (data: UserFormData) => void
  initialData?: Partial<UserFormData>
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const t = useTranslations()
  const [activeSection, setActiveSection] = useState<'general' | 'security'>(
    'general'
  )
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const schema = createUserFormSchema(t)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: initialData?.fullName || 'Đỗ Thủy',
      phoneNumber: initialData?.phoneNumber || '0969-886-969',
      gender: initialData?.gender || 'female',
      dateOfBirth: initialData?.dateOfBirth || '2003-02-31',
      address:
        initialData?.address ||
        '69/88 Nguyen Thi Minh Khai, Sai Gon ward, Hochiminh City, Vietnam, 700000.',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmitForm = (data: UserFormData) => {
    onSubmit?.(data)
  }

  const genderOptions = [
    { value: 'female', label: t('user.form.fields.gender.options.female') },
    { value: 'male', label: t('user.form.fields.gender.options.male') },
    { value: 'other', label: t('user.form.fields.gender.options.other') },
  ]

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900">
          {t('user.form.sections.accountPreferences')}
        </h1>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveSection('general')}
          className={cn(
            'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
            activeSection === 'general'
              ? 'text-pink-600 border-pink-600 bg-pink-50'
              : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
          )}
        >
          {t('user.form.sections.general')}
        </button>
        <button
          onClick={() => setActiveSection('security')}
          className={cn(
            'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
            activeSection === 'security'
              ? 'text-pink-600 border-pink-600 bg-pink-50'
              : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
          )}
        >
          {t('user.form.sections.security')}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="p-6">
        {/* General Section */}
        {activeSection === 'general' && (
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
                  ĐT
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-pink-600 transition-colors"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
              <div className="flex-1">
                <button
                  type="button"
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                >
                  {t('user.form.buttons.updatePhoto')}
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  {t('user.form.helpers.photoRequirement')}
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('user.form.fields.fullName.label')}
                    placeholder={t('user.form.fields.fullName.placeholder')}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={errors.fullName?.message}
                    required
                  />
                )}
              />

              {/* Phone Number */}
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('user.form.fields.phoneNumber.label')}
                    placeholder={t('user.form.fields.phoneNumber.placeholder')}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={errors.phoneNumber?.message}
                    required
                  />
                )}
              />
            </div>

            {/* Gender */}
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  label={t('user.form.fields.gender.label')}
                  name="gender"
                  options={genderOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.gender?.message}
                  required
                />
              )}
            />

            {/* Date of Birth */}
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <DatePicker
                    label={t('user.form.fields.dateOfBirth.label')}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    error={errors.dateOfBirth?.message}
                    placeholder={t('user.form.fields.dateOfBirth.placeholder')}
                    required
                  />
                </div>
              )}
            />

            {/* Address */}
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('user.form.fields.address.label')}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={t('user.form.fields.address.placeholder')}
                    rows={3}
                    className={cn(
                      'w-full px-3 py-2.5 bg-white border border-gray-100 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors placeholder:text-gray-300 resize-none',
                      errors.address &&
                        'border-red-500 focus:ring-red-500 focus:border-red-500'
                    )}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-2.5 rounded-lg font-medium"
                disabled={!isDirty}
              >
                {t('user.form.buttons.saveChanges')}
              </Button>
            </div>
          </div>
        )}

        {/* Security Section */}
        {activeSection === 'security' && (
          <div className="space-y-6">
            {/* Old Password */}
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label={t('user.form.fields.oldPassword.label')}
                  placeholder={t('user.form.fields.oldPassword.placeholder')}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors.oldPassword?.message}
                  required
                />
              )}
            />

            {/* New Password */}
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label={t('user.form.fields.newPassword.label')}
                  placeholder={t('user.form.fields.newPassword.placeholder')}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors.newPassword?.message}
                  helperText={t('user.form.helpers.passwordRequirement')}
                  required
                />
              )}
            />

            {/* Confirm New Password */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label={t('user.form.fields.confirmPassword.label')}
                  placeholder={t(
                    'user.form.fields.confirmPassword.placeholder'
                  )}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors.confirmPassword?.message}
                  required
                />
              )}
            />

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-2.5 rounded-lg font-medium"
                disabled={!isDirty}
              >
                {t('user.form.buttons.saveChanges')}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default UserForm
