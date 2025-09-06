import { PropsWithChildren } from 'react'
import { DeviceProvider } from './DeviceProvider'

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DeviceProvider>{children}</DeviceProvider>
      {/* {children} */}
    </>
  )
}

export default AppProvider
