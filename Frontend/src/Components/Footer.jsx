import React from 'react'
import { Assets } from '../assets/Assets'

const Footer = () => {
  return (
    <>
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text:sm '>
            <div>
                <img src={Assets.BUYMELOGO4} className='mb-5 w-40' alt="" />
                <p className='w-full md:w-2/3 text-gray-700'>Welcome to Buy Me — where style meets savings, trends arrive first, and your perfect pick is just a click away. Shop smart, shop bold, shop Buy Me!</p>
            </div>

            <div>
                <p className='text-xl font-semibold mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-700'>
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>DELIVERY</li>
                    <li>PRIVACY POLICY</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-semibold mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-700'>
                    <li>+91-985-457-7584</li>
                    <li>buyme@ecommerce.com</li>
                </ul>
            </div>

        </div>

        <div>
            <hr className='border-t-1 border-gray-400 my-4'/>
            <p className='py-5 text-sm text-center font-bold'>Copyright 2025@ ecommerce.com - All Right Reserved.</p>
        </div>
    </div>
    </>
  )
}

export default Footer