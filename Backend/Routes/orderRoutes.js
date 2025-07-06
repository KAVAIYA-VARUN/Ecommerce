import express from "express";
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, getUserInvoiceOrders } from "../Controllers/orderControllers.js";
import adminAuth from "../Middleware/adminAuth.js";
import authUser from "../Middleware/auth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// User Feature
orderRouter.post("/userorders", authUser, userOrders);

// Payment Verification
orderRouter.post("/verifyStripe", authUser, verifyStripe);

// Invoice Feature
orderRouter.get("/invoice-orders", adminAuth, getUserInvoiceOrders);

export default orderRouter;