'use client'
import React, { useState } from 'react'
import Info from './Info'
import KOLs from './KOLs'
import Similar from './Similar'

const ReviewHubDetail = () => {

  return (
    <div className="bg-white px-0 md:px-8 lg:px-12 xl:px-20 2xl:px-24 pb-12 flex flex-col gap-6 xl:gap-12 items-center pt-[72px] min-h-screen rounded-b-4xl">
      <Info />
      <KOLs />
      <Similar />
    </div>
  )
}

export default ReviewHubDetail
