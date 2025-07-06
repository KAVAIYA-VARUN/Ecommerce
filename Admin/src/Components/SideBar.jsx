import React from 'react'
import { NavLink } from 'react-router-dom'
import { Assets } from '../assets/Assets'

const SideBar = () => {
  return (
    <>
    <div className='w-[18%] min-h-screen border-r-2 border-gray-600'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15p'>
            <NavLink className="flex items-center gap-3 border border-gray-600 border-r-0 px-3 py-2 rounded-l bg-gray-400 text-black" to="/">
            <img src={Assets.dashboard_icon} className='w-5 h-5' alt="" />
            <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-600 border-r-0 px-3 py-2 rounded-l bg-gray-400 text-black" to="/add">
            <img src={Assets.add_icon} className='w-5 h-5' alt="" />
            <p className='hidden md:block'>Add Items</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-600 border-r-0 px-3 py-2 rounded-l bg-gray-400 text-black" to="/list">
            <img src={Assets.order_icon} className='w-5 h-5' alt="" />
            <p className='hidden md:block'>List Items</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-600 border-r-0 px-3 py-2 rounded-l bg-gray-400 text-black" to="/edit">
            <img src={Assets.edit} className='w-5 h-5' alt="" />
            <p className='hidden md:block'>Edit Items</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-600 border-r-0 px-3 py-2 rounded-l bg-gray-400 text-black" to="/orders">
            <img src={Assets.order_icon} className='w-5 h-5' alt="" />
            <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
    </>
  )
}

export default SideBar