import User from "../Models/User_Model.js";

export const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { productId, quantity } = req.body;

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

export const removeFromCart = async(req,res) => {
    try {
        const user = await User.findById(req.user.id)
        user.cart =  user.cart.filter(item => item.productId.toString()  !== req.params.productId)
        await user.save();
        res.status(200).json({ success: true, cart: user.cart });
    } catch (error) {
        console.log(`Error in DeletingCart :`, error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.productId");
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log(`Error in gettingCart :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
