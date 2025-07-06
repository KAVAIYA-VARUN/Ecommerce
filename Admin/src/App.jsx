import React, { useState } from "react"
import NavBar from "./Components/NavBar.jsx"
import SideBar from "./Components/SideBar.jsx"
import { Routes, Route } from "react-router-dom";
import Add from "./Pages/Add.jsx";
import List from "./Pages/List.jsx";
import Orders from "./Pages/Orders.jsx";
import Login from "./Components/Login.jsx";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Dashboard from "./Pages/Dashboard.jsx";
import Invoice from "./Pages/Invoice.jsx";
import Edit from "./Pages/Edit.jsx";

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

  useEffect(() =>
  {
    localStorage.setItem("token", token);
  },[token]);

  return (
    <>
    <div className="min-h-screen">
      <ToastContainer />
      { token === "" ? <Login setToken={setToken} /> : <>
      <NavBar setToken={setToken} />
      <hr className="border border-gray-600" />
      <div className="flex w-full">
        <SideBar />
        <div className="w-[70%] mx-auto ml-[max(fvw,25px)] my-8 text-gray-600 text-base ">
          <Routes>
            <Route path="/" element={<Dashboard token={token} />} />
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
            <Route path="/invoice-orders/:orderId" element={<Invoice token={token} />} />
            <Route path="/edit" element={<Edit token={token} />} />
          </Routes>
        </div>
      </div>
      </>
      }
      </div>
    </>
  )
}

export default App
