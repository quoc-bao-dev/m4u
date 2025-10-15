import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { envConfig } from '../config'
import { locales, defaultLocale } from '@/locale/config'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

// Token management utilities
export const tokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ACCESS_TOKEN_KEY)
    }
    return null
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_TOKEN_KEY)
    }
    return null
  },

  setTokens: (accessToken: string, refreshToken?: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      }
    }
  },

  clearTokens: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
  },
}

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: envConfig.adminUrl,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getAccessToken()

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Attach _locale from current URL prefix if available
    const detectLocaleFromPath = (): string | null => {
      if (typeof window === 'undefined') return null
      const firstSegment = window.location.pathname.split('/')[1]
      // locales is readonly tuple; cast to array of string for includes
      const supportedLocales = [...locales] as string[]
      return supportedLocales.includes(firstSegment) ? firstSegment : null
    }

    const detectedLocale = detectLocaleFromPath() || defaultLocale
    const hasLocaleParam = (config.params as any)?.hasOwnProperty?.('_locale')
    config.params = {
      ...config.params,
      // do not overwrite if caller already provided _locale
      ...(!hasLocaleParam ? { _locale: detectedLocale } : {}),
    }

    // Add timestamp to prevent caching
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = tokenManager.getRefreshToken()

      if (refreshToken) {
        try {
          // Attempt to refresh token
          const response = await axios.post(
            `${envConfig.adminUrl}/auth/refresh`,
            {
              refreshToken,
            }
          )

          const { accessToken, refreshToken: newRefreshToken } = response.data
          tokenManager.setTokens(accessToken, newRefreshToken)

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
          }

          return axiosInstance(originalRequest)
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          tokenManager.clearTokens()
          if (typeof window !== 'undefined') {
            // window.location.href = '/login'
          }
          return Promise.reject(refreshError)
        }
      } else {
        // No refresh token, redirect to login
        tokenManager.clearTokens()
        if (typeof window !== 'undefined') {
          //   window.location.href = '/login'
        }
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
