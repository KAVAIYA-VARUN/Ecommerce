import React from 'react'
import Title from "../Components/Title.jsx";
import { Assets } from '../assets/Assets';
import NewsLetter from "../Components/NewsLetter.jsx";

const ContactUs = () => {
  return (
  <>
  <div>
    <div className='text-center text-2xl pt-10 border-t'>
      <Title text1={"CONTACT"} text2={"US"} />
    </div>
    <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
      <img src={Assets.contact_us_img} className='w-full md:max-w-[480px] rounded-xl' alt="" />
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-xl text-gray-800'>Our Store</p>
        <p className='text-gray-700'>BuyMe Center <br />Near Crystal Mall, Jamnagar, Gujarat</p>
        <p className='text-gray-700'>Tel: 91+ 9408118601  <br />Email: admin@buyMe.com</p>
        <p className='font-semibold text-xl text-gray-800'>Careers At BuyMe</p>
        <p className='text-gray-700'>Learn More About Our Teams And Job Openings.</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
      </div>
    </div>
    <NewsLetter />
  </div>
  </>
  )
}

export default ContactUs