import { v2 as cloudinary } from "cloudinary";
import productModel from "../Models/productModel.js";

// function for add product
const addProduct = async(req,res) =>
{
    try
    {
        const { name, description, price, category, subCategory, sizes, bestseller, note, stock } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imageUrl = await Promise.all(
            images.map( async (item) =>
            {
                let result = await cloudinary.uploader.upload(item.path, {resource_type:"image"});
                return result.secure_url;
            })
        )

        let parsedSizes;
        try
        {
            parsedSizes = JSON.parse(sizes);
        }
        catch(error)
        {
            // This sends a specific error if the 'sizes' string is not valid JSON
            return res.status(400).json({ success: false, message: "Invalid format for sizes. Expected a valid JSON array string." });
        }

        const productData =
        {
            name,
            description,
            price: Number(price),
            image: imageUrl,
            category,
            subCategory,
            sizes: parsedSizes,
            bestseller: bestseller === "true" ? true : false,
            stock,
            note,
            date: Date.now()
        }

        console.log(productData);
        
        const product = new productModel(productData);
        await product.save();

        res.status(200).json({success: true, message: "Product Added"});
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({success: false, message: "Error While Adding The Product"});
    }
}

// function for list products
const listProducts = async(req,res) =>
{
    try
    {
        const products = await productModel.find({});
        res.status(200).json({success: true, products});
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({success: false, message: "Error While Fetching The Products"});
    }
}

// function for remove product
const removeProduct = async(req,res) =>
{
    try
    {
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({success: true, message: "Product Deleted"});
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({success: false, message: "Error While Removing The Product"});
    }
}

// function for single product info
const singleProduct = async(req,res) =>
{
    try
    {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.status(200).send(product);
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({message: "Error While Fetching Product"});
    }
}

// function to update the stock
const updateStock = async (req,res) =>
{
    try
    {
        const { id, stock } = req.body;

        if(!id || stock === undefined)
        {
            return res.json({success: false, message: "Missing product id or stock value"});
        }
        
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            {
                stock: Number(stock)
            },
            {
                new: true
            }
        );

        if(!updatedProduct)
        {
            return res.json({success: false, message: "Product not found"});
        }

        res.status(200).json({success: true, message: "Stock updated", product: updatedProduct});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating stock" });
    }
}

const editProduct = async (req, res) =>
{
    try
    {
        const { productId, newPrice, bestseller } = req.body;

        if (!productId)
        {
            return res.status(400).json({ success: false, message: "Missing product ID" });
        }

        let editedFields =
        {
            price: Number(newPrice),
            bestseller: bestseller === "true" || bestseller === true
        };

        // Handle optional new image uploads
        if (req.files)
        {
            const imageFiles =
            [
                req.files.image1?.[0],
                req.files.image2?.[0],
                req.files.image3?.[0],
                req.files.image4?.[0]
            ].filter(Boolean);

            if (imageFiles.length > 0)
            {
                const uploadedImages = await Promise.all(
                    imageFiles.map(async (file) =>
                    {
                        const result = await cloudinary.uploader.upload(file.path, {
                            resource_type: "image"
                        });
                        return result.secure_url;
                    })
                );

                editedFields.image = uploadedImages;
            }
        }

        const previousProduct = await productModel.findById(productId);

        if(!previousProduct)
        {
            return res.json({success: false, message: "Product Not Found"});
        }

        const oldPrice = previousProduct.price;

        // this function crosses the original price when the price is changed no matter how many times the price is changed it will cross out the original price
        if(Number(newPrice) !== oldPrice && previousProduct.oldPrice === undefined)
        {
            editedFields.oldPrice = oldPrice;
        }

        // this function is for updating the old price if the price changes 2 or more times
        // if(Number(newPrice) !== oldPrice)
        // {
        //     editedFields.oldPrice = oldPrice;
        // }

        const editedProduct = await productModel.findByIdAndUpdate(
            productId,
            editedFields,
            { new: true }
        );

        if (!editedProduct)
        {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: editedProduct,
            oldPrice
        });
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating product" });
    }
}

export { addProduct,listProducts,removeProduct,singleProduct, updateStock, editProduct }
