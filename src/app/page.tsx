import { redirect } from 'next/navigation';
import { defaultLocale } from '@/locale/config';

// Root page - redirect to default locale
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
