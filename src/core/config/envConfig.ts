export const envConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL as string,
  apiTimeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
}
