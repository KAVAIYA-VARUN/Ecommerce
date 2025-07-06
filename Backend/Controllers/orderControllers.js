import orderModel from "../Models/orderModel.js"
import productModel from "../Models/productModel.js";
import userModel from "../Models/userModel.js";
import Stripe from "stripe";
import validator from "validator";

// Global Variables
const currency = "usd";
const deliveryCharge = 20;

// initializing the payment gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Placing order using COD method
const placeOrder = async (req,res) =>
{
    try
    {
        const { userId, items, amount, address } = req.body;

        const { firstName, lastName, email, phone, city, state, country, pincode } = address;

        // validation part

        // First name validation
        if (!/^[A-Za-z\s]+$/.test(firstName) || firstName.length < 4)
        {
            return res.json({ success: false, message: "First name must contain only characters and be at least 4 characters long" });
        }

        // Last name validation
        if (!/^[A-Za-z\s]+$/.test(lastName) || lastName.length < 4)
        {
            return res.json({ success: false, message: "Last name must contain only characters and be at least 4 characters long" });
        }

        // Email validation
        if(!validator.isEmail(email))
        {
            return res.json({success:false, message: "Please Enter A Valid Email"});
        }

        // Phone must be 10 digits only
        if (!/^\d{10}$/.test(phone))
        {
            return res.json({ success: false, message: "Phone number must be exactly 10 digits" });
        }

        // City must be characters only
        if (!/^[A-Za-z\s]+$/.test(city))
        {
            return res.json({ success: false, message: "City must contain characters only" });
        }

        if (city.length < 3)
        {
            return res.json({ success: false, message: "Enter a Valid City" });
        }

        // State must be characters only
        if (!/^[A-Za-z\s]+$/.test(state))
        {
            return res.json({ success: false, message: "State must contain characters only" });
        }

        if (state.length < 3)
        {
            return res.json({ success: false, message: "Enter a Valid State" });
        }

        // Country must be characters only
        if (!/^[A-Za-z\s]+$/.test(country))
        {
            return res.json({ success: false, message: "Country must contain characters only" });
        }

        if (country.length < 4)
        {
            return res.json({ success: false, message: "Enter a Valid Country" });
        }

        // Pincode must be exactly 6 digits
        if (!/^\d{6}$/.test(pincode))
        {
            return res.json({ success: false, message: "Pincode must be a 6-digit number" });
        }

        // checking for the stock availability
        for(const item of items)
        {
            const product = await productModel.findById(item._id);
            if(!product || product.stock <= 0)
            {
                return res.json({success: false, message: `${item.name} is not available`});
            }
        }

        const orderData =
        {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // decrement of the stock after ordering
        for(const item of items)
        {
            await productModel.findByIdAndUpdate(item._id,
                {
                    $inc:
                    {
                        stock: -item.quantity
                    }
                }
            );
        }

        await userModel.findByIdAndUpdate(userId, {cartData: {}});
        res.json({success: true, message: "Order Placed"});
    }
    catch(error)
    {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Placing order using Stripe method
const placeOrderStripe = async (req,res) =>
{
    try
    {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        // checking for the stock availability
        for(const item of items)
        {
            const product = await productModel.findById(item._id);
            if(!product || product.stock <= 0)
            {
                return res.json({success: false, message: `${item.name} is not available`});
            }
        }

        const orderData =
        {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // decrement of the stock after ordering
        for(const item of items)
        {
            if(!item._id || isNaN(item.quantity))
            {
                return res.json({ success: false, message: "Invalid item data" });
            }

            await productModel.findByIdAndUpdate(item._id,
                {
                    $inc:
                    {
                        stock: -item.quantity
                    }
                }
            );
        }

        const line_items = items.map((item) => (
            {
                price_data:
                {
                    currency: currency,
                    product_data:
                    {
                        name: item.name
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }
        ))

        line_items.push(
            {
                price_data:
                {
                    currency: currency,
                    product_data:
                    {
                        name: "Delivery Charges"
                    },
                    unit_amount: deliveryCharge * 100
                },
                quantity: 1
            }
        )

        const session = await stripe.checkout.sessions.create(
            {
                success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
                line_items,
                mode: "payment",
            }
        )

        res.json({success: true, session_url: session.url});
    }
    catch(error)
    {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Function for verifying Stripe payment
const verifyStripe = async (req,res) =>
{
    const { orderId, success, userId } = req.body;

    try
    {
        if(success === "true")
        {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}});
            res.json({success: true});
        }
        else
        {
            await orderModel.findOneAndDelete({_id: orderId});
            res.json({success: false});
        }
    }
    catch(error)
    {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Placing order using Razorpay method
const placeOrderRazorpay = async (req,res) =>
{
    try
    {
        // THIS FEATURE OF USING DUMMY DATA IS STOPPED BY THE RAZORPAY
    }
    catch(error)
    {
        
    }
}

// All orders data for Admin panel
const allOrders = async (req,res) =>
{
    try
    {
        const orders = await orderModel.find({});
        res.json({success: true, orders});
    }
    catch(error)
    {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// user order data for frontend
const userOrders = async (req,res) =>
{
    try
    {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId });
        res.json({success:true, orders});
    }
    catch(error)
    {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// update order status from Admin panel
const updateStatus = async (req,res) =>
{
    try
    {
        const { orderId, status } = req.body;

        const order = await orderModel.findByIdAndUpdate(orderId, { status });

        if(!order)
        {
            return res.json({success: false, message: "Order Not found"});
        }

        order.status = status;

        if(order.paymentMethod === "COD" && status === "Delivered")
        {
            order.payment = true;
        }

        await order.save();

        res.json({success: true, message: "Status Updated"});
    }
    catch(error)
    {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const getUserInvoiceOrders = async (req,res) =>
{
    try
    {
        const latestOrder = await orderModel.findOne().sort({date: -1});

        if(!latestOrder)
        {
            return res.json({success: false, message: "No Orders Found"});
        }

        const user = await userModel.findById(latestOrder.userId).select("name email phone");
        if(!user)
        {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user, orders: [latestOrder] });
    }
    catch(error)
    {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, getUserInvoiceOrders }
