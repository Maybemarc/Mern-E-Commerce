import { useNavigate } from "react-router-dom";
import { useCart } from "../components/Context/Cart";
import { useState } from "react";
import axios from "axios";

function Orders() {
  const { cart, loader, fetchCart } = useCart();
  const navigate = useNavigate();
  const [placingOrder, setPlacingOrder] = useState(false);

  const subtotal = cart.reduce((acc, item) => {
    const discounted = Math.round(
      item.productId.price * (1 - item.productId.discountPercentage / 100)
    );
    return acc + discounted * item.quantity;
  }, 0);

  const placeOrder = async () => {
    try {
      setPlacingOrder(true);
      const repsonse = await axios.post(
        "http://localhost:3000/api/orders",
        {},
        {
          withCredentials: true,
        }
      );
      fetchCart();
      setTimeout(() => {
        navigate("/user/cart");
      }, 1000);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order placement failed");
      setPlacingOrder(false);
    }
  };

  if (loader) return <p>Loading...</p>;
  if (!cart || cart.length === 0) return <p>No items in your cart</p>;

  return (
    <div>
      <h1>Orders Page</h1>
      {cart.map((item) => (
        <div key={item.productId._id}>
          <h3>{item.productId.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>₹{item.productId.price}</p>
          <p>
            Price: ₹
            {Math.round(
              item.productId.price *
                (1 - item.productId.discountPercentage / 100)
            )}
          </p>
        </div>
      ))}

      <hr />
      <h2>Total: ₹{subtotal}</h2>
      <button onClick={placeOrder} disabled={placingOrder}>
        {placingOrder ? "Placing Order..." : "Place Your Order"}
      </button>
    </div>
  );
}

export default Orders;
