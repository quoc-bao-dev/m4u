# Tính năng Phát hiện Vị trí và Tự động Chuyển Ngôn ngữ

## Tổng quan

Tính năng này tự động phát hiện vị trí địa lý của người dùng và chuyển hướng đến ngôn ngữ phù hợp. Hệ thống sử dụng:

- **Browser Geolocation API** để lấy tọa độ GPS
- **OpenStreetMap Nominatim API** (miễn phí) để reverse geocoding
- **Fallback mechanisms** dựa trên browser language và timezone

## Các thành phần chính

### 1. `GeoLocationDetector.tsx`

Component chính xử lý logic phát hiện vị trí và chuyển hướng.

### 2. `useGeoLocation.ts`

Custom hook chứa logic phát hiện vị trí và mapping quốc gia -> ngôn ngữ.

### 3. `GeoLocationPermission.tsx`

Dialog xin phép người dùng cho phép truy cập vị trí.

### 4. `LanguageSelector.tsx`

Component cho phép người dùng chọn ngôn ngữ thủ công.

## Mapping Quốc gia -> Ngôn ngữ

```typescript
const countryToLocaleMap = {
  VN: 'vi', // Vietnam -> Tiếng Việt
  KR: 'kr', // Korea -> 한국어
  TH: 'th', // Thailand -> ไทย
  CN: 'cn', // China -> 中文
}
```

## Fallback Mechanisms

1. **Browser Language**: Kiểm tra `navigator.language`
2. **Timezone**: Sử dụng `Intl.DateTimeFormat().resolvedOptions().timeZone`
3. **Default**: Chuyển về ngôn ngữ mặc định (vi)

## Cách hoạt động

1. **Kiểm tra điều kiện**: Chỉ chạy khi chưa có locale trong URL và localStorage
2. **Xin phép**: Hiển thị dialog xin phép truy cập vị trí
3. **Phát hiện vị trí**: Sử dụng Geolocation API
4. **Reverse Geocoding**: Chuyển đổi tọa độ thành thông tin quốc gia
5. **Mapping**: Chuyển đổi quốc gia thành ngôn ngữ
6. **Redirect**: Chuyển hướng đến URL với locale phù hợp
7. **Lưu trữ**: Lưu preference vào localStorage

## ⚠️ Cập nhật Logic (Không tự động chuyển về 'vi')

### Vấn đề đã sửa:

- **Trước**: Component tự động chuyển về locale `vi` mặc định
- **Sau**: Chỉ chuyển hướng khi detect được locale phù hợp hoặc người dùng chọn

### Logic mới:

1. **Cho phép vị trí**: Detect → Redirect đến locale phù hợp
2. **Từ chối vị trí**: Fallback browser language → Nếu không có → Hiển thị language selector
3. **Bỏ qua**: Hiển thị language selector thay vì tự động chuyển về `vi`
4. **Không chọn ngôn ngữ**: Mới chuyển về `vi` mặc định

## Tích hợp

Component được tích hợp vào `src/app/[locale]/layout.tsx`:

```tsx
<GeoLocationDetector />
```

## Privacy & Security

- **Không lưu trữ vị trí**: Chỉ sử dụng để xác định ngôn ngữ
- **LocalStorage**: Chỉ lưu preference ngôn ngữ, không lưu vị trí
- **User Control**: Người dùng có thể từ chối hoặc chọn ngôn ngữ thủ công

## API Dependencies

- **OpenStreetMap Nominatim**: Miễn phí, không cần API key
- **Browser Geolocation**: Native browser API
- **Không cần Google Maps API**: Sử dụng OpenStreetMap thay thế

## Testing

Để test tính năng:

1. Xóa localStorage: `localStorage.clear()`
2. Truy cập root URL: `/`
3. Cho phép/từ chối truy cập vị trí
4. Kiểm tra redirect đến locale phù hợp

## Troubleshooting

### Lỗi thường gặp:

1. **"Geolocation is not supported"**: Browser không hỗ trợ
2. **"User denied geolocation permission"**: Người dùng từ chối
3. **"Location information unavailable"**: Không thể lấy vị trí
4. **"Geocoding API request failed"**: Lỗi API reverse geocoding

### Giải pháp:

- Fallback về browser language/timezone
- Cho phép người dùng chọn ngôn ngữ thủ công
- Sử dụng default locale

## Customization

### Thêm quốc gia mới:

```typescript
// Trong useGeoLocation.ts
const countryToLocaleMap = {
  // ... existing mappings
  JP: 'en', // Japan -> English (hoặc tạo locale mới)
}
```

### Thay đổi fallback logic:

```typescript
const getFallbackLocale = (): string | null => {
  // Custom logic here
}
```

## Performance

- **Lazy loading**: Chỉ chạy khi cần thiết
- **Caching**: Lưu preference để tránh detect lại
- **Timeout**: 10 giây timeout cho geolocation
- **Maximum age**: Cache vị trí 5 phút
