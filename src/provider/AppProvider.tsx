import { ToastProvider } from '@/core/components/common'
import { GlobalLoadingProvider } from '@/core/context/GlobalLoadingContext'
import { ReactQueryProvider } from '@/lib/react-query'
import { AutoLogin } from '@/modules/auth'
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
            </ModalProvider>
          </DeviceProvider>
        </ReactQueryProvider>
      </GlobalLoadingProvider>
    </>
  )
}

export default AppProvider
