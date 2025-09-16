import VideoWrapper from '@/components/VideoWrapper'
import Donation from '../landing/components/donation'
import EventCampaign from './EventCampaign'
import GiveToDay from './GiveToDay'
import ModalSection from './ModalSection'

const DonationCharity = () => {
  return (
    <div className='flex flex-col items-center justify-center pb-12 xl:pb-24'>
      <Donation isHero={true} className='lg:h-screen pt-16 lg:pt-0' />
      <ModalSection />
      <EventCampaign />
      <GiveToDay />
      {/* <VideoWrapper
          src="/image/background.mp4"
          playbackRate={0.3}
          className="absolute inset-0 -z-10 w-full h-full object-cover pointer-events-none"
        /> */}
    </div>
  )
}

export default DonationCharity
