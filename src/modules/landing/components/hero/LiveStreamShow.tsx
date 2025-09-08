'use client'

import MobileLiveStreamBar from './MobileLiveStreamBar'
import { sLiveStreamStatus } from './sLiveStreamSignal'

const LiveStreamShow = () => {
  return (
    <sLiveStreamStatus.HardWrap>
      {(value) => {
        return <MobileLiveStreamBar isVisible={value} />
      }}
    </sLiveStreamStatus.HardWrap>
  )
}

export default LiveStreamShow
