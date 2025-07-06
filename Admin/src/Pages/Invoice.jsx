import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import { backendUrl } from '../App.jsx';
import BUYMELOGO4 from "../assets/BUYMELOGO4.png";
import { useRef } from 'react';

const Invoice = ({token}) => {

    const [invoiceData, setInvoiceData] = useState(null);
    const printRef = useRef();
    const shippingFee = 20;

    const handlePrint = () =>
    {
      window.print();
    }

    useEffect(() =>
    {
        const fetchInvoiceData = async () =>
        {
            try
            {
                const res = await axios.get(`${backendUrl}/api/order/invoice-orders`, {headers: {token}});
                if(!res.data || !res.data.orders || res.data.orders.length === 0)
                {
                    toast.error("No Orders Found");
                    return;
                }
                setInvoiceData(res.data);
            }
            catch(error)
            {
                console.log(error);
                toast.error(error.message);
            }
        }

        if(token)
        {
            fetchInvoiceData();
        }
    },[token]);

    if(!invoiceData)
    {
        return <div className='p-10 text-center'>Loading invoice...</div>;
    }

    const { user, orders } = invoiceData;
    const latestOrder = orders[orders.length - 1];

  return (
    <>
    <div ref={printRef} id="invoice" className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg text-gray-800 print:shadow-none print:p-0 print:rounded-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <img className="w-32 h-32 object-contain" src={BUYMELOGO4} alt="Logo" />
          <div className="text-right">
            <h2 className="text-3xl font-bold">INVOICE</h2>
            <p className="text-sm">ORDER ID: <span className="font-medium">#{latestOrder?._id}</span></p>
            <p className="text-sm">DATE: <span className="font-medium">{new Date(latestOrder?.date).toLocaleDateString()}</span></p>
          </div>
        </div>
        <hr className="border-gray-800 mb-4" />

        {/* Customer Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Customer Info</h3>
          <p>Name: {user?.name}</p>
          <p>
            Address: {latestOrder?.address?.city}, {latestOrder?.address?.state},{' '}
            {latestOrder?.address?.country} - {latestOrder?.address?.pincode}
          </p>
          <p>Email: {user?.email}</p>
          <p>Phone: {user?.phone}</p>
        </div>
        <hr className="border-gray-800 mb-4" />

        {/* Billing Info */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Bill From:</h3>
            <p>BuyMe Pvt Ltd</p>
            <p>Near Crystall Mall, Jamnagar - 361008</p>
            <p>+91 9408118601</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Bill To:</h3>
            <p>{user?.name}</p>
            <p>
              {latestOrder?.address?.city}, {latestOrder?.address?.state},{' '}
              {latestOrder?.address?.country} - {latestOrder?.address?.pincode}
            </p>
            <p>{user?.phone}</p>
          </div>
        </div>
        <hr className="border-gray-800 mb-4" />

        {/* Orders Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Orders</h3>
        </div>

        {/* Order Table */}
        <div className="mb-6">
          <div className="grid grid-cols-4 font-semibold border-b border-gray-400 pb-2">
            <p>Item</p>
            <p>Quantity</p>
            <p>Size</p>
            <p>Amount</p>
          </div>
          {latestOrder?.items?.map((item, index) => (
            <div key={index} className="grid grid-cols-4 py-2 border-b border-gray-200">
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              <p>{item.size}</p>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
        <hr className="border-gray-800 mb-4" />

        {/* Payment Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <p>Name: {latestOrder?.paymentMethod}</p>
          <p>Status: {latestOrder?.payment ? 'Paid' : 'Pending'}</p>
        </div>
        <hr className="border-gray-800 mb-4" />

        {/* Totals */}
        <div className="text-right space-y-1 mb-6">
          <p>Subtotal: ₹{latestOrder?.amount}</p>
          <p>Shipping Fee: ₹{shippingFee}</p>
          <p className="font-bold text-xl">
            Total: ₹{parseInt(latestOrder?.amount) + shippingFee}
          </p>
        </div>
      </div>

      <div className="text-center mt-6 print:hidden">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition font-bold"
          >
            Print Invoice
          </button>
        </div>
    </>
  )
}

export default Invoice