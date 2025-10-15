'use client'

import { useLanguageSwitch, useNavigate, useTranslation } from '@/locale/hooks'

export default function DemoPage() {
  const { t, l } = useTranslation()
  const { switchLanguage, currentLocale, availableLocales, localeNames } =
    useLanguageSwitch()
  const navigate = useNavigate()

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{t('common.welcome')}</h1>

      <div className="space-y-6">
        {/* Demo useTranslation */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">
            useTranslation Hook Demo
          </h2>
          <p>{t('common.home')}</p>
          <p>
            <strong>Current text:</strong> {t('common.home')}
          </p>
          <p>
            <strong>Link with l():</strong> {l('/about')}
          </p>
        </div>

        {/* Demo useLanguageSwitch */}
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">
            useLanguageSwitch Hook Demo
          </h2>
          <p>
            <strong>Current locale:</strong> {currentLocale}
          </p>
          <div className="flex gap-2 mt-2">
            {availableLocales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLanguage(loc)}
                className={`px-3 py-1 rounded ${
                  currentLocale === loc
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-blue-500 text-blue-500'
                }`}
              >
                {localeNames[loc as keyof typeof localeNames]}
              </button>
            ))}
          </div>
        </div>

        {/* Demo useNavigate */}
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">useNavigate Hook Demo</h2>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/')}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              {t('navigation.home')}
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              {t('common.about')}
            </button>
          </div>
        </div>

        {/* Hero Section Demo */}
        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Hero Section Demo</h2>
          <p className="mb-4">
            Click the button below to see the hero section:
          </p>
          <button
            onClick={() => navigate('/hero-demo')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            View Hero Section
          </button>
        </div>
      </div>
    </div>
  )
}
