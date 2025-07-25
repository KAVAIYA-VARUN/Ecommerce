import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

// context is use to access the data and the function in any other components

const ShopContextProvider = (props) =>
{

    const currency = "₹";
    const delivery_fee = 20;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const addToCart = async(itemId, size) =>
    {
        if(!size)
        {
            return { success: false, message: "Select Product Size" };
        }

        // getting the latest product data before adding to the cart
        const response = await axios.post(`${backendUrl}/api/product/single`, {productId : itemId});
        const product = response.data;

        if(product.stock <= 0)
        {
            return { success: false, message: "Item is out of stock" };
        }

        let cartData = structuredClone(cartItems);
        // structuredClone will make the copy of the cart items

        if(cartData[itemId])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size] += 1;
            }
            else
            {
                cartData[itemId][size] = 1;
            }
        }
        else
        {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if(token)
        {
            try
            {
                await axios.post(`${backendUrl}/api/cart/add`,{itemId, size}, {headers: {token}});
                return { success: true, message: "Product Added to Cart" };
            }
            catch(error)
            {
                console.log(error);
                return { success: false, message: error.message };
            }
        }
    }

    const getCartCount = () =>
    {
        let totalCount = 0;
        for(const items in cartItems) // this loop will iterate the products
        {
            for(const item in cartItems[items]) // this loop will select the size
            {
                try
                {
                    if(cartItems[items][item])
                    {
                        totalCount += cartItems[items][item];
                    }
                }
                catch(error)
                {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) =>
    {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if(token)
        {
            try
            {
                await axios.post(`${backendUrl}/api/cart/update`, {itemId,size,quantity}, {headers: {token}});
            }
            catch(error)
            {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () =>
    {
        let totalAmount = 0;
        for(const items in cartItems)
        {
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items])
            {
                try
                {
                    if(cartItems[items][item] > 0)
                    {
                        totalAmount += itemInfo.price * cartItems[items][item];
                        // note : here cartItems[items][item] is the quantity
                    }
                }
                catch(error)
                {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () =>
    {
        try
        {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if(response.data.success)
            {
                const fetchedProducts = response.data.products;

                const updatedProducts = fetchedProducts.map((newProduct) =>
                {
                    const existingProduct = products.find((p) => p._id === newProduct._id);

                    if(existingProduct && existingProduct.price !== newProduct.price)
                    {
                        return {...newProduct, oldPrice: existingProduct.price}
                    }
                    return newProduct;
                });
                setProducts(updatedProducts);
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

    const getUserCart = async (token) =>
    {
        try
        {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {headers: {token}});
            if(response.data.success)
            {
                setCartItems(response.data.cartData);
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
        getProductsData();
    },[]);

    useEffect(() =>
    {
        if(!token && localStorage.getItem("token"))
        {
            setToken(localStorage.getItem("token"));
            getUserCart(localStorage.getItem("token"));
        }
    },[]);

    const value =
    {
        currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount,
        navigate,
        backendUrl, products,
        token, setToken,
        setCartItems,
        getProductsData
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;