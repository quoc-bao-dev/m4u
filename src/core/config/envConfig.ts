export const envConfig = {
  adminUrl:
    (process.env.NEXT_PUBLIC_ADMIN_API_URL as string) ??
    'https://m4u-admin.fmrp.vn:8881/api',
  serviceUrl:
    (process.env.NEXT_PUBLIC_SERVICES_API_URL as string) ??
    'https://m4u-services.fmrp.vn:8882/api',
  accountUrl:
    (process.env.NEXT_PUBLIC_ACCOUNTS_API_URL as string) ??
    'https://m4u-accounts.fmrp.vn:8883/api',

  apiTimeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  accessTokenKey: 'accessToken',
}
