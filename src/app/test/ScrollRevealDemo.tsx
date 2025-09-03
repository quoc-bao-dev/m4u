'use client'

import React from 'react'
import { ScrollReveal } from '@/core/components/animated'

const ScrollRevealDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Spacer để có thể scroll */}
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Scroll xuống để xem hiệu ứng
        </h1>
      </div>

      {/* Demo các hướng khác nhau */}
      <div className="space-y-32 py-20">
        {/* Fade in */}
        <ScrollReveal direction="fade" duration={1.5}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Fade In Effect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Component này sẽ fade in từ từ khi scroll đến vị trí 50% màn hình
            </p>
          </div>
        </ScrollReveal>

        {/* Slide up */}
        <ScrollReveal direction="up" distance={100} duration={1.2}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Slide Up Effect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Component này sẽ slide lên từ dưới lên khi scroll đến
            </p>
          </div>
        </ScrollReveal>

        {/* Slide down */}
        <ScrollReveal direction="down" distance={80} duration={1}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Slide Down Effect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Component này sẽ slide xuống từ trên xuống
            </p>
          </div>
        </ScrollReveal>

        {/* Slide left */}
        <ScrollReveal direction="left" distance={120} duration={1.3}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Slide Left Effect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Component này sẽ slide từ phải sang trái
            </p>
          </div>
        </ScrollReveal>

        {/* Slide right */}
        <ScrollReveal direction="right" distance={120} duration={1.3}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Slide Right Effect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Component này sẽ slide từ trái sang phải
            </p>
          </div>
        </ScrollReveal>

        {/* Demo với hình ảnh */}
        <ScrollReveal direction="up" distance={60} duration={1.5} delay={0.2}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Demo với hình ảnh
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <ScrollReveal
                direction="up"
                distance={40}
                duration={1}
                delay={0.1}
              >
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Card 1
                  </h3>
                  <p className="text-gray-600">Mô tả cho card đầu tiên</p>
                </div>
              </ScrollReveal>

              <ScrollReveal
                direction="up"
                distance={40}
                duration={1}
                delay={0.3}
              >
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Card 2
                  </h3>
                  <p className="text-gray-600">Mô tả cho card thứ hai</p>
                </div>
              </ScrollReveal>

              <ScrollReveal
                direction="up"
                distance={40}
                duration={1}
                delay={0.5}
              >
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-full h-48 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Card 3
                  </h3>
                  <p className="text-gray-600">Mô tả cho card thứ ba</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* Demo với SVG */}
        <ScrollReveal direction="fade" duration={2}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Demo với SVG
            </h2>
            <div className="flex justify-center">
              <ScrollReveal direction="up" distance={50} duration={1.5}>
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  className="text-blue-500"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    d="M60 100 L85 125 L140 75"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </ScrollReveal>
            </div>
            <p className="text-lg text-gray-600 mt-4">
              SVG icon với hiệu ứng scroll reveal
            </p>
          </div>
        </ScrollReveal>

        {/* Demo với custom trigger */}
        <ScrollReveal
          direction="up"
          distance={80}
          duration={1.2}
          start="top 60%"
          end="bottom 40%"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Custom Trigger
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Component này có custom trigger - bắt đầu từ 60% và kết thúc ở 40%
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Spacer cuối */}
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Kết thúc demo</h1>
      </div>
    </div>
  )
}

export default ScrollRevealDemo
