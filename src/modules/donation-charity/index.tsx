import Donation from '../landing/components/donation'
import EventCampaign from './EventCampaign'
import ModalSection from './ModalSection'

const DonationCharity = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Donation isHero={true} className='h-screen' />
      <ModalSection />
      <EventCampaign />
    </div>
  )
}

export default DonationCharity
