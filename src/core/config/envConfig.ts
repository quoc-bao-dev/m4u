export const envConfig = {
  baseUrl:
    (process.env.NEXT_PUBLIC_BASE_API_URL as string) ??
    'http://192.168.1.199:8881/api',
  apiTimeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
}
