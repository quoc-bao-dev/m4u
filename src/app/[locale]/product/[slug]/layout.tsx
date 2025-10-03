import { ReactNode } from "react";
import { Metadata } from "next";
import he from 'he';
import axiosInstance from "@/core/http/axiosInstance";

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

    const decodedTitle = he.decode(productData.data.name);
    const decodedContent = he.decode(productData.data.ingredients[0].content);

    const baseUrl = process.env.NEXT_PUBLIC_APP_DOMAIN || 'https://m4u.amazingtrial.com';
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
            url: productData.data.image,
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
        images: [productData.data.image],
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
      title: "Sản phẩm - M4U",
      description: "Khám phá các sản phẩm chất lượng cao tại M4U",
    };
  }
}

export default function ProductLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
} 
