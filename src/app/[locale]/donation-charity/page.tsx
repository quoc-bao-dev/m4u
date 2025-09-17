import DonationCharity from '@/modules/donation-charity'
import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

const DonationCharityPage = () => {
  return <DonationCharity />
}

export default DonationCharityPage

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('donationCharity.meta')
  return {
    title: t('title'),
    description: t('description'),
  }
}
