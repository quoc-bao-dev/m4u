# Hướng dẫn Cấu hình GeoLocation Detection

## 🎯 Tổng quan

Tính năng GeoLocation Detection hỗ trợ 2 mode hoạt động:

1. **`auto`** - Tự động redirect sử dụng mặc định trình duyệt, chỉ hỏi quyền nếu cần
2. **`ui`** - Sử dụng UI flow với permission dialog và language selector

## ⚙️ Cấu hình

### 1. Cấu hình cơ bản

Trong file `src/core/components/GeoLocationDetector.tsx`:

```typescript
// ===== CONFIGURATION =====
// Chọn cách lấy config:

// Option 1: Tự động detect theo environment (khuyến nghị)
const config: GeolocationConfig = getConfigForEnvironment()

// Option 2: Chọn mode cụ thể
// const config: GeolocationConfig = getConfigForMode('auto') // hoặc 'ui'

// Option 3: Config tùy chỉnh
// const config: GeolocationConfig = {
//   ...DEFAULT_GEOLOCATION_CONFIG,
//   mode: 'auto',
//   autoMode: {
//     showNotification: true,
//     notificationDuration: 2000,
//     useBrowserLanguageFallback: true,
//     useTimezoneFallback: true,
//     showLoadingState: false,
//   }
// }
```

### 2. Preset Configurations

#### Production Config (Tự động, ít UI)

```typescript
import { PRODUCTION_CONFIG } from '@/core/config/geolocation.config'

const config = PRODUCTION_CONFIG
```

#### Development Config (UI đầy đủ, debug)

```typescript
import { DEVELOPMENT_CONFIG } from '@/core/config/geolocation.config'

const config = DEVELOPMENT_CONFIG
```

#### Mobile Config (Tối ưu UX)

```typescript
import { MOBILE_CONFIG } from '@/core/config/geolocation.config'

const config = MOBILE_CONFIG
```

#### Desktop Config (UI đầy đủ)

```typescript
import { DESKTOP_CONFIG } from '@/core/config/geolocation.config'

const config = DESKTOP_CONFIG
```

## 🔧 Chi tiết cấu hình

### Auto Mode Config

```typescript
const autoModeConfig = {
  // Có hiển thị thông báo khi tự động redirect không
  showNotification: true,
  // Thời gian hiển thị thông báo (ms)
  notificationDuration: 3000,
  // Có fallback về browser language không
  useBrowserLanguageFallback: true,
  // Có fallback về timezone không
  useTimezoneFallback: true,
  // Có hiển thị loading state khi đang detect không
  showLoadingState: true,
}
```

### UI Mode Config

```typescript
const uiModeConfig = {
  // Có hiển thị permission dialog không
  showPermissionDialog: true,
  // Có hiển thị language selector khi không detect được không
  showLanguageSelector: true,
  // Có hiển thị loading state không
  showLoadingState: true,
  // Có hiển thị error message không
  showErrorMessage: true,
}
```

## 📱 Các trường hợp sử dụng

### 1. Production Website

```typescript
// Tự động, ít UI, không notification
const config = {
  mode: 'auto',
  autoMode: {
    showNotification: false,
    useBrowserLanguageFallback: true,
    useTimezoneFallback: true,
    showLoadingState: false,
  },
}
```

### 2. Development/Testing

```typescript
// UI đầy đủ, debug mode
const config = {
  mode: 'ui',
  debug: true,
  uiMode: {
    showPermissionDialog: true,
    showLanguageSelector: true,
    showLoadingState: true,
    showErrorMessage: true,
  },
}
```

### 3. Mobile App

```typescript
// Tự động với notification ngắn
const config = {
  mode: 'auto',
  autoMode: {
    showNotification: true,
    notificationDuration: 2000,
    useBrowserLanguageFallback: true,
    useTimezoneFallback: true,
    showLoadingState: true,
  },
}
```

### 4. Desktop App

```typescript
// UI đầy đủ cho desktop
const config = {
  mode: 'ui',
  uiMode: {
    showPermissionDialog: true,
    showLanguageSelector: true,
    showLoadingState: true,
    showErrorMessage: true,
  },
}
```

## 🚀 Cách sử dụng

### 1. Sử dụng preset config

```typescript
import { getConfigForEnvironment } from '@/core/config/geolocation.config'

// Tự động detect theo environment
const config = getConfigForEnvironment()
```

### 2. Tùy chỉnh config

```typescript
import { DEFAULT_GEOLOCATION_CONFIG } from '@/core/config/geolocation.config'

const config = {
  ...DEFAULT_GEOLOCATION_CONFIG,
  mode: 'auto',
  autoMode: {
    ...DEFAULT_GEOLOCATION_CONFIG.autoMode,
    showNotification: false,
    notificationDuration: 1000,
  },
}
```

### 3. Disable tính năng

```typescript
const config = {
  ...DEFAULT_GEOLOCATION_CONFIG,
  enabled: false, // Tắt tính năng
}
```

## 🔍 Debug

### Enable debug mode

```typescript
const config = {
  ...DEFAULT_GEOLOCATION_CONFIG,
  debug: true, // Hiển thị log trong console
}
```

### Debug logs

Khi `debug: true`, bạn sẽ thấy logs như:

```
GeoLocationDetector: Starting detection with config: {...}
Auto detection failed, using fallback
```

## 📋 Checklist

- [ ] Chọn mode phù hợp (`auto` hoặc `ui`)
- [ ] Cấu hình notification (nếu cần)
- [ ] Cấu hình fallback mechanisms
- [ ] Test trên các device khác nhau
- [ ] Kiểm tra performance
- [ ] Test với các ngôn ngữ khác nhau

## 🐛 Troubleshooting

### Vấn đề thường gặp:

1. **Không hiển thị permission dialog**

   - Kiểm tra `config.uiMode.showPermissionDialog`
   - Kiểm tra `config.enabled`

2. **Tự động redirect không hoạt động**

   - Kiểm tra `config.mode` có phải `'auto'` không
   - Kiểm tra `config.autoMode` settings

3. **Notification không hiển thị**

   - Kiểm tra `config.autoMode.showNotification`
   - Kiểm tra `config.autoMode.notificationDuration`

4. **Debug logs không hiển thị**
   - Kiểm tra `config.debug: true`
   - Mở Developer Console
