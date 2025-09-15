'use client'

import { ModalClient } from '@/core/components'
import useModalRegistration from '../../stores/useModalRegistration'
import Image from 'next/image'
import TrialRegistrationForm from './TrialRegistrationForm'
import { useDevice } from '@/core/hooks'
import { cn } from '@/core/utils'

interface FormData {
  fullName: string
  phoneNumber: string
  gender: 'female' | 'male' | 'other'
  dateOfBirth: string
  address: string
}

const TrialRegistrationModal = () => {
  const { isOpen, open: onpen, close } = useModalRegistration()

  const { height } = useDevice()

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
        className="w-full mx-3 md:mx-0  h-[90%] md:h-auto md:w-[800px] lg:w-[1000px] xl:w-[1230px] rounded-4xl "
      >
        <div className="w-full h-full relative p-8 rounded-4xl overflow-hidden">
          <div className="absolute top-0 right-0">
            <img
              src={'/image/trial/top-gradient.png'}
              alt="close"
              className=""
            />
          </div>

          <div className="absolute bottom-0 right-0">
            <img
              src={'/image/trial/image-blur-01.png'}
              alt="close"
              className="w-[400px]"
            />
          </div>
          <div className="h-full md:grid lg:grid-cols-2 gap-10 relative z-10">
            <div
              className={cn(
                'w-full h-full xl:aspect-[7/9] hidden lg:block  max-h-max md:max-h-[580px]',
                height < 768 && 'md:max-h-[580px] lg:max-h-[580px]'
              )}
            >
              <Image
                src={'/image/trial/image-modal-01.jpg'}
                alt="trial"
                height={300}
                width={300}
                className="object-cover w-full h-full rounded-3xl"
              />
            </div>
            <div
              className={cn(
                'h-full max-h-max  md:max-h-[580px] ',
                height < 768 &&
                  'max-h-max md:max-h-[580px] lg:max-h-[580px] xl:max-h-[580px]'
              )}
            >
              <TrialRegistrationForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </ModalClient>
    </div>
  )
}

export default TrialRegistrationModal
