import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmitHandler = async(e) =>
  {
    e.preventDefault();
    try
    {
      // for sign up api
      if(currentState === "Sign Up")
      {
        const response = await axios.post(`${backendUrl}/api/user/register`,{name, email, password, phone});
        if(response.data.success)
        {
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
        }
        else
        {
          toast.error(response.data.message);
        }
      }
      else
      {
        const response = await axios.post(`${backendUrl}/api/user/login`,{email,password, phone});
        if(response.data.success)
        {
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
        }
        else
        {
          toast.error(response.data.message);
        }
      }
    }
    catch(error)
    {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() =>
  {
    if(token)
    {
      navigate("/");
    }
  },[token]);

  return (
    <>
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800 mt-0'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {
        currentState === "Login" ? "" : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 placeholder-black bg-gray-300' placeholder='Name' required/>
      }
      <input onChange={(e) =>
        {
          const input = e.target.value;
          if(/^\d{0,10}$/.test(input))
          {
            setPhone(input);
          }
        }
      } value={phone} type="text" inputMode="numeric" maxLength="10" className='w-full px-3 py-2 placeholder-black bg-gray-300' placeholder='Phone Number' pattern="\d{10}" required/>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 placeholder-black bg-gray-300' placeholder='Email Address' required/>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 placeholder-black bg-gray-300' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer text-blue-800'>Forgot Your Password?</p>
        {
          currentState === "Login"
          ? <p onClick={() => setCurrentState("Sign Up")} className='cursor-pointer font-semibold text-orange-800'>Create Account</p>
          : <p onClick={() => setCurrentState("Login")} className='cursor-pointer font-semibold text-orange-800'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-semibold px-8 py-2 mt-4'>{currentState === "Login" ? "Sign In" : "Sign Up"}</button>
    </form>
    </>
  )
}

export default Login