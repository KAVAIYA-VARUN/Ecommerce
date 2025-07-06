import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext.jsx'
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';
import { Assets } from '../assets/Assets.js';

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() =>
    {
        const womensBestProducts = products.filter((item) => (item.bestseller && item.category === "Women"));
        const mensBestProducts = products.filter((item) => (item.bestseller && item.category === "Men"));
        setBestSeller([...womensBestProducts.slice(0,3), ...mensBestProducts.slice(0,2)]);
    },[products]);

  return (
    <>

    <div className='flex flex-col sm:flex-row border-2 border-black'>
    
            {/* Hero Left Side */}
    
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141] '>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>TRENDING</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>
    
            {/* Hero Right Side */}
            <img src={Assets.WomensFashion} className='w-full sm:w-1/2' alt="" />
        </div>

    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={"BEST"} text2={"SELLERS"} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                These top picks are stealing hearts (and carts) daily!
            </p>
        </div>

          {/* Rendering Products */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item,index) =>
                (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />

                    // note : we have to pass id name image and price
                ))
            }
        </div>

    </div>
    </>
  )
}

export default BestSeller