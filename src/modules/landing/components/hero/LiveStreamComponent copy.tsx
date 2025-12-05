import { Container } from '@/core/components'
import AvatarStack from './AvatarStack'
import LiveStreamTracking from './LiveStreamTracking'
import { useTranslations } from 'next-intl'

const LiveStreamComponent = () => {
  const t = useTranslations('hero.liveStream')

  return (
    <>
      <div className="bg-[#FFF0F8] py-2 xl:py-4 2xl:py-8">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-6">
            {/* Live Stream Badge */}
            <div className="flex items-center md:justify-start justify-center ">
              <LiveStreamTracking />
            </div>

            {/* Members Section */}
            <div className="flex flex-col md:flex-row items-end gap-2">
              {/* Member Info */}
              <div className="text-right">
                <p className="text-gray-900 text-sm sm:text-lg md:text-lg font-bold truncate">
                  {t('membersOnline')}{' '}
                  <span className="lg:hidden text-[#F5222D] font-bold">
                    69+ {t('singleMoms')}
                  </span>{' '}
                </p>
                <p className="text-xs sm:text-sm lg:text-base ">
                  <span className="hidden lg:block text-[#F5222D] font-bold">
                    69+ {t('singleMoms')}<br/>
                  </span>{' '}
                  <span className="text-[#4B5563] truncate">
                    {t('participatingInGroup')}
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
