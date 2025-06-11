import express from "express";
import { verifyToken } from "../middleware/protect.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cartController.js";
const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.delete("/remove/:productId", verifyToken, removeFromCart);
router.put("/update/:productId", verifyToken, updateCartQuantity);

export default router;
