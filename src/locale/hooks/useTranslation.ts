import { useTranslations } from 'next-intl'

export function useTranslation() {
  const t = useTranslations()

  // Hàm l: trả về đường dẫn với ngôn ngữ hiện tại
  const l = (path: string) => {
    // Nếu path bắt đầu bằng '/', trả về path đó
    if (path.startsWith('/')) {
      return path
    }

    // Nếu không, thêm '/' vào đầu
    return `/${path}`
  }

  return {
    t,
    l,
  }
}
