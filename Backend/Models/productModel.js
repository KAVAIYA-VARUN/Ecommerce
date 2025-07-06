import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
        },
        description:
        {
            type: String,
            required: true,
        },
        oldPrice:
        {
            type: Number,
        },
        price:
        {
            type: Number,
            required: true,
        },
        image:
        {
            type: Array,
            required: true,
        },
        category:
        {
            type: String,
            required: true,
        },
        subCategory:
        {
            type: String,
            required: true,
        },
        sizes:
        {
            type: Array,
            required: true,
        },
        stock:
        {
            type: Number,
            required: true,
            default: 0,
        },
        note:
        {
            type: String,
        },
        bestseller:
        {
            type: Boolean,
        },
        date:
        {
            type: Number,
            required: true,
        }
    }
);

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;