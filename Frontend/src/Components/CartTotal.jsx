import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext.jsx'
import Title from './Title.jsx';

const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount, cartItems, products } = useContext(ShopContext);

    // checking if any item is out of stock
    let hasOutOfStock = false;

    for(const productId in cartItems)
    {
        const product = products.find(p => p._id === productId);
        if(product && product.stock <= 0)
        {
            hasOutOfStock = true;
            break;
        }
    }

  return (
    <>
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={"CART"} text2={"TOTALS"} />
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>SubTotal</p>
                <p>{currency}{getCartAmount()}.00</p>
            </div>
            <hr className='border-1 border-gray-500' />
            <div className='flex justify-between'>
                <p>Shipping Fee(Inclusive of all the taxes)</p>
                <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr className='border-1 border-gray-500' />
            <div className='flex justify-between'>
                <b>TOTAL</b>
                <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
            </div>
        </div>
        {
            hasOutOfStock &&
            (
                <p className='text-red-600 text-lg mt-2'>
                    Some items in your cart are out of stock. Please remove them to continue
                </p>
            )
        }
    </div>
    </>
  )
}

export default CartTotal