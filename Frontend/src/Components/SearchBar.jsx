import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Assets } from '../assets/Assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() =>
    {
        if(location.pathname.includes("collection"))
        {
            setVisible(true);
        }
        else
        {
            setVisible(false);
        }
    },[location]);

  return showSearch && visible ?  (
    <>
    <div className='border-t border-b bg-[#F5E8DF] mb-5 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-600 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='flex-1 outline-none bg-inherit text-sm '/>
        <img src={Assets.search_icon} className='w-4' alt="" />
        </div>
        <img onClick={() => setShowSearch(false)} src={Assets.cross_icon} className='inline w-3 cursor-pointer' alt="" />
    </div>
    </>
  ) : null
}

export default SearchBar