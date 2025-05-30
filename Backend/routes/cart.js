import express from "express";
import { verifyToken } from "../Middleware/protect.js";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.delete("/remove/:productId", verifyToken, removeFromCart);

export default router;
