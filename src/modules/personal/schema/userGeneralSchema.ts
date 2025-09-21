import { z } from 'zod'

// Schema for User General Form
export const createUserGeneralSchema = (t: (key: string) => string) =>
  z.object({
    fullName: z
      .string()
      .trim()
      .min(2, t('personal.form.validation.fullNameMin')),
    phoneNumber: z
      .string()
      .trim()
      .min(8, t('personal.form.validation.phoneInvalid'))
      .max(15, t('personal.form.validation.phoneInvalid')),
    gender: z.enum(['female', 'male', 'other'] as const, {
      message: t('personal.form.validation.genderRequired'),
    }),
    dateOfBirth: z.string().min(1, t('personal.form.validation.dobRequired')),
    address: z.string().trim().min(5, t('personal.form.validation.addressMin')),
  })

// Type inference
export type UserGeneralFormData = z.infer<
  ReturnType<typeof createUserGeneralSchema>
>
