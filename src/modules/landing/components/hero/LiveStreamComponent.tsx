import { Container } from '@/core/components'
import AvatarStack from './AvatarStack'
import LiveStreamTracking from './LiveStreamTracking'

const LiveStreamComponent = () => {
  return (
    <>
      <div className="bg-[#FFF0F8] py-2 md:py-8">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-6">
            {/* Live Stream Badge */}
            <div className="flex items-center md:justify-start justify-center w-full bg">
              <LiveStreamTracking />
            </div>

            {/* Members Section */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
              {/* Member Info */}
              <div className="text-center md:text-right">
                <p className="text-gray-900 text-sm sm:text-lg md:text-xl font-bold truncate">
                  Thành viên online
                </p>
                <p className="text-xs sm:text-sm lg:text-lg ">
                  <span className="text-[#F5222D] font-bold">
                    69+ mẹ đơn thân
                  </span>{' '}
                  <span className="text-[#4B5563] truncate">
                    đang tham gia nhóm trải nghiệm
                  </span>
                </p>
              </div>

              {/* Avatar Stack */}
              <AvatarStack />
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default LiveStreamComponent
