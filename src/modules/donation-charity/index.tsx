import React from 'react'
import ModalSection from './ModalSection'
import Donation from '../landing/components/donation'

const DonationCharity = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      {/* <Hero /> */}
      <Donation isHero={true} className='h-screen' />
      <ModalSection />
    </div>
  )
}

export default DonationCharity
