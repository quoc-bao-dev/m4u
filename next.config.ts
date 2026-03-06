import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  // eslint: {
  //   // Ignore ESLint errors during production builds
  //   ignoreDuringBuilds: true,
  // },
  typescript: {
    // Allow production builds to successfully complete even if there are type errors
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "m4u-admin.fmrp.vn" },
      { protocol: "http", hostname: "192.168.1.199" },
      { protocol: "https", hostname: "admin.maskforyou.vn" },
      { protocol: "https", hostname: "accounts.maskforyou.vn" },
      { protocol: "https", hostname: "services.maskforyou.vn" },
      // 'm4u-admin.fmrp.vn',
      // '192.168.1.199',
      // 'admin.maskforyou.vn',
      // 'accounts.maskforyou.vn',
      // 'admin.maskforyou.vn',
      // 'services.maskforyou.vn',
    ],
  },
  webpack(config) {
    // Fallback cho khi không dùng turbopack
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

export default withNextIntl(nextConfig)
