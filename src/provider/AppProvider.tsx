import { ToastProvider } from '@/core/components/common'
import { GlobalLoadingProvider } from '@/core/context/GlobalLoadingContext'
import { ReactQueryProvider } from '@/lib/react-query'
import { AutoLogin } from '@/modules/auth'
import { ToastNotify } from '@/modules/notification'
import AutoSetIntroduceCode from '@/modules/referral-program/components/auto-load/AutoSetIntroduceCode'
import { PropsWithChildren } from 'react'
import { DeviceProvider } from './DeviceProvider'
import ModalProvider from './ModalProvider'
import { SocketProvider } from './SocketProvider'

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalLoadingProvider>
        <ReactQueryProvider>
          <DeviceProvider>
            <SocketProvider>
              <ModalProvider>
                {children}
                <ToastNotify />
                <ToastProvider />
                <AutoLogin />
                <AutoSetIntroduceCode />
              </ModalProvider>
            </SocketProvider>
          </DeviceProvider>
        </ReactQueryProvider>
      </GlobalLoadingProvider>
    </>
  )
}

export default AppProvider
