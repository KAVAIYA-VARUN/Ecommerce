import express from "express";
import { addProduct,listProducts,removeProduct,singleProduct,updateStock,editProduct } from "../Controllers/productControllers.js";
import upload from "../Middleware/multer.js";
import adminAuth from "../Middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post("/add", adminAuth , upload.fields([{name: "image1",maxCount: 1},{name: "image2",maxCount: 1},{name: "image3",maxCount: 1},{name: "image4",maxCount: 1}]), addProduct);
productRouter.get("/list", listProducts);
productRouter.post("/remove", adminAuth , removeProduct);
productRouter.post("/single", singleProduct);
productRouter.post("/updatestock", adminAuth, updateStock);
productRouter.post("/edit", adminAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]), editProduct);

export default productRouter;