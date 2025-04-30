import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String }

},{timestamps:true})

export const Product = mongoose.model("Product", productSchema)