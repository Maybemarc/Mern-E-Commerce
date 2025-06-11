import User from "../Models/User_Model.js";

export const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { productId, quantity } = req.body;

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const existing = user.cart.find(
      (item) => item.productId.toString() === productId
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log(`Error in adding in the Cart :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== req.params.productId
    );
    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log(`Error in DeletingCart :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { quantity } = req.body;
    const { productId } = req.params;

    const item = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    item.quantity = quantity;
    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log(`Error in Updating Cart :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.productId");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log(`Error in gettingCart :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
