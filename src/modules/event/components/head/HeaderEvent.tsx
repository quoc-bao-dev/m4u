import { Share } from '@/modules/product'
import EventBadge from '../event/EventBadge'

const HeaderEvent = () => {
  return (
    <div className="">
      <div className="w-fit">
        <EventBadge status="happening" />
      </div>
      <div className="pt-5">
        <h1 className="text-title-sect font-bold leading-[120%]">
          Mask-a-thon Challenge: Win an iPhone 16!
        </h1>
        <p className="pt-4">
          Love sheet masks? Review any 3 of our featured mask products for FREE
          and share your honest thoughts with the community.
        </p>
      </div>
      <div className="pt-1 flex justify-between items-end">
        <p className="text-gray-600">06/09/2025</p>
        <Share />
      </div>
    </div>
  )
}

export default HeaderEvent
