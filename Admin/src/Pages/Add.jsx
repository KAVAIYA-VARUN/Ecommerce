import React, { useState } from 'react'
import { Assets } from '../assets/Assets'
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { toast } from 'react-toastify';

const Add = ({token}) => {

  const [image1,setImage1] = useState(false);
  const [image2,setImage2] = useState(false);
  const [image3,setImage3] = useState(false);
  const [image4,setImage4] = useState(false);

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller,setBestseller] = useState(false);
  const [sizes,setSizes] = useState([]);
  const [note,setNote] = useState("");
  const [stock, setStock] = useState("");

  const onSubmitHandler = async (e) =>
  {
    e.preventDefault();
    try
    {
      const formData = new FormData();

      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price.toString());
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("bestseller",bestseller ? "true" : "false");
      formData.append("sizes",JSON.stringify(sizes));
      formData.append("stock",stock.toString());
      formData.append("note",note);

      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);

      const response = await axios.post(`${backendUrl}/api/product/add`,formData,{headers: {token}});
      if(response.data.success)
      {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setNote("");
        setStock("");
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

  return (
    <>
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
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

    <div className='w-full'>
      <p className='mb-2'>Product Name</p>
      <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full max-w-[500px] px-3 py-2 placeholder-black' placeholder='Type Here' required />
    </div>

    <div className='w-full'>
      <p className='mb-2'>Product Description</p>
      <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" className='w-full max-w-[500px] px-3 py-2 placeholder-black' placeholder='Write Content Here' required />
    </div>

    <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
      <div>
        <p className='mb-2'>Product Category</p>
        <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2' required>
          <option value="" disabled>Select Category</option>
          {["Men", "Women", "Kids"].map((cat) => (
            <option
              key={cat}
              value={cat}
              style={{
                backgroundColor: category === cat ? "#000" : "#fff",
                color: category === cat ? "#fff" : "#000",
              }}
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className='mb-2'>Sub Category</p>
        <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2' required>
          <option value="" disabled>Select Sub Category</option>
          {["Clothing", "Shoes", "Watches", "Jewellery"].map((sub) => (
            <option
              key={sub}
              value={sub}
              style={{
                backgroundColor: subCategory === sub ? "#000" : "#fff",
                color: subCategory === sub ? "#fff" : "#000",
              }}
            >
              {sub}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className='mb-2'>Product Price</p>
        <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="text" placeholder='199' />
      </div>
    </div>
    
    <div>
      <p className='mb-2'>Product Sizes</p>
      <div className='flex gap-3'>
        <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev,"S"])}>
          <p className={`${sizes.includes("S") ? "bg-gray-700" : "bg-gray-300"} text-black px-3 py-1 cursor-pointer`}>S</p>
        </div>
        <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M"])}>
          <p className={`${sizes.includes("M") ? "bg-gray-700" : "bg-gray-300"} text-black px-3 py-1 cursor-pointer`}>M</p>
        </div>
        <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev,"L"])}>
          <p className={`${sizes.includes("L") ? "bg-gray-700" : "bg-gray-300"} text-black px-3 py-1 cursor-pointer`}>L</p>
        </div>
        <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev,"XL"])}>
          <p className={`${sizes.includes("XL") ? "bg-gray-700" : "bg-gray-300"} text-black px-3 py-1 cursor-pointer`}>XL</p>
        </div>
        <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev,"XXL"])}>
          <p className={`${sizes.includes("XXL") ? "bg-gray-700" : "bg-gray-300"} text-black px-3 py-1 cursor-pointer`}>XXL</p>
        </div>
      </div>
      <div className='flex gap-3 mt-2'>
        <div onClick={() => setSizes(prev => prev.includes("6") ? prev.filter(item => item !== "6") : [...prev,"6"])}>
          <p className={`${sizes.includes("6") ? "bg-gray-700" : "bg-gray-300"} text-black px-3 py-1 cursor-pointer`}>6</p>
        </div>
        <div onClick={() => setSizes(prev => prev.includes("7") ? prev.filter(item => item !== "7") : [...prev,"7"])}>
          <p className={`${sizes.includes("7") ? "bg-gray-700" : "bg-gray-300"} text-black px-3 py-1 cursor-pointer`}>7</p>
        </div>
        <div onClick={() => setSizes(prev => prev.includes("8") ? prev.filter(item => item !== "8") : [...prev,"8"])}>
          <p className={`${sizes.includes("8") ? "bg-gray-700" : "bg-gray-300"} text-black px-3 py-1 cursor-pointer`}>8</p>
        </div>
        <div onClick={() => setSizes(prev => prev.includes("9") ? prev.filter(item => item !== "9") : [...prev,"9"])}>
          <p className={`${sizes.includes("9") ? "bg-gray-700" : "bg-gray-300"} text-black px-3 py-1 cursor-pointer`}>9</p>
        </div>
        <div onClick={() => setSizes(prev => prev.includes("10") ? prev.filter(item => item !== "10") : [...prev,"10"])}>
          <p className={`${sizes.includes("10") ? "bg-gray-700" : "bg-gray-300"} text-black px-3 py-1 cursor-pointer`}>10</p>
        </div>
      </div>
      <div className='flex gap-3 mt-2'>
        <div onClick={() => setSizes(prev => prev.includes("One Size") ? prev.filter(item => item !== "One Size") : [...prev,"One Size"])}>
          <p className={`${sizes.includes("One Size") ? "bg-gray-700" : "bg-gray-300"} text-black px-3 py-1 cursor-pointer`}>One Size</p>
        </div>
      </div>
    </div>

    <div className='w-full'>
      <p className='mb-2'>Stock</p>
      <input onChange={(e) => setStock(e.target.value)} value={stock} type="text" className='w-full max-w-[500px] px-3 py-2 placeholder-black' placeholder='Type Here' required />
    </div>

    <div className='w-full'>
      <p className='mb-2'>Note</p>
      <input onChange={(e) => setNote(e.target.value)} value={note} type="text" className='w-full max-w-[500px] px-3 py-2 placeholder-black' placeholder='Type Here'  />
    </div>

    <div className='flex gap-2 mt-2'>
      <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
      <label className='cursor-pointer' htmlFor="bestseller">Add To Bestseller</label>
    </div>

    <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
    </>
  )
}

export default Add