import express from 'express';
import { isAdmin, verifyToken } from '../Middleware/protect.js';
import { cancelOrder, getAllOrders, getUserOrders, placeOrder } from '../controllers/orderController.js';

const router = express.Router();


router.get("/all-orders",verifyToken,isAdmin,getAllOrders)
router.get("/my-orders",verifyToken,getUserOrders)
router.post("/", verifyToken,placeOrder)
router.delete("/product/item/:id",verifyToken,cancelOrder)

export default router;
