import { PropsWithChildren } from 'react'
import { DeviceProvider } from './DeviceProvider'
import ModalProvider from './ModalProvider'
import { GlobalLoadingProvider } from '@/core/context/GlobalLoadingContext'

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalLoadingProvider>
        <DeviceProvider>
          <ModalProvider>{children}</ModalProvider>
        </DeviceProvider>
      </GlobalLoadingProvider>
    </>
  )
}

export default AppProvider
