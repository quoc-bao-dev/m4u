import { z } from 'zod'

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    phone: z.string().min(1, t('phoneRequired')),
    password: z.string().min(1, t('passwordRequired')),
    type_login: z.literal('password'),
  })

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>
