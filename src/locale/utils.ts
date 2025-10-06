export function mapToBCP47(appLocale: string | undefined | null): string {
  if (!appLocale) return 'en'

  const normalized = String(appLocale).toLowerCase()

  // Known mappings from app locales to BCP 47 tags
  const mapping: Record<string, string> = {
    en: 'en',
    vi: 'vi', // vi works; vi-VN also valid
    kr: 'ko', // Korean
    th: 'th', // Thai
    cn: 'zh-CN', // Simplified Chinese (China)
    // Add more if app introduces new locales
  }

  if (mapping[normalized]) return mapping[normalized]

  // If already looks like a BCP 47 tag, return as-is
  const bcp47Regex = /^[a-z]{2,3}(-[A-Z]{2})?$/
  if (bcp47Regex.test(appLocale)) return appLocale

  // Fallback
  return 'en'
}
