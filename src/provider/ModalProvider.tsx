import { TrialRegistrationModal } from '@/modules/trial-registration'
import { PropsWithChildren } from 'react'

const ModalProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <TrialRegistrationModal />
    </>
  )
}

export default ModalProvider
