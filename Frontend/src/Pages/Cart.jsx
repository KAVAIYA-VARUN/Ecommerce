import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext.jsx'
import Title from '../Components/Title.jsx';
import { Assets } from '../assets/Assets';
import CartTotal from '../Components/CartTotal.jsx';
import { toast } from 'react-toastify';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate, token, getProductsData } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  const checkSignIn = async () =>
  {
    if(!token)
    {
      toast.warn("Please Login First");
      navigate("/login");
      return;
    }

    // fetching fresh products
    await getProductsData();
    
    // checking for the stock availability before proceeding
    for(const item of cartData)
    {
      const product = products.find(p => p._id === item._id);

      if(!product)
      {
        toast.error("Something went wrong. product not found");
        return;
      }

      if(product.stock < item.quantity)
      {
        toast.error(`Only ${product.stock} left for ${product.name}. Please reduce quantity`);
        return;
      }
    }

    // if the item is in stock then proceed further
    navigate("/placeOrder");
  }

  useEffect(() =>
  {
    if(products.length > 0)
    {
      const tempData = [];
      for(const items in cartItems)
      {
        for(const item in cartItems[items])
        {
          if(cartItems[items][item] > 0)
          {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }

  },[cartItems,products]);

  return (
   <>
   <div className='border-t pt-14'>
    <div className='text-2xl mb-3'>
      <Title text1={"YOUR"} text2={"CART"} />
    </div>

    <div>
      {
        cartData.map((item,index) =>
        {
          const productData = products.find((product) => product._id.toString() === item._id);

          return(
            <div key={index} className='py-4 border-t border-b border-gray-500 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-300'>{item.size}</p>
                  </div>
                </div>
              </div>

              <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 bg-gray-300' />
              <img onClick={() => updateQuantity(item._id, item.size, 0)} src={Assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer navbar-icon' alt="" />
            </div>
          )
        })
      }
    </div>
    {
      !cartData.length > 0 &&
      (
        <div className='text-3xl text-center'>
          <p className='font-semibold text-gray-600'>Your Cart Is Empty</p>
          <p className='font-medium mt-2'>Add Items In The Cart To Proceed Further</p>
          </div>
      )
    }
    {
      cartData.length > 0 &&
      (
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <div className='w-full text-end'>
              <button onClick={checkSignIn} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      )
    }
   </div>
   </>
  )
}

export default Cart