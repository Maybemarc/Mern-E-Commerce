import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, verifyToken } from "../Middleware/protect.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/product/:id", getSingleProduct);
router.post("/create", verifyToken, isAdmin, createProduct);
router.put("/update:id", verifyToken, isAdmin, updateProduct);
router.delete("/delete:id", verifyToken, isAdmin, deleteProduct);

export default router;
