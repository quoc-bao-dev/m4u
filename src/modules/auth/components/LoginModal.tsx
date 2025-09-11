'use client'

import { ModalClient } from '@/core/components'
import Input from '@/core/components/ui/input'
import PasswordInput from '@/core/components/ui/password-input'
import Button from '@/core/components/ui/button'
import { useState } from 'react'
import useLoginModal from '../stores/useLoginModal'
import { Eye, EyeSlash } from '@phosphor-icons/react'

const LoginModal = () => {
  const { isOpen, close } = useLoginModal()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = () => {
    // Hook up auth here
  }

  return (
    <ModalClient
      open={isOpen}
      onClose={close}
      showCloseButton={true}
      className="w-full mx-3 md:mx-0 md:w-[530px] h-fit md:h-auto rounded-4xl"
    >
      <div className="relative p-8 rounded-4xl overflow-hidden">
        <div className="absolute top-0 right-0">
          <img src="/image/trial/top-gradient.png" alt="decor" />
        </div>

        <div className="relative z-10">
          <h2 className="text-[28px] md:text-[40px] font-bold text-gray-900 mb-2">
            Sign In
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Welcome back! Enter your details to sign in.
          </p>

          <div className="space-y-6">
            <Input
              label="Username"
              placeholder="yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="w-full">
              <PasswordInput
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mt-2 text-right">
                <button
                  type="button"
                  className="text-sm font-medium text-[#3B82F6] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button size="xs" className="w-full" onClick={handleSubmit}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalClient>
  )
}

export default LoginModal
