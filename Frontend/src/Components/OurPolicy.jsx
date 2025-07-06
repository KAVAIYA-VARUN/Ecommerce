import React from 'react'
import { Assets } from '../assets/Assets'

const OurPolicy = () => {
  return (
    <>
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={Assets.exchange_icon} className='w-12 m-auto mb-5 navbar-icon' alt="" />
            <p className='font-bold'>Easy Exchange Policy</p>
            <p className='text-gray-600'>We offer hassle free exchange policy</p>
        </div>
        <div>
            <img src={Assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-bold'>7 Days Return Policy</p>
            <p className='text-gray-600'>We provide 7 days free return policy</p>
        </div>
        <div>
            <img src={Assets.support_img} className='w-12 m-auto mb-5 navbar-icon' alt="" />
            <p className='font-bold'>Best Customer Support</p>
            <p className='text-gray-600'>We provide 24/7 customer support</p>
        </div>
    </div>
    </>
  )
}

export default OurPolicy