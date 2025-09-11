import { PropsWithChildren } from 'react'
import { DeviceProvider } from './DeviceProvider'
import ModalProvider from './ModalProvider'

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DeviceProvider>
        <ModalProvider>{children}</ModalProvider>
      </DeviceProvider>
    </>
  )
}

export default AppProvider
