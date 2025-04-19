import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  cart:[{
    productId:{type: mongoose.Schema.Types.ObjectId, ref:"Product" },
    quantity:{type:Number, default:1}
  }],
},{
    timestamps:true
});

export default mongoose.model("User", userSchema)
