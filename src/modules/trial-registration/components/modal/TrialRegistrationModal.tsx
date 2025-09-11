'use client'

import { ModalClient } from '@/core/components'
import useModalRegistration from '../../stores/useModalRegistration'
import Image from 'next/image'
import TrialRegistrationForm from './TrialRegistrationForm'

interface FormData {
  fullName: string
  phoneNumber: string
  gender: 'female' | 'male' | 'other'
  dateOfBirth: string
  address: string
}

const TrialRegistrationModal = () => {
  const { isOpen, onpen, close } = useModalRegistration()

  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    // Handle form submission logic here
    // You can add API calls, validation, etc.
  }

  return (
    <div>
      <ModalClient
        open={isOpen}
        onClose={close}
        showCloseButton={true}
        className="w-[70%]"
      >
        <div className="relative p-4 rounded-2xl overflow-hidden">
          <div className="absolute top-0 right-0">
            <img
              src={'/image/trial/top-gradient.png'}
              alt="close"
              className=""
            />
          </div>
          <div className="grid grid-cols-2 gap-3 relative z-10">
            <div className="w-full aspect-[7/8.4]">
              <Image
                src={'/image/trial/image-modal-01.jpg'}
                alt="trial"
                height={300}
                width={300}
                className="object-cover w-full h-full rounded-3xl"
              />
            </div>
            <TrialRegistrationForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </ModalClient>
    </div>
  )
}

export default TrialRegistrationModal
