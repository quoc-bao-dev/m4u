import { MainLayout } from '@/core/components'
import GeoLocationDetector from '@/core/components/GeoLocationDetector'
import LanguageSelectorWrapper from '@/core/components/LanguageSelectorWrapper'
import axiosInstance from '@/core/http/axiosInstance'
import { locales } from '@/locale/config'
import { AppProvider } from '@/provider'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

async function getProductDetail(locale: string) {
  try {
    const response = await axiosInstance.get(`/getInfoContact`, {
      params: { _locale: locale },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching info contact:', error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  try {
    const { locale } = await params
    const infoContact = await getProductDetail(locale)

    if (!infoContact) {
      return {
        title: 'Trang không tồn tại',
        description: 'Không tìm thấy trang bạn yêu cầu',
      }
    }

    const decodedTitle = infoContact?.data?.title_thumbnal
    const decodedContent = infoContact?.data?.content_thumbnal

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_DOMAIN || 'https://maskforyou.vn'

    return {
      title: decodedTitle,
      description: decodedContent,
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: decodedTitle,
        description: decodedContent,
        siteName: 'M4U',
        images: [
          {
            url: infoContact?.data?.image_thumbnal,
            width: 1200,
            height: 630,
            alt: decodedTitle,
          },
        ],
        locale: 'vi_VN',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: decodedTitle,
        description: decodedContent,
        images: [infoContact?.data?.image_thumbnal],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Mask for you',
      description: 'Khám phá các sản phẩm chất lượng cao tại M4U',
    }
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Pass locale explicitly to getMessages
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppProvider>
        <MainLayout>{children}</MainLayout>
        <LanguageSelectorWrapper />
      </AppProvider>
      {/* Language Selector - Hiển thị khi chưa chọn ngôn ngữ */}
      {/* GeoLocation Detector - Tự động tắt khi LanguageSelector mở */}
      {/* <GeoLocationDetector /> */}
    </NextIntlClientProvider>
  )
}
