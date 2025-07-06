import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});

const connectDB = async () =>
{
    mongoose.connection.on("connected", () =>
    {
        console.log("MongoDB Connected");
    });

    await mongoose.connect(process.env.MONGODB_URL);
}

export default connectDB;