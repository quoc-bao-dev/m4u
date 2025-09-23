import { ToastProvider } from '@/core/components/common'
import { GlobalLoadingProvider } from '@/core/context/GlobalLoadingContext'
import { ReactQueryProvider } from '@/lib/react-query'
import { AutoLogin } from '@/modules/auth'
import AutoSetIntroduceCode from '@/modules/referral-program/components/auto-load/AutoSetIntroduceCode'
import { PropsWithChildren } from 'react'
import { DeviceProvider } from './DeviceProvider'
import ModalProvider from './ModalProvider'

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalLoadingProvider>
        <ReactQueryProvider>
          <DeviceProvider>
            <ModalProvider>
              {children}
              <ToastProvider />
              <AutoLogin />
              <AutoSetIntroduceCode />
            </ModalProvider>
          </DeviceProvider>
        </ReactQueryProvider>
      </GlobalLoadingProvider>
    </>
  )
}

export default AppProvider
