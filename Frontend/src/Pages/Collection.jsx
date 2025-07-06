import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Assets } from '../assets/Assets';
import Title from '../Components/Title';
import ProductItem from '../Components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) =>
  {
    if(category.includes(e.target.value))
    {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else
    {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) =>
  {
    if(subCategory.includes(e.target.value))
    {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else
    {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () =>
  {
    let productsCopy = products.slice();

    if(showSearch && search)
    {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0)
    {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

     if(subCategory.length > 0)
    {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  const sortProducts = () =>
  {
    let fpCopy = filterProducts.slice();

    switch(sortType)
    {
      case "low-high":
      setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)));
      break;

      case "high-low":
      setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)));
      break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() =>
  {
    applyFilter();
  },[category,subCategory, search, showSearch, products]);

  useEffect(() =>
  {
    sortProducts();
  },[sortType]);

  return (
   <>
   <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

    {/* Filter Options */}

    <div className='min-w-60'>
      <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 font-semibold'>
        FILTERS
        <img src={Assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter} ? "rotate-90" : "" `} alt="" />
      </p>

      {/* Category Filter */}

      <div className={`border border-gray-500 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORY</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input onChange={toggleCategory} type="checkbox" className='w-3' value={"Men"} />Men
          </p>
          <p className='flex gap-2'>
            <input onChange={toggleCategory} type="checkbox" className='w-3' value={"Women"} />Women
          </p>
          <p className='flex gap-2'>
            <input onChange={toggleCategory} type="checkbox" className='w-3' value={"Kids"} />Kids
          </p>
        </div>
      </div>

      {/* Subcategory Filter */}

       <div className={`border border-gray-500 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
        <p className='mb-3 text-sm font-medium'>TYPE</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input onChange={toggleSubCategory} type="checkbox" className='w-3' value={"Clothing"} />Clothing
          </p>
          <p className='flex gap-2'>
            <input onChange={toggleSubCategory} type="checkbox" className='w-3' value={"Shoes"} />Shoes
          </p>
          <p className='flex gap-2'>
            <input onChange={toggleSubCategory} type="checkbox" className='w-3' value={"Watches"} />Watches
          </p>
          <p className='flex gap-2'>
            <input onChange={toggleSubCategory} type="checkbox" className='w-3' value={"Jewellery"} />Jewellery
          </p>
        </div>
      </div>

    </div>

    {/* Right Side */}

    <div className='flex-1'>

      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={"ALL"} text2={"COLLECTIONS"} />

        {/* Product Sorting */}

        <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-600 text-sm px-2 bg-[#F5E8DF]'>
          <option value="relavent">Sort By: Relavent</option>
          <option value="low-high">Sort By: Low To High</option>
          <option value="high-low">Sort By: High To Low</option>
        </select>

      </div>

      {/* Map Products */}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filterProducts.map((item,index) =>
          (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))
        }
      </div>

    </div>

   </div>
   </>
  )
}

export default Collection