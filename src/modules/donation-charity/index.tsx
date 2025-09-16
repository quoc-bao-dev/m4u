import Donation from '../landing/components/donation'
import EventCampaign from './EventCampaign'
import GiveToDay from './GiveToDay'
import ModalSection from './ModalSection'

const DonationCharity = () => {
  return (
    <div className='flex flex-col items-center justify-center pb-24'>
      <Donation isHero={true} className='h-screen' />
      <ModalSection />
      <EventCampaign />
      <GiveToDay />
    </div>
  )
}

export default DonationCharity
