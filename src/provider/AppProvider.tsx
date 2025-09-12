import { GlobalLoadingProvider } from '@/core/context/GlobalLoadingContext'
import { ReactQueryProvider } from '@/lib/react-query'
import { PropsWithChildren } from 'react'
import { DeviceProvider } from './DeviceProvider'
import ModalProvider from './ModalProvider'
import { ToastProvider } from '@/core/components/common'

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalLoadingProvider>
        <ReactQueryProvider>
          <DeviceProvider>
            <ModalProvider>
              {children}
              <ToastProvider />
            </ModalProvider>
          </DeviceProvider>
        </ReactQueryProvider>
      </GlobalLoadingProvider>
    </>
  )
}

export default AppProvider
