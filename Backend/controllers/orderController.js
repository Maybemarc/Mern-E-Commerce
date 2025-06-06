import Order from "../Models/Order._model.js";
import User from "../Models/User_Model.js";

export const placeOrder = async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.productId");
  if (!user.cart.length)
    return res.status(400).json({ message: "Cart is empty" });

  const totalAmount = user.cart.reduce((acc, item) => {
    const product = item.productId;
    const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
    return acc + (discountedPrice * item.quantity);
  }, 0);

  const order = new Order({
    userId: req.user.id,
    products: user.cart,
    totalAmount,
    status: "completed",
  });

  await order.save();
  user.cart = [];
  await user.save();

  res.status(201).json({ success: true, order });
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "canceled";
    await order.save();
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(`Error in cancelling orders :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
     .populate("products.productId").sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(`Error in getting User orders :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId").populate("products.productId")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(`Error in getting All orders :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
