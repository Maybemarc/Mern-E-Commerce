import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-e-commerce-82af.vercel.app"
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/lookup", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

await connectDB();
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
