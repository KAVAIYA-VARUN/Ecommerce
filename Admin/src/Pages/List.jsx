import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const List = ({token}) => {

  const [list,setList] = useState([]);
  const [stockInputs, setStockInputs] = useState({});
  const [updatedItems, setUpdatedItems] = useState({}); // to track ✓ shown items
  const navigate = useNavigate();

  const fetchList = async () =>
  {
    try
    {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if(response.data.success)
      {
        setList(response.data.products);
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

  const removeProduct = async (id) =>
  {
    try
    {
      const response = await axios.post(`${backendUrl}/api/product/remove`, {id}, {headers: {token}});

      if(response.data.success)
      {
        toast.success(response.data.message);
        await fetchList();
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

  const updateStock = async (id, currentStock) =>
  {
    const newStockToAdd = stockInputs[id];
    const parsedValue = Number(newStockToAdd);

    if(!newStockToAdd || isNaN(newStockToAdd) || parsedValue < 0)
    {
      toast.warn("Enter a valid non-negative stock number");
      return;
    }

    try
    {

      const updatedStock = Number(currentStock) + parsedValue;

      const response = await axios.post(`${backendUrl}/api/product/updatestock`, {id, stock: updatedStock}, {headers: {token}});

      if(response.data.success)
      {
        toast.success("Stock Updated");
        fetchList();
        setStockInputs((prev) => ({...prev, [id]: ""}));
        setUpdatedItems((prev) => ({...prev, [id]: true}));

        setTimeout(() =>
        {
          setUpdatedItems((prev) => 
          {
            const updated = {...prev};
            delete updated[id];
            return updated;
          });
        },1500);
      }
      else
      {
        toast.error(response.data.message);
      }
    }
    catch(error)
    {
      console.log(error);
      toast.error("Error updating Stock");
    }
  }

  useEffect(() =>
  {
    fetchList();
  },[]);

  return (
    <>
    <p className='mb-2'>ALL PRODUCTS LIST</p>
    <div className='flex flex-col gap-2'>
      {/* list table title */}
      <div  className='hidden md:grid grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-400 text-black text-sm'>
        <b>Image</b>
        <b>Edit</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Stock</b>
        <b className='text-center'>Action</b>
        <b>Add Stock</b>
      </div>

      {/* product list */}

      {
        list.map((item,index) =>
        (
          <div className='grid grid-cols-3 md:grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm border-gray-400' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <button onClick={() => navigate("/edit", {state: {productId: item._id}})} className='text-white font-semibold rounded-lg p-1 bg-black hover:bg-green-700 text-sm w-fit px-2'>Edit</button>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p>{item.stock}</p>
            <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            <div className='flex items-center'>
              <input type="number" value={stockInputs[item._id] || "" } onChange={(e) => setStockInputs((prev) => ({...prev, [item._id]: e.target.value}))} className='w-[60px] h-[36px] text-black border px-1' placeholder='+Stock' min={0} />
              <button onClick={() => updateStock(item._id,item.stock)} className='bg-green-500 text-white px-2 py-1 ml-2 rounded text-xs'>Save</button>
              {updatedItems[item._id] && <span className='text-green-600 font-bold'>✓</span>}
            </div>
          </div>
        ))
      }
    </div>
    </>
  )
}

export default List