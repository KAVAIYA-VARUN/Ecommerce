import React from 'react'
import { Assets } from "../assets/Assets.js";

const NavBar = ({setToken}) => {
  return (
    <>
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img src={Assets.admin_logo} className='w-[max(10%,80px)]' alt="" />
          <p className='font-semibold'>Welcome, Admin</p>
        <button onClick={() => setToken("")} className='bg-black ml-5 mt-0 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
    </>
  )
}

export default NavBar