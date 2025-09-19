import {
  LoginModal,
  LogoutConfirmModal,
  OTPForgotPassModal,
  ForgotPassModal,
} from '@/modules/auth'
import {
  OTPModal,
  RegisterSuccessModal,
  TrialRegistrationModal,
} from '@/modules/trial-registration'
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
      <OTPForgotPassModal />
      <ForgotPassModal />
    </>
  )
}

export default ModalProvider
