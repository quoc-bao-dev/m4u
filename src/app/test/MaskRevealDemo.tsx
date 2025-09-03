'use client'

import React from 'react'
import { MaskReveal } from '@/core/components'

const MaskRevealDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Spacer để có thể scroll */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Scroll xuống để xem hiệu ứng Mask Reveal
        </h1>
      </div>

      {/* Demo 1: Hình ảnh dài với mask từ trên */}
      <div className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Demo 1: Hình ảnh dài với mask từ trên
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Phần nào nằm trên 50% màn hình sẽ hiện, phần nào nằm dưới sẽ bị ẩn
          </p>
        </div>

        <MaskReveal
          maskHeight={50}
          direction="top"
          smoothness={0.1}
          maskColor="white"
        >
          <div className="w-full h-[800px] bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-4xl font-bold mb-4">Hình ảnh dài</h3>
              <p className="text-xl">Scroll để xem hiệu ứng reveal</p>
            </div>
          </div>
        </MaskReveal>
      </div>

      {/* Demo 2: SVG dài */}
      <div className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Demo 2: SVG dài với mask từ dưới
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mask từ dưới lên, phần nào nằm dưới 50% màn hình sẽ hiện
          </p>
        </div>

        <MaskReveal
          maskHeight={50}
          direction="bottom"
          smoothness={0.2}
          maskColor="white"
        >
          <div className="w-full h-[600px] flex items-center justify-center">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 600"
              className="text-blue-500"
            >
              {/* Background */}
              <rect width="800" height="600" fill="url(#gradient)" />

              {/* Gradient definition */}
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>

              {/* Complex SVG content */}
              <circle cx="200" cy="150" r="80" fill="white" opacity="0.3" />
              <circle cx="600" cy="450" r="60" fill="white" opacity="0.2" />
              <circle cx="400" cy="300" r="100" fill="white" opacity="0.1" />

              {/* Text */}
              <text
                x="400"
                y="300"
                textAnchor="middle"
                fill="white"
                fontSize="48"
                fontWeight="bold"
              >
                SVG Content
              </text>

              {/* Decorative elements */}
              <path
                d="M100 100 Q200 50 300 100 T500 100"
                stroke="white"
                strokeWidth="3"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M100 500 Q200 550 300 500 T500 500"
                stroke="white"
                strokeWidth="3"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>
        </MaskReveal>
      </div>

      {/* Demo 3: Custom mask height */}
      <div className="py-20 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Demo 3: Custom mask height (30%)
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mask chỉ che 30% từ trên xuống
          </p>
        </div>

        <MaskReveal
          maskHeight={30}
          direction="top"
          smoothness={0.15}
          maskColor="#F3F4F6"
        >
          <div className="w-full h-[700px] bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-5xl font-bold mb-6">Custom Mask</h3>
              <p className="text-2xl">Chỉ 30% bị che</p>
            </div>
          </div>
        </MaskReveal>
      </div>

      {/* Demo 4: Multiple sections */}
      <div className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Demo 4: Multiple sections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nhiều section với hiệu ứng khác nhau
          </p>
        </div>

        <div className="space-y-8">
          <MaskReveal maskHeight={40} direction="top" smoothness={0.1}>
            <div className="w-full h-[400px] bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white">Section 1</h3>
            </div>
          </MaskReveal>

          <MaskReveal maskHeight={60} direction="bottom" smoothness={0.2}>
            <div className="w-full h-[400px] bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white">Section 2</h3>
            </div>
          </MaskReveal>

          <MaskReveal maskHeight={50} direction="top" smoothness={0.05}>
            <div className="w-full h-[400px] bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white">Section 3</h3>
            </div>
          </MaskReveal>
        </div>
      </div>

      {/* Demo 5: Real image */}
      <div className="py-20 bg-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Demo 5: Với hình ảnh thật
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sử dụng với hình ảnh thật từ public folder
          </p>
        </div>

        <MaskReveal
          maskHeight={50}
          direction="top"
          smoothness={0.1}
          maskColor="white"
        >
          <div className="w-full h-[600px] relative">
            <img
              src="/image/hero-baner/image-01.png"
              alt="Hero banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-4xl font-bold mb-4">Hero Image</h3>
                <p className="text-xl">Scroll để reveal</p>
              </div>
            </div>
          </div>
        </MaskReveal>
      </div>

      {/* Spacer cuối */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-t from-gray-50 to-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">Kết thúc demo</h1>
      </div>
    </div>
  )
}

export default MaskRevealDemo
