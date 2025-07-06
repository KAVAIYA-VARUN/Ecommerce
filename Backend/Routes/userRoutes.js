import express from "express";
import { loginUser, registerUser, adminLogin, getUser, addAddress } from "../Controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", getUser);
userRouter.post("/address", addAddress);

export default userRouter;