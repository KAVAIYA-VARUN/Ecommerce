import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, LogOut, Settings, Save } from 'lucide-react';
import Title from '../Components/Title.jsx';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext.jsx';
import { toast } from 'react-toastify';

const Address = () =>
{
    const [user, setUser] = useState(null);
    const { backendUrl, token, setCartItems, setToken, navigate } = useContext(ShopContext);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [country, setCountry] = useState("");

    const onSubmitHandler = async (e) =>
    {
        e.preventDefault();

        if(!/^\d{6}$/.test(pincode))
        {
            toast.error("Pincode must be exactly 6 digits");
            return;
        }

        try
        {
            const addressData =
            {
                street,
                city,
                state,
                pincode,
                country
            };

            const response = await axios.post(`${backendUrl}/api/user/address`, addressData, {
                headers: { token }
            });

            if(response.data.success)
            {
                toast.success("Address saved successfully");
                fetchUser();
            }
            else
            {
                toast.error(response.data.message || "Failed to save address");
            }
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.message);
        }
    }

    const logout = () =>
    {
        navigate("/login");
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
    }

    const fetchUser = async () =>
    {
        try
        {
            const response = await axios.get(`${backendUrl}/api/user/profile`, { headers: { token } });
            setUser(response.data);
        }
        catch (error)
        {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() =>
    {
        if (token)
        {
            fetchUser();
        }
    }, [token]);

    if (!user)
    {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#F5E8DF] dark:bg-gray-900 text-xl font-semibold text-gray-800 dark:text-white">
                Loading your profile...
            </div>
        )
    }

    return (
        <>
        <div className="min-h-screen bg-[#F5E8DF] dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-3xl text-center mb-10">
                    <Title text1={"Add"} text2={"Address"} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-[#FCD8CD] dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="h-10 w-10 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                            </div>
                            <nav className="space-y-2">
                                <Link to="/profile" className="flex items-center space-x-3 px-4 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 rounded-lg">
                                    <User className="h-5 w-5" />
                                    <span>Profile</span>
                                </Link>
                                <Link to="/myOrders" className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                                    <Package className="h-5 w-5" />
                                    <span>My Orders</span>
                                </Link>
                                <button onClick={logout} className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg">
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Address Form */}
                    <div className="md:col-span-2">
                        <div className="bg-[#FCD8CD] dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Delivery Address</h2>
                            </div>

                            <form onSubmit={onSubmitHandler} className="space-y-4">
                                <input onChange={(e) => setStreet(e.target.value)} value={street} required name="street" type="text" placeholder="Street" className="border border-gray-300 rounded py-2 px-3 w-full bg-gray-300" />
                                <div className="flex gap-4">
                                    <input onChange={(e) => setCity(e.target.value)} value={city} required name="city" type="text" placeholder="City" className="border border-gray-300 rounded py-2 px-3 w-full bg-gray-300" />
                                    <input onChange={(e) => setState(e.target.value)} value={state} required name="state" type="text" placeholder="State" className="border border-gray-300 rounded py-2 px-3 w-full bg-gray-300" />
                                </div>
                                <div className="flex gap-4">
                                    <input onChange={(e) => setPincode(e.target.value)} value={pincode} required name="pincode" type="number" placeholder="Pincode" className="border border-gray-300 rounded py-2 px-3 w-full bg-gray-300" />
                                    <input onChange={(e) => setCountry(e.target.value)} value={country} required name="country" type="text" placeholder="Country" className="border border-gray-300 rounded py-2 px-3 w-full bg-gray-300" />
                                </div>

                                <button type='submit' className="flex items-center space-x-2 bg-black font-semibold text-white p-2 rounded-lg dark:text-blue-400 hover:bg-green-800 hover:text-white">
                                    <Save className="h-4 w-4" />
                                    <span>Save</span>
                                </button>
                            </form>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link to="/myOrders" className="bg-[#FCD8CD] dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                                        <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Orders</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Track your orders</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/" className="bg-[#FCD8CD] dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                                        <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Continue Shopping</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Explore products</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Address;
