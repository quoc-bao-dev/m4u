// ================== CẤU HÌNH PRETTIER CHO DỰ ÁN M4U ==================

module.exports = {
  // ================== CẤU HÌNH CƠ BẢN ==================

  // Số khoảng trắng cho mỗi mức thụt lề
  tabWidth: 2,

  // Sử dụng spaces thay vì tab characters
  useTabs: false,

  // Sử dụng dấu nháy đơn cho JavaScript (JSX attributes vẫn dùng dấu nháy kép)
  singleQuote: true,

  // Độ dài tối đa của một dòng code - có thể tăng lên vì ESLint sẽ xử lý JSX props
  printWidth: 80,

  // Thêm dấu phẩy cuối khi ES5 hỗ trợ
  trailingComma: 'es5',

  // Tự động thêm dấu chấm phẩy
  semi: true,

  // ================== CẤU HÌNH JSX ==================

  // Thêm khoảng trắng trong objects: { foo: bar }
  bracketSpacing: true,

  // JSX: Dấu > xuống dòng mới thay vì cùng dòng với props cuối
  // false = dấu > xuống dòng:
  //   <Component
  //     prop="value"
  //   >
  // true = dấu > cùng dòng:
  //   <Component
  //     prop="value">
  bracketSameLine: false,

  // Luôn có dấu ngoặc đơn cho arrow function parameters
  // 'always' = (x) => x, 'avoid' = x => x
  arrowParens: 'always',

  // ================== CẤU HÌNH BỔ SUNG ==================

  // Xử lý khoảng trắng trong HTML/JSX theo CSS rules
  // 'css' = theo CSS rules, 'strict' = nghiêm ngặt, 'ignore' = bỏ qua
  htmlWhitespaceSensitivity: 'css',

  // Sử dụng line ending kiểu Unix/Mac
  // 'lf' = Unix/Mac, 'crlf' = Windows, 'auto' = tự động
  endOfLine: 'lf',

  // Format code trong template literals (styled-components, etc.)
  // 'auto' = tự động, 'off' = tắt
  embeddedLanguageFormatting: 'auto',

  // ================== CẤU HÌNH JSX BỔ SUNG ==================

  // 🔥 JSX props sẽ tự động xuống dòng bởi ESLint rules, không cần dựa vào printWidth
  // Xem cấu hình trong eslint.config.mjs:
  // - react/jsx-max-props-per-line: mỗi prop trên 1 dòng
  // - react/jsx-first-prop-new-line: prop đầu xuống dòng khi multiline
  // - react/jsx-closing-bracket-location: dấu > thẳng hàng

  // Dùng dấu nháy đơn cho JSX attributes (tùy chọn)
  // jsxSingleQuote: true,
};
