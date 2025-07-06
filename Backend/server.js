import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./Config/mongodb.js";
import connectCloudinary from "./Config/cloudinary.js";
import userRouter from "./Routes/userRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import cartRouter from "./Routes/cartRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";

// App config
const app = express();
const PORT = process.env.PORT || 4001;

// Middlewares
app.use(express.json());
app.use(cors());
connectDB();
connectCloudinary();

// Api endpoints

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req,res) =>
{
    res.status(200).send(`Server is running on port:${PORT}`);
});

app.listen(PORT, () =>
{
    console.log(`Server is running on port:${PORT}`);
});