import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from "../Context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    // with the help of this useContext we can get the products

    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() =>
    {
        setLatestProducts(products.slice(0,10));
    },[products]);

    // here we have passed empty array so that the function will be executed once when the component is loaded

  return (
    <>
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            {/* as we have passed the two props so we need to provide the text */}
            <Title text1={"LATEST"} text2={"COLLECTIONS"} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                New in, just for you — because your wardrobe deserves a glow-up!
            </p>
        </div>

        {/* Rendering Products */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item,index) =>
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

export default LatestCollection