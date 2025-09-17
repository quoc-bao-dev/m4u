'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { LiveStreamBadge } from '../badge'
import AvatarStack from './AvatarStack'
import { useTranslations } from 'next-intl'

interface MobileLiveStreamBarProps {
  isVisible: boolean
}

const MobileLiveStreamBar = ({ isVisible }: MobileLiveStreamBarProps) => {
  const t = useTranslations('hero.liveStream')

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="fixed bottom-0 left-0 right-0 z-999 bg-white border-t border-gray-200 shadow-lg md:hidden"
        >
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Live Stream Badge */}
              <div className="flex items-center">
                <LiveStreamBadge />
              </div>

              {/* Additional info */}
              <div className="text-right flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-600">
                  {t('membersOnline')}{' '}
                </p>
                {/* <span className="text-xs text-[#F5222D] font-semibold">
                    69+ mẹ đơn thân
                  </span> */}

                <AvatarStack small={true} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileLiveStreamBar
