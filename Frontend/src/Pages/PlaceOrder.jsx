import React, { useContext, useState, useEffect } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { Assets } from '../assets/Assets'
import { ShopContext } from '../Context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const [method, setMethod] = useState("cod"); // this might need to change in capital letters COD
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  // Check if any product in the cart has stock <= 0
const hasOutOfStock = Object.keys(cartItems).some(productId =>
{
  const product = products.find(p => p._id === productId);
  return product && product.stock <= 0;
});

  const [formData, setFormData] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      phone: "",
    }
  );

  const onChangeHandler = (e) =>
  {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({...data,[name]: value})); // this will store the data entered by the user in the formdata
  }

  const onSubmitHandler = async (e) =>
  {
    e.preventDefault();
    try
    {
      let orderItems = [];

      for(const items in cartItems)
      {
        for(const item in cartItems[items])
        {
          if(cartItems[items][item])
          {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if(itemInfo)
            {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];

              // checking for the stock availability
              if(itemInfo.stock <= 0)
              {
                toast.error(`${itemInfo.name} is out of stock.`);
                return; // stopping the user to place the order
              }

              orderItems.push(itemInfo);
            }
          }
        }
      }
      
      let orderData =
      {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch(method)
      {
        // api for cod
        case 'cod':
        {
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {headers: {token}});
          if(response.data.success)
          {
            setCartItems({});
            navigate("/myorders");
          }
          else
          {
            toast.error(response.data.message);
          }
          break;
        }

        case 'stripe':
        {
          const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, orderData, {headers: {token}});
          if(responseStripe.data.success)
          {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          }
          else
          {
            toast.error(responseStripe.data.message);
          }

          break;
        }

        default:
          break;
      }

    }
    catch(error)
    {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() =>
{
  const fetchUserAddress = async () =>
  {
    try
    {
      const res = await axios.get(`${backendUrl}/api/user/profile`, { headers: { token } });
      const user = res.data;

      if(user)
      {

        const selectedIndex = Number(localStorage.getItem("selectedAddressIndex")) || -1;

         // Check if address exists
        if(!user.address || user.address.length === 0)
        {
          toast.warn("Please add an address before placing an order.");
          navigate("/address");
          return;
        }

        // Validate selected address
        const selectedAddress = user.address[selectedIndex] || user.address[0];

        const nameParts = user.name.split(" ");

        setFormData(prev => ({
          ...prev,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          street: selectedAddress.street || "",
          city: selectedAddress.city || "",
          state: selectedAddress.state || "",
          pincode: selectedAddress.pincode || "",
          country: selectedAddress.country || "",
          email: user.email || "",
          phone: user.phone?.toString() || ""
        }));
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }

  if(token)
  {
    fetchUserAddress();
  }
}, [token]);


  return (
    <>
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
        {/* Left Side */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
            <div className='text-xl sm:text-2xl my-3'>
                <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            </div>
            <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
              <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
            </div>
            <input required onChange={onChangeHandler} name="email" value={formData.email} type="email" placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
            <input required onChange={onChangeHandler} name="street" value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
            <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name="city" value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
              <input required onChange={onChangeHandler} name="state" value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
            </div>
            <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name="pincode" value={formData.pincode} type="number" placeholder='Pincode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
              <input required onChange={onChangeHandler} name="country" value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
            </div>
            <input required onChange={onChangeHandler} name="phone" value={formData.phone} type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-300' />
        </div>
        {/* Right Side */}
        <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <CartTotal />
          </div>
          <div className='mt-12'>
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            {/* Payment Method Selection */}
            <div className='flex gap-3 flex-col lg:flex-row'>
              <div onClick={() => setMethod("stripe")} className='flex items-center gap-3 p-2 px-3 cursor-pointer border-2 border-gray-500'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-600" : ""}`}></p>
                <img src={Assets.stripe_logo} className='h-5 mx-4' alt="" />
              </div>
              <div onClick={() => setMethod("razorpay")} className='flex items-center gap-3 p-2 px-3 cursor-pointer border-2 border-gray-500'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-600" : ""}`}></p>
                <img src={Assets.razorpay_logo} className='h-5 mx-4' alt="" />
              </div>
              <div onClick={() => setMethod("cod")} className='flex items-center gap-3 p-2 px-3 cursor-pointer border-2 border-gray-500'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-600" : ""}`}></p>
                <p className='text-gray-500 text:sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>
            {hasOutOfStock && (
            <p className="text-red-600 text-sm mt-4">
              ⚠️ One or more items in your cart are out of stock.
            </p>
            )}
            <div className='w-full text-end mt-8'>
              <button type='submit' disabled={hasOutOfStock} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>
          </div>
        </div>
    </form>
    </>
  )
}

export default PlaceOrder