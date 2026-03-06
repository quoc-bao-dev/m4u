// ===== GEOLOCATION CONFIGURATION =====
// File cấu hình cho tính năng phát hiện vị trí và chuyển ngôn ngữ

export type GeolocationMode = 'auto' | 'ui'

export interface AutoModeConfig {
  // Có hiển thị thông báo khi tự động redirect không
  showNotification: boolean
  // Thời gian hiển thị thông báo (ms)
  notificationDuration: number
  // Có fallback về browser language không
  useBrowserLanguageFallback: boolean
  // Có fallback về timezone không
  useTimezoneFallback: boolean
  // Có hiển thị loading state khi đang detect không
  showLoadingState: boolean
}

export interface UIModeConfig {
  // Có hiển thị permission dialog không
  showPermissionDialog: boolean
  // Có hiển thị language selector khi không detect được không
  showLanguageSelector: boolean
  // Có hiển thị loading state không
  showLoadingState: boolean
  // Có hiển thị error message không
  showErrorMessage: boolean
}

export interface GeolocationConfig {
  // Mode hoạt động: 'auto' hoặc 'ui'
  mode: GeolocationMode
  // Cấu hình cho auto mode
  autoMode: AutoModeConfig
  // Cấu hình cho UI mode
  uiMode: UIModeConfig
  // Có enable tính năng không
  enabled: boolean
  // Debug mode để log thông tin
  debug: boolean
}

// ===== DEFAULT CONFIGURATION =====
export const DEFAULT_GEOLOCATION_CONFIG: GeolocationConfig = {
  mode: 'auto', // Mặc định sử dụng auto mode
  enabled: true,
  debug: false,

  autoMode: {
    showNotification: false,
    notificationDuration: 3000,
    useBrowserLanguageFallback: true,
    useTimezoneFallback: true,
    showLoadingState: true,
  },

  uiMode: {
    showPermissionDialog: true,
    showLanguageSelector: true,
    showLoadingState: true,
    showErrorMessage: true,
  },
}

// ===== PRESET CONFIGURATIONS =====
// Cấu hình cho các trường hợp sử dụng khác nhau

// Cấu hình cho production - tự động, ít UI
export const PRODUCTION_CONFIG: GeolocationConfig = {
  ...DEFAULT_GEOLOCATION_CONFIG,
  mode: 'auto',
  autoMode: {
    showNotification: false,
    notificationDuration: 2000,
    useBrowserLanguageFallback: true,
    useTimezoneFallback: true,
    showLoadingState: false,
  },
}

// Cấu hình cho development - UI đầy đủ, debug
export const DEVELOPMENT_CONFIG: GeolocationConfig = {
  ...DEFAULT_GEOLOCATION_CONFIG,
  mode: 'ui',
  debug: true,
  uiMode: {
    showPermissionDialog: true,
    showLanguageSelector: true,
    showLoadingState: true,
    showErrorMessage: true,
  },
}

// Cấu hình cho mobile - tối ưu UX
export const MOBILE_CONFIG: GeolocationConfig = {
  ...DEFAULT_GEOLOCATION_CONFIG,
  mode: 'auto',
  autoMode: {
    showNotification: true,
    notificationDuration: 2000,
    useBrowserLanguageFallback: true,
    useTimezoneFallback: true,
    showLoadingState: true,
  },
}

// Cấu hình cho desktop - UI đầy đủ
export const DESKTOP_CONFIG: GeolocationConfig = {
  ...DEFAULT_GEOLOCATION_CONFIG,
  mode: 'ui',
  uiMode: {
    showPermissionDialog: true,
    showLanguageSelector: true,
    showLoadingState: true,
    showErrorMessage: true,
  },
}

// ===== HELPER FUNCTIONS =====
export function getConfigForEnvironment(): GeolocationConfig {
  if (typeof window === 'undefined') return DEFAULT_GEOLOCATION_CONFIG

  // Detect development
  const isDevelopment = process.env.NODE_ENV === 'development'

  if (isDevelopment) {
    return DEVELOPMENT_CONFIG
  }

  // Detect mobile
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  if (isMobile) {
    return MOBILE_CONFIG
  }

  return DESKTOP_CONFIG
}

export function getConfigForMode(mode: GeolocationMode): GeolocationConfig {
  return {
    ...DEFAULT_GEOLOCATION_CONFIG,
    mode,
  }
}
