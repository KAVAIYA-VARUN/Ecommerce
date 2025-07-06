import React, {useEffect} from "react";
import './index.css';
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Collection from "./Pages/Collection.jsx";
import About from "./Pages/About.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import Product from "./Pages/Product.jsx";
import Login from "./Pages/Login.jsx";
import Profile from "./Pages/Profile.jsx";
import Cart from "./Pages/Cart.jsx";
import Navbar from "./Components/Navbar.jsx";
import MyOrders from "./Pages/MyOrders.jsx";
import Footer from "./Components/Footer.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlaceOrder from "./Pages/PlaceOrder.jsx";
import Verify from "./Pages/Verify.jsx";
import Address from "./Pages/Address.jsx";

function App() {

  useEffect(() =>
  {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark")
    {
      document.documentElement.classList.add("dark");
    }
    else
    {
      document.documentElement.classList.remove("dark");
    }
}, []);

  return (
    <>
  <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <ToastContainer />
    <Navbar />
    <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myOrders" element={<MyOrders />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/address" element={<Address />} />
      </Routes>
      <Footer />
  </div>
    </>
  )
}

export default App
