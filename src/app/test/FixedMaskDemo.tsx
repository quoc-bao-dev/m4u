'use client'

import React from 'react'
import { FixedMask } from '@/core/components/animated'

const FixedMaskDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Spacer để có thể scroll */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Fixed Mask Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ranh giới cố định ở 50% màn hình. Phần nào nằm trên ranh giới sẽ
            hiện, phần nào nằm dưới sẽ bị ẩn.
          </p>
          <div className="mt-8 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 font-medium">
              💡 Hãy scroll và quan sát: ranh giới luôn cố định ở giữa màn hình!
            </p>
          </div>
        </div>
      </div>

      {/* Demo 1: Hình ảnh dài */}
      <div className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Demo 1: Hình ảnh dài với ranh giới cố định
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ranh giới luôn ở 50% màn hình, không phụ thuộc vào vị trí scroll
          </p>
        </div>

        <FixedMask threshold={80} smoothness={0.1} maskColor="white">
          <div className="w-full h-[1000px] bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-5xl font-bold mb-6">Hình ảnh dài</h3>
              <p className="text-2xl mb-4">Scroll để xem hiệu ứng</p>
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-2">Section 1</h4>
                  <p>Nội dung phần 1</p>
                </div>
                <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-2">Section 2</h4>
                  <p>Nội dung phần 2</p>
                </div>
                <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-2">Section 3</h4>
                  <p>Nội dung phần 3</p>
                </div>
              </div>
            </div>
          </div>
        </FixedMask>
      </div>

      {/* Demo 2: SVG dài */}
      <div className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Demo 2: SVG dài với ranh giới cố định
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SVG content với ranh giới cố định ở 50% màn hình
          </p>
        </div>

        <FixedMask threshold={50} smoothness={0.1} maskColor="white">
          <div className="w-full h-[800px] flex items-center justify-center">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1200 800"
              className="text-blue-500"
            >
              {/* Background */}
              <rect width="1200" height="800" fill="url(#gradient)" />

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
                  <stop offset="25%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="75%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>

              {/* Complex SVG content */}
              <circle cx="200" cy="150" r="80" fill="white" opacity="0.3" />
              <circle cx="1000" cy="650" r="60" fill="white" opacity="0.2" />
              <circle cx="600" cy="400" r="120" fill="white" opacity="0.1" />

              {/* Text */}
              <text
                x="600"
                y="200"
                textAnchor="middle"
                fill="white"
                fontSize="64"
                fontWeight="bold"
              >
                SVG Content
              </text>

              <text
                x="600"
                y="400"
                textAnchor="middle"
                fill="white"
                fontSize="48"
                fontWeight="bold"
              >
                Fixed Mask Demo
              </text>

              <text
                x="600"
                y="600"
                textAnchor="middle"
                fill="white"
                fontSize="32"
                fontWeight="bold"
              >
                Scroll to see effect
              </text>

              {/* Decorative elements */}
              <path
                d="M100 100 Q300 50 500 100 T900 100"
                stroke="white"
                strokeWidth="4"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M100 700 Q300 750 500 700 T900 700"
                stroke="white"
                strokeWidth="4"
                fill="none"
                opacity="0.6"
              />

              {/* Additional decorative circles */}
              <circle cx="150" cy="300" r="30" fill="white" opacity="0.4" />
              <circle cx="1050" cy="500" r="40" fill="white" opacity="0.3" />
              <circle cx="300" cy="600" r="25" fill="white" opacity="0.5" />
              <circle cx="900" cy="200" r="35" fill="white" opacity="0.3" />
            </svg>
          </div>
        </FixedMask>
      </div>

      {/* Demo 3: Custom threshold */}
      <div className="py-20 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Demo 3: Custom threshold (30%)
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ranh giới ở 30% màn hình thay vì 50%
          </p>
        </div>

        <FixedMask threshold={30} smoothness={0.1} maskColor="#F3F4F6">
          <div className="w-full h-[600px] bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-5xl font-bold mb-6">Custom Threshold</h3>
              <p className="text-2xl mb-4">Ranh giới ở 30% màn hình</p>
              <div className="mt-8">
                <div className="bg-white bg-opacity-20 p-8 rounded-lg inline-block">
                  <p className="text-xl">Chỉ phần trên 30% màn hình mới hiện</p>
                </div>
              </div>
            </div>
          </div>
        </FixedMask>
      </div>

      {/* Demo 4: Multiple sections */}
      <div className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Demo 4: Multiple sections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nhiều section với ranh giới cố định
          </p>
        </div>

        <div className="space-y-8">
          <FixedMask threshold={50} smoothness={0.1}>
            <div className="w-full h-[400px] bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-white">Section 1</h3>
            </div>
          </FixedMask>

          <FixedMask threshold={50} smoothness={0.1}>
            <div className="w-full h-[400px] bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-white">Section 2</h3>
            </div>
          </FixedMask>

          <FixedMask threshold={50} smoothness={0.1}>
            <div className="w-full h-[400px] bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-white">Section 3</h3>
            </div>
          </FixedMask>
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

        <FixedMask
          threshold={50}
          smoothness={0.1}
          maskColor="white"
          fadeEdge={55}
        >
          <div className="w-full h-[800px] relative">
            <img
              src="/image/hero-baner/image-01.png"
              alt="Hero banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-5xl font-bold mb-4">Hero Image</h3>
                <p className="text-2xl">Fixed mask với fade edge 15%</p>
              </div>
            </div>
          </div>
        </FixedMask>
      </div>

      {/* Demo 6: Fade Edge Effect */}
      <div className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Demo 6: Fade Edge Effect
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            So sánh giữa ranh giới cứng và ranh giới có fade edge
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Không có fade edge (mặc định)
            </h3>
            <FixedMask threshold={50} smoothness={0.1} fadeEdge={0}>
              <div className="w-full h-[300px] bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                <h4 className="text-3xl font-bold text-white">Hard Edge</h4>
              </div>
            </FixedMask>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Fade edge 10% (chuyển tiếp mượt mà)
            </h3>
            <FixedMask threshold={50} smoothness={0.1} fadeEdge={10}>
              <div className="w-full h-[300px] bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <h4 className="text-3xl font-bold text-white">Fade Edge 10%</h4>
              </div>
            </FixedMask>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Fade edge 20% (chuyển tiếp rất mượt)
            </h3>
            <FixedMask threshold={50} smoothness={0.1} fadeEdge={20}>
              <div className="w-full h-[300px] bg-gradient-to-r from-pink-400 to-red-500 flex items-center justify-center">
                <h4 className="text-3xl font-bold text-white">Fade Edge 20%</h4>
              </div>
            </FixedMask>
          </div>
        </div>
      </div>

      {/* Demo 7: Different thresholds comparison */}
      <div className="py-20 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Demo 7: So sánh các threshold khác nhau
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cùng một nội dung với các ranh giới khác nhau
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Threshold: 25% (chỉ phần trên 25% màn hình hiện)
            </h3>
            <FixedMask threshold={25} smoothness={0.1}>
              <div className="w-full h-[300px] bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                <h4 className="text-3xl font-bold text-white">25% Threshold</h4>
              </div>
            </FixedMask>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Threshold: 50% (phần trên 50% màn hình hiện)
            </h3>
            <FixedMask threshold={50} smoothness={0.1}>
              <div className="w-full h-[300px] bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <h4 className="text-3xl font-bold text-white">50% Threshold</h4>
              </div>
            </FixedMask>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Threshold: 75% (phần trên 75% màn hình hiện)
            </h3>
            <FixedMask threshold={75} smoothness={0.1}>
              <div className="w-full h-[300px] bg-gradient-to-r from-pink-400 to-red-500 flex items-center justify-center">
                <h4 className="text-3xl font-bold text-white">75% Threshold</h4>
              </div>
            </FixedMask>
          </div>
        </div>
      </div>

      {/* Spacer cuối */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-t from-gray-50 to-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">Kết thúc demo</h1>
      </div>
    </div>
  )
}

export default FixedMaskDemo
