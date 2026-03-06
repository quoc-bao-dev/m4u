import QrCode from './QrCode'
import ReferralUsers from './ReferralUsers'
import StatsSection from './StatsSection'

const RightContent = () => {
  return (
    <div className="order-1 xl:order-2 xl:w-5/12  space-y-6">
      <div className="xl:max-w-12/12 2xl:max-w-10/12 mx-auto">
        {/* QR Code Section */}
        <div className="">
          <QrCode />
        </div>

        {/* Stats Section */}
        <div className="py-5">
          <StatsSection />
        </div>

        {/* User List */}
        <div className="flex-1">
          <ReferralUsers />
        </div>
      </div>
    </div>
  )
}

export default RightContent
