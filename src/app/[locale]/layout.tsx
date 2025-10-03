import { MainLayout } from '@/core/components'
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

async function getProductDetail(slug: string) {
  try {
    const response = await axiosInstance.get(`products/getDetail/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  try {
    const { slug, locale } = await params;
    const productData = await getProductDetail(slug);

    if (!productData) {
      return {
        title: "Sản phẩm không tồn tại",
        description: "Không tìm thấy sản phẩm bạn yêu cầu",
      };
    }

    // const decodedTitle = productData?.data?.name;
    // const decodedContent = productData?.data?.ingredients[0]?.content;

    const decodedTitle = "Mask for you";
    const decodedContent = "Khám phá các sản phẩm chất lượng cao tại M4U";

    const baseUrl = process.env.NEXT_PUBLIC_APP_DOMAIN || 'https://maskforyou.vn';
    const canonicalUrl = locale === '' ? `${baseUrl}/product/${slug}` : `${baseUrl}/${locale}/product/${slug}`;

    return {
      title: decodedTitle,
      description: decodedContent,
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: decodedTitle,
        description: decodedContent,
        url: canonicalUrl,
        siteName: 'M4U',
        images: [
          {
            url: '/image/meta/thumbnail1.png',
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
        images: ['/image/meta/thumbnail1.png'],
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
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Mask for you",
      description: "Khám phá các sản phẩm chất lượng cao tại M4U",
    };
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
      </AppProvider>
    </NextIntlClientProvider>
  )
}
