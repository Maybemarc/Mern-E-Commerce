import { useEffect, useState } from "react";
import { useCart } from "../components/Context/Cart";
import { Link, useNavigate } from "react-router-dom";
import FollowOns from "../components/FollowOns";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  const { cart, removeCart, updateQuantity, loader } = useCart();
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.productId._id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  const handleQuantityChange = async (id, value) => {
    const newQty = Math.max(1, parseInt(value));
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
    await updateQuantity(id, newQty);
  };

  const subtotalOriginal = cart.reduce((acc, item) => {
  return acc + item.productId.price * item.quantity;
}, 0);


  const subtotalDiscounted = cart.reduce((acc, item) => {
    const discountedPrice = Math.round(
      item.productId.price * (1 - item.productId.discountPercentage / 100)
    );
    return acc + discountedPrice * item.quantity;
  }, 0);

  // if (loader) return <p>Loading cart...</p>;
  // if (!cart || cart.length === 0) return <p>No products in the cart</p>;

  return (
    <div className="Cart_Overall">
      <div className="Cart_Container">
        <div className="Cart_And_Order">
          <h2 className="Cart_Page_Header">Your Cart 🛒</h2>
          <button
            className="Your_Order_Button"
            onClick={() => navigate("/secure/user/my-orders")}
          >
            Your Orders
          </button>
        </div>

        <div className="Cart_Collection">
          <div className="Cart_Left">
            <div className="Cart_Header ">Product</div>
            <div className="Cart_Header ">Quantity</div>
            <div className="Cart_Header ">SubTotal</div>
            <div className="Cart_Header "></div>
            {!cart || cart.length === 0 ? (
              <div className="No_products">
                <h2>No products found</h2>
                <h3>Add a Product</h3>
                <button onClick={() => navigate("/products")}>+</button>
              </div>
            ) : (
              cart.map((item) => (
                <>
                  <div className="Cart_Product">
                    <img src={item.productId.imageUrl} width="20%" />
                    <div className="Cart_Details">
                      <p className="Cart_Details_Name">{item.productId.name}</p>
                      <p style={{ textDecoration: "line-through" }}>
                        {item.productId.price}
                      </p>
                      <p>
                        ₹
                        {Math.round(
                          item.productId.price *
                            (1 - item.productId.discountPercentage / 100)
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="Cart_Quantity">
                    <input
                      type="number"
                      min="1"
                      className="Range_input"
                      value={quantities[item.productId._id] || item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.productId._id, e.target.value)
                      }
                    />
                  </div>
                  <div className="Cart_Price">
                    ₹
                    {Math.round(
                      item.productId.price *
                        (1 - item.productId.discountPercentage / 100)
                    ) * item.quantity}
                  </div>
                  <div
                    className="Cart_Delete"
                    onClick={() => removeCart(item.productId._id)}
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </div>
                </>
              ))
            )}
          </div>
          <div className="Cart_Right">
            <p className="Cart_Total">Cart Total</p>
            <div className="Total_Price">
              <h2>Subtotal</h2>
              <p>₹{subtotalOriginal}</p>
            </div>
            <div className="Total_Price">
              <h2>Discounted</h2>
              <p>₹{subtotalDiscounted}</p>
            </div>
            {!cart || cart.length === 0 ? (
              <Link to="/products">
                <button className="Checkout">Add a Product</button>
              </Link>
            ) : (
              <Link to="/secure/user/order">
                <button className="Checkout">Proceed to checkout</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
