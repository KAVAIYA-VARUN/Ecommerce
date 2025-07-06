import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext.jsx';
import { Assets } from '../assets/Assets.js';
import RelatedProducts from '../Components/RelatedProducts.jsx';
import { toast } from 'react-toastify';

const Product = () => {

  const { productId } = useParams();
  const { products,currency,addToCart, cartItems } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // this might need to change due to the use of async and await
  const fetchProductData = async () =>
  {
    products.map((item) =>
    {
      if(item._id.toString() === productId)
      {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() =>
  {
    fetchProductData();
    window.scrollTo({top: 0, behavior: "smooth"}); // this is to smoothly scroll to the top of the window
  },[productId, products]);

  return productData ? (
  <>
  <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
    {/* Product Data */}
    <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

      {/* Product Images */}
      <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
          {
            productData.image.map((item,index) =>
            (
              <img onClick={() => setImage(item)} src={item} key={index} className='w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            ))
          }
        </div>
        <div className='w-full sm:w-[80%]'>
          <img src={image} className='w-full h-auto' alt="" />
        </div>

        {/* <div className='w-full sm:w-[80%] relative'>
          {productData.oldPrice && productData.oldPrice > productData.price && (
            <div className='absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow-md z-10'>
              SALE {Math.round(((productData.oldPrice - productData.price) / productData.oldPrice) * 100)}% OFF
            </div>
          )}
          <img src={image} className='w-full h-auto' alt="" />
        </div> */}
      </div>

      {/* Product Info */}

      <div className='flex-1'>
        <h1 className='font-medium text-2xl mt-2 text-gray-600 '>{productData.name}</h1>
        <div className='flex items-center gap-1 mt-2'>
          <img src={Assets.star_icon} alt="" className="w-3.5" />
          <img src={Assets.star_icon} alt="" className="w-3.5" />
          <img src={Assets.star_icon} alt="" className="w-3.5" />
          <img src={Assets.star_icon} alt="" className="w-3.5" />
          <img src={Assets.star_dull_icon} alt="" className="w-3.5" />
          <p className='pl-2'>(122)</p>
        </div>
        <div className='mt-5 text-3xl font-medium flex items-center gap-4'>
        {productData.oldPrice && productData.oldPrice !== productData.price && (
          <>
            <span className='line-through text-gray-500 text-2xl'>
              {currency}{productData.oldPrice}
            </span>
          
            <span>{currency}{productData.price}</span>
            <span className='text-xs bg-green-600 text-white px-2 py-1 rounded'>
            SALE {Math.round(((productData.oldPrice - productData.price) / productData.oldPrice) * 100)}% OFF
            </span>
          </>
        )}
        {
          (!productData.oldPrice || productData.oldPrice === productData.price) && (
            <span className='text-black'>{currency}{productData.price}</span>
          )
        }
        </div>
        <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
        <div className='flex flex-col gap-4 my-8'>
          <p>Select Size</p>
          <div className='flex gap-2'>
            {
              productData.sizes.map((item,index) =>
              (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-300 ${item === size ? "border-orange-500 dark:bg-green-500 dark:text-black" : "dark:bg-gray-700 dark:text-white"}`} key={index}>{item}</button>
              ))
            }
          </div>
        </div>
        <button onClick={() =>
          {
            if(!size)
            {
              toast.warn("Please select a size.");
              return;
            }
            if(productData.stock <= 0)
            {
              toast.error("This item is currently out of stock.");
              return;
            }

            const currentQty = cartItems[productData._id]?.[size] || 0;
            if(currentQty >= productData.stock)
            {
              toast.warn(`Only ${productData.stock} left in stock.`);
              return;
            }

            addToCart(productData._id, size);
            toast.success("Product Added to Cart");
          }
        }
        className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
        <hr className='mt-8 sm:w-4/5 h-[1px] bg-gray-500 border-0' />
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>100% Original Product.</p>
          <p>Cash On Delivery Available On This Product.</p>
          <p>Easy Return And Exchange Policy Within 7 Days.</p>
        </div>
      </div>

    </div>

    {/* Description And Review Section */}

    <div className='mt-20'>
      <div className='flex'>
        <p className='border-2 border-gray-500 px-5 py-3 text-sm font-semibold'>Description</p>
        <p className='border-2 border-gray-500 px-5 py-3 text-sm'>Reviews (122)</p>
      </div>
      <div className='flex flex-col gap-4 border-2 border-gray-500 px-6 py-6 text-sm text-gray-500'>
        <p>{productData.description}</p>
        <p>Discover premium style and comfort with our carefully curated collection. Each piece is crafted with high-quality materials, designed to reflect modern trends while offering long-lasting wear. Whether you're shopping for everyday essentials or standout statement items, our range combines elegance, functionality, and timeless appeal — perfect for upgrading your wardrobe or gifting someone special.</p>
      </div>
    </div>

    {/* Related Products */}

    <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

  </div>
  </>
  ) : <div className='opacity-0 '></div>
}

export default Product