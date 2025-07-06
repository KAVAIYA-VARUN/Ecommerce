import React from 'react'
import Title from '../Components/Title'
import { Assets } from '../assets/Assets'
import NewsLetter from "../Components/NewsLetter.jsx"

const About = () => {
  return (
  <>
  <div>
    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={"ABOUT"} text2={"US"} />
    </div>
    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img src={Assets.about_us_img} className='w-full md:max-w-[450px] rounded-xl' alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
      <p>At BuyMe, we believe that shopping should be more than just a transaction — it should be an experience. Founded with a passion for fashion, lifestyle, and customer satisfaction, BuyMe is your go-to destination for curated collections that combine quality, style, and affordability.</p>
      <p>From timeless classics to the latest trends, we bring you a handpicked selection of clothing, accessories, and essentials for men, women, and kids. Whether you're revamping your wardrobe or looking for the perfect gift, BuyMe makes it easy, enjoyable, and reliable.</p>
      <p className='font-semibold text-lg'>SO DONT JUST CRAVE FOR IT GO BUY IT</p>
      </div>
    </div>
    <div className='text-2xl py-4'>
      <Title text1={"WHY"} text2={"CHOOSE US"} />
    </div>
    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>At BuyMe, quality isn't just a promise — it's our foundation. We are committed to providing products that meet the highest standards of craftsmanship, durability, and style. Every item you see on our platform goes through a careful selection and inspection process to ensure it meets our strict quality benchmarks.</p>
      </div>
      <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convenience:</b>
        <p className='text-gray-600'>At BuyMe, we put you first — making your shopping experience fast, easy, and hassle-free. From a user-friendly interface to quick filters, secure checkout, and smooth navigation, everything is designed to save you time and effort.</p>
      </div>
        <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Customer Service Like Never Before:</b>
        <p className='text-gray-600'>At BuyMe, we don’t just sell products — we build relationships. Our commitment to exceptional customer service is what truly sets us apart. Whether you have a question, a concern, or simply need a little help choosing the perfect product, our support team is always here — friendly, fast, and ready to assist.</p>
      </div>
    </div>
    <NewsLetter />
  </div>
  </>
  )
}

export default About