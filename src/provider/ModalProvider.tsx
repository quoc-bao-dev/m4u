import {
  LoginModal,
  LogoutConfirmModal,
  OTPForgotPassModal,
  ForgotPassModal,
  PhoneInputModal,
} from '@/modules/auth'
import {
  OTPModal,
  RegisterSuccessModal,
  TrialRegistrationModal,
} from '@/modules/trial-registration'
import { FeedbackSuccessModal } from '@/modules/feedback/components'
import { PropsWithChildren } from 'react'
import AvatarCroperModal from '@/modules/personal/components/AvatarCroperModal'

const ModalProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <TrialRegistrationModal />
      <OTPModal />
      <RegisterSuccessModal />
      <LoginModal />
      <LogoutConfirmModal />
      <PhoneInputModal />
      <OTPForgotPassModal />
      <ForgotPassModal />
      <FeedbackSuccessModal />
      <AvatarCroperModal />
    </>
  )
}

export default ModalProvider
