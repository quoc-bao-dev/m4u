'use client'
import React, { useState } from 'react'
import { ModalClient, PINInput } from '@/core/components'

export default function ModalDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false)
  const [isNoCloseButtonModalOpen, setIsNoCloseButtonModalOpen] =
    useState(false)
  const [isPINModalOpen, setIsPINModalOpen] = useState(false)
  const [pinValue, setPinValue] = useState('')
  const [pinComplete, setPinComplete] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Modal Component Demo
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Modal */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Modal</h2>
            <p className="text-gray-600 mb-4">
              Modal cơ bản với nút đóng và backdrop
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Mở Modal
            </button>
          </div>

          {/* Fullscreen Modal */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Fullscreen Modal</h2>
            <p className="text-gray-600 mb-4">
              Modal toàn màn hình không có backdrop
            </p>
            <button
              onClick={() => setIsFullscreenModalOpen(true)}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            >
              Mở Fullscreen Modal
            </button>
          </div>

          {/* No Close Button Modal */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">No Close Button</h2>
            <p className="text-gray-600 mb-4">
              Modal không có nút đóng (chỉ đóng bằng ESC)
            </p>
            <button
              onClick={() => setIsNoCloseButtonModalOpen(true)}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors"
            >
              Mở Modal (No Close Button)
            </button>
          </div>

          {/* PIN Input Modal */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">PIN Input Modal</h2>
            <p className="text-gray-600 mb-4">Modal với PIN Input component</p>
            <button
              onClick={() => setIsPINModalOpen(true)}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
            >
              Mở PIN Input Modal
            </button>
          </div>
        </div>

        {/* Mobile Test Info */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            📱 Test Mobile Animation
          </h3>
          <p className="text-yellow-700">
            Để test hiệu ứng trượt từ dưới lên trên mobile, hãy:
          </p>
          <ul className="list-disc list-inside text-yellow-700 mt-2 space-y-1">
            <li>Mở Developer Tools (F12)</li>
            <li>Chuyển sang chế độ mobile (Ctrl+Shift+M)</li>
            <li>Chọn một thiết bị mobile bất kỳ</li>
            <li>Nhấn các nút modal để xem hiệu ứng trượt từ dưới lên</li>
          </ul>
        </div>

        {/* Basic Modal */}
        <ModalClient open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Basic Modal
            </h2>
            <p className="text-gray-600 mb-6">
              Đây là modal cơ bản với hiệu ứng framer motion. Trên mobile sẽ
              trượt từ dưới lên, trên desktop sẽ có hiệu ứng scale.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900">Tính năng:</h3>
                <ul className="list-disc list-inside text-blue-800 mt-2 space-y-1">
                  <li>Hiệu ứng mở/đóng mượt mà</li>
                  <li>Đóng bằng phím ESC</li>
                  <li>Click backdrop để đóng</li>
                  <li>Responsive design</li>
                </ul>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Đóng Modal
              </button>
            </div>
          </div>
        </ModalClient>

        {/* Fullscreen Modal */}
        <ModalClient
          open={isFullscreenModalOpen}
          onClose={() => setIsFullscreenModalOpen(false)}
          isFullscreen={true}
        >
          <div className="h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Fullscreen Modal</h2>
              <p className="text-xl mb-8">
                Modal toàn màn hình không có backdrop
              </p>
              <button
                onClick={() => setIsFullscreenModalOpen(false)}
                className="bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Đóng Modal
              </button>
            </div>
          </div>
        </ModalClient>

        {/* No Close Button Modal */}
        <ModalClient
          open={isNoCloseButtonModalOpen}
          onClose={() => setIsNoCloseButtonModalOpen(false)}
          showCloseButton={false}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Modal Không Có Nút Đóng
            </h2>
            <p className="text-gray-600 mb-6">
              Modal này không có nút đóng. Bạn chỉ có thể đóng bằng phím ESC
              hoặc click backdrop.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-900">Lưu ý:</h3>
                <ul className="list-disc list-inside text-red-800 mt-2 space-y-1">
                  <li>Không có nút X ở góc phải</li>
                  <li>Chỉ đóng được bằng ESC hoặc click backdrop</li>
                  <li>Phù hợp cho các modal quan trọng</li>
                </ul>
              </div>
              <button
                onClick={() => setIsNoCloseButtonModalOpen(false)}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
              >
                Đóng Modal
              </button>
            </div>
          </div>
        </ModalClient>

        {/* PIN Input Modal */}
        <ModalClient
          open={isPINModalOpen}
          onClose={() => {
            setIsPINModalOpen(false)
            setPinValue('')
            setPinComplete(false)
          }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              PIN Input Demo
            </h2>
            <p className="text-gray-600 mb-6">
              Nhập mã PIN 6 số. Bạn có thể paste mã PIN từ clipboard.
            </p>

            <div className="space-y-6">
              {/* PIN Input */}
              <div className="flex justify-center">
                <PINInput
                  length={6}
                  value={pinValue}
                  onChange={(value) => {
                    setPinValue(value)
                    setPinComplete(false)
                  }}
                  onComplete={(value) => {
                    setPinComplete(true)
                  }}
                  className="gap-3"
                  inputClassName="w-14 h-14 text-2xl"
                />
              </div>

              {/* Status */}
              <div className="text-center">
                {pinComplete ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      ✅ PIN đã được nhập đầy đủ: {pinValue}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-gray-600">
                      Đã nhập: {pinValue.length}/6 số
                    </p>
                  </div>
                )}
              </div>

              {/* Features Info */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Tính năng:</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
                  <li>Chỉ cho phép nhập số</li>
                  <li>Hỗ trợ paste từ clipboard</li>
                  <li>Tự động focus ô tiếp theo</li>
                  <li>Hỗ trợ phím mũi tên để di chuyển</li>
                  <li>Backspace để xóa và quay lại ô trước</li>
                  <li>Bắt sự kiện khi nhập đủ số</li>
                </ul>
              </div>

              {/* Test Paste */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">
                  🧪 Test Paste:
                </h3>
                <p className="text-yellow-700 text-sm mb-2">
                  Copy mã này và paste vào PIN input:{' '}
                  <code className="bg-yellow-100 px-2 py-1 rounded">
                    123456
                  </code>
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('123456')
                    alert(
                      'Đã copy "123456" vào clipboard! Bây giờ paste vào PIN input.'
                    )
                  }}
                  className="text-yellow-800 underline text-sm hover:text-yellow-900"
                >
                  Copy mã test
                </button>
              </div>

              <button
                onClick={() => {
                  setIsPINModalOpen(false)
                  setPinValue('')
                  setPinComplete(false)
                }}
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
              >
                Đóng Modal
              </button>
            </div>
          </div>
        </ModalClient>
      </div>
    </div>
  )
}
