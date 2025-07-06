import React, { useState,useEffect } from 'react'
import { Assets } from '../assets/Assets';
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Edit = ({token}) => {

    const [productId, setProductId] = useState("");
    const [image1,setImage1] = useState(false);
    const [image2,setImage2] = useState(false);
    const [image3,setImage3] = useState(false);
    const [image4,setImage4] = useState(false);
    const [newPrice,setNewPrice] = useState("");
    const [newBestseller,setNewBestseller] = useState(false);

    const location = useLocation();

    useEffect(() =>
    {
        if(location.state?.productId)
        {
          setProductId(location.state.productId);
        }
    },[location]);

    const onSubmitHandler = async (e) =>
    {
        e.preventDefault();
        try
        {
            const newFormData = new FormData();
            
            newFormData.append("productId", productId);
            newFormData.append("newPrice", newPrice.toString());
            newFormData.append("bestseller", newBestseller ? "true" : "false");
            image1 && newFormData.append("image1",image1);
            image2 && newFormData.append("image2",image2);
            image3 && newFormData.append("image3",image3);
            image4 && newFormData.append("image4",image4);

            const response = await axios.post(`${backendUrl}/api/product/edit`, newFormData, {headers: {token}});
            if(response.data.success)
            {
                toast.success(response.data.message);
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setNewPrice("");
                setProductId("");
                setNewBestseller(false);
            }
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.message);
        }
    }

  return (
    <>
    <form onSubmit={onSubmitHandler}>
        <div>
            <div className='w-full'>
            <p className='mb-2'>Product ID</p>
            <input onChange={(e) => setProductId(e.target.value)} value={productId} type="text" className='w-full max-w-[300px] px-3 py-2 placeholder-black' placeholder='Type Here' required />
            </div>
        </div>

        <div>
              <p className='mb-2'>Upload Image</p>
              
              <div className='flex gap-2'>
                <label htmlFor="image1">
                  <img className='w-20 cursor-pointer' src={!image1 ? Assets.upload_area : URL.createObjectURL(image1)} alt="" />
                  <p className='mt-1 ml-5'>Front</p>
                  <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                </label>
                <label htmlFor="image2">
                  <img className='w-20 cursor-pointer' src={!image2 ? Assets.upload_area : URL.createObjectURL(image2)} alt="" />
                  <p className='mt-1 ml-5'>Left</p>
                  <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                </label>
                <label htmlFor="image3">
                  <img className='w-20 cursor-pointer' src={!image3 ? Assets.upload_area : URL.createObjectURL(image3)} alt="" />
                  <p className='mt-1 ml-5'>Right</p>
                  <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                </label>
                <label htmlFor="image4">
                  <img className='w-20 cursor-pointer' src={!image4 ? Assets.upload_area : URL.createObjectURL(image4)} alt="" />
                  <p className='mt-1 ml-5'>Back</p>
                  <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                </label>
              </div>
            </div>

        <div>
            <p className='mb-2'>New Price</p>
            <input onChange={(e) => setNewPrice(e.target.value)} value={newPrice} className='w-full px-3 py-2 sm:w-[120px]' type="text" placeholder='199' />
        </div>

        <div className='flex gap-2 mt-2'>
            <input onChange={() => setNewBestseller(prev => !prev)} checked={newBestseller} type="checkbox" id="bestseller" />
            <label className='cursor-pointer' htmlFor="bestseller">Add To Bestseller</label>
        </div>

        <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>Update</button>
    </form>
    </>
  )
}

export default Edit