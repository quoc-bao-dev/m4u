import { z } from 'zod'

export const loginSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  password: z.string().min(1, 'Password is required'),
  type_login: z.literal('password'),
})

export type LoginFormData = z.infer<typeof loginSchema>
