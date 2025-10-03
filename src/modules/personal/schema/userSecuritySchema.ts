import { z } from 'zod'

// Schema for User Security Form
export const createUserSecuritySchema = (t: (key: string) => string) =>
  z
    .object({
      newPassword: z
        .string({
          message: t('personal.form.validation.newPasswordRequired'),
        })
        .min(8, {
          message: t('personal.form.validation.newPasswordMin'),
        }),
      confirmPassword: z
        .string({
          message: t('personal.form.validation.confirmPasswordRequired'),
        })
        .min(1, {
          message: t('personal.form.validation.confirmPasswordRequired'),
        }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('personal.form.validation.passwordsNotMatch'),
      path: ['confirmPassword'],
    })

// Type inference
export type UserSecurityFormData = z.infer<
  ReturnType<typeof createUserSecuritySchema>
>
