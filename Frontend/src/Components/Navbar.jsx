import React,{ useContext, useEffect, useState } from "react";
import { Assets } from "../assets/Assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext.jsx";

const Navbar = () => {

    const [visible,setVisible] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () =>
    {
        navigate("/login");
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
    }

    const toggleDarkMode = () =>
    {
        const htmlElement = document.documentElement;
        const isDark = htmlElement.classList.contains("dark");

        if(isDark)
        {
            htmlElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
        else
        {
            htmlElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    }

    useEffect(() =>
    {
        if(visible)
        {
            document.body.style.overflow = "hidden";
        }
        else
        {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [visible]);

    return (
    <>
    <div className="sticky top-0 z-50 bg-[#F5E8DF] dark:bg-[#262424]">
    <div className="flex items-center justify-between px-4 py-2 font-medium">

        <Link to="/">
            <img src={Assets.BUYMELOGO4} className="w-40" alt="Logo" />
        </Link>

        <ul className="hidden sm:flex gap-5 text-l text-gray-700 dark:text-white">

            <NavLink to="/" className="flex flex-col items-center gap-1">
                <p>HOME</p>
            </NavLink>

            <NavLink to="/collection" className="flex flex-col items-center gap-1">
                <p>COLLECTION</p>
            </NavLink>

            <NavLink to="/contactus" className="flex flex-col items-center gap-1">
                <p>CONTACT_US</p>
            </NavLink>

            <NavLink to="/about" className="flex flex-col items-center gap-1">
                <p>ABOUT</p>
            </NavLink>

        </ul>

        <div className="flex items-center gap-6">

            <img onClick={() => setShowSearch(true)} src={Assets.search_icon} className="w-5 cursor-pointer navbar-icon" alt="" />

            <div className="group relative">
                <img onClick={() => token ? null : navigate("/login")} src={Assets.profile_icon} className="w-5 cursor-pointer navbar-icon" alt="" />
                {
                    token && (
                        <div className="hidden group-hover:block absolute right-0 pt-4 z-50">
                            <div className="flex flex-col dark:bg-[#1a1a1a] dark:text-white gap-2 w-36 py-3 px-5 bg-slate-200 text-gray-600 rounded-xl">
                                <Link to="/profile"><p className="cursor-pointer hover:text-black">My Profile</p></Link>
                                <Link to="/myOrders"><p className="cursor-pointer hover:text-black">My Orders</p></Link>
                                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                            </div>
                        </div>
                    )
                }
            </div>

            <Link to="/cart" className="relative">
                <img src={Assets.cart_icon} className="w-5 navbar-icon" alt="" />
                <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                    {getCartCount()}
                </p>
            </Link>

            <div>
                <img onClick={toggleDarkMode} src={Assets.mode_change_icon} className="w-7 cursor-pointer navbar-icon" alt="" />
            </div>

            <img onClick={() => setVisible(true)} src={Assets.menu_icon} className="w-5 cursor-pointer sm:hidden navbar-icon" alt="" />

        </div>
    </div>
    </div>

    {/* Mobile Sidebar */}
    {
        visible && (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
                onClick={() => setVisible(false)}
            ></div>

            {/* Sidebar */}
            <div
                className="fixed top-0 left-0 w-full h-screen z-50 bg-white dark:bg-[#1a1a1a] overflow-y-auto sm:hidden transition-all duration-300"
            >
                <div className="flex flex-col text-gray-700 dark:text-white">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-4 cursor-pointer border-b">
                        <img src={Assets.dropdown_icon} className="h-4 rotate-180" alt="" />
                        <p className="text-sm font-medium">Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/">HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/collection">COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/contactus">CONTACTUS</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/about">ABOUT</NavLink>
                </div>
            </div>
        </>
        )
    }
    </>
    )
}

export default Navbar;
