import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from "axios";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import { Assets } from '../assets/Assets.js';

const Orders = ({token}) => {

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchAllOrders = async () =>
  {
    if(!token)
    {
      return null;
    }

    try
    {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, {headers: {token}});
      if(response.data.success)
      {
        setOrders(response.data.orders.reverse());
      }
      else
      {
        toast.error(response.data.message);
      }
    }
    catch(error)
    {
      console.log(error);
      toast.error(error.message);
    }
  }

  const statusHandler = async (e, orderId) =>
  {
    try
    {
      const response = await axios.post(`${backendUrl}/api/order/status`, {orderId, status:e.target.value}, {headers: {token}});
      if(response.data.success)
      {
        await fetchAllOrders();
      }
    }
    catch(error)
    {
      console.log(error);
      toast.error(error.message);
    }
  }

  const fetchAllProducts = async () =>
  {
    try
    {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      
      if(res.data?.products)
      {
        setProducts(res.data.products);
      }
    }
    catch(error)
    {
      console.log(error);
      toast.error(error.message);
    }
  }

  const getNoteForProduct = (productId) =>
  {
    const product = products.find((p) => p._id === productId);
    if(!product)
    {
      console.warn(`No product found for ID: ${productId}`);
      return "-";
    }
    return product?.note || "-";
  }

  useEffect(() =>
  {
    fetchAllOrders();
    fetchAllProducts();
  },[token]);

  return (
    <>
    <div>
      <h3 className='font-semibold text-black'>Order Page</h3>
      <div>
        {
          orders.map((order,index) =>
          (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-600 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 ' key={index}>
              <div className='flex flex-col gap-2'>
                {order.items.map((item, index) => (
                  <img
                    key={index}
                    src={item.image[0]}
                    alt={item.name}
                    className='w-20 h-20 object-cover rounded'
                  />
                ))}
              </div>
            <div>
              <div>
              {order.items.map((item, index) => {
                const note = getNoteForProduct(item._id);
                const isLast = index === order.items.length - 1;

                return (
                  <p className='py-0.5' key={index}>
                    <span className="text-gray-600 mr-2 font-bold text-xl">{note}:</span>
                    {item.name} x {item.quantity} <span>{item.size}</span>{!isLast && ','}
                  </p>
                );
              })}
            </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.pincode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "DONE" : "PENDING"}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select onChange={(e) => statusHandler(e,order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default Orders