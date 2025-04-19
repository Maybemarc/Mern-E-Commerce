import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGOOSE_URL);
    console.log(`Database Connected`);
  } catch (error) {
    console.log(`Error in connecting db: `, error);
  }
};
