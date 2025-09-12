import { create } from 'zustand'
import { UserResponse } from '@/services/auth/type'

type UserType = UserResponse['info']

type AuthState = {
  user: UserType | null
  isAuthenticated: boolean
  setUser: (user: UserType) => void
  clearUser: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}))
