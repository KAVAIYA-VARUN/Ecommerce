import express, { Router } from "express";
import { addToCart, getUserCart, updateCart } from "../Controllers/cartControllers.js";
import authUser from "../Middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;