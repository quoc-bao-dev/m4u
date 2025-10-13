// Language Selector Configuration
export const LANGUAGE_SELECTOR_CONFIG = {
  // Bật/tắt tính năng hiển thị LanguageSelector mặc định
  enabled: true,

  // Có cho phép người dùng bỏ qua không
  allowSkip: true,

  // Có hiển thị khi người dùng đã skip trước đó không
  showAfterSkip: false,

  // Hiển thị ngay lập tức thay vì chờ popup permission
  showImmediately: true,

  // Thời gian delay trước khi hiển thị (ms) - chỉ áp dụng khi showImmediately = false
  delay: 0,

  // Z-index của modal
  zIndex: 9999,
} as const
