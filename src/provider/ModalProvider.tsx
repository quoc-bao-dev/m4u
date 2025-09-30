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
    </>
  )
}

export default ModalProvider
