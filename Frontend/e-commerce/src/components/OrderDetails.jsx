import { useState } from "react";
import { useCart } from "./Context/Cart";
import { useNavigate } from "react-router-dom";

function OrderDetails() {
  const { cart, loader, fetchCart } = useCart();
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

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
    <>
      <div className="Order_Product_Heading">
        <p>Product</p>
      </div>
      <div className="subtotal">
        <p>Subtotal</p>
      </div>
      {cart.map((item) => (
        <>
          <div className="Order_Name_Details" key={item.productId._id}>
            <img src={item.productId.imageUrl} width="20%" />
            <div className="Order_Name_Content">
              <h2>{item.productId.name}</h2>
              <p>{item.quantity}</p>
            </div>
          </div>
          <div className="Order_Quantity">
            <p>
              ₹
              {Math.round(
                item.productId.price *
                  (1 - item.productId.discountPercentage / 100)
              )}
            </p>
          </div>
        </>
      ))}

      <h2>Subtotal </h2>
      <div className="subtotal">
        <p>₹{subtotal}</p>
      </div>
      <p className="instruction">
        There is temporarily no payment options available at the movement
      </p>
      <button
        className="Place_Order_Button"
        onClick={placeOrder}
        disabled={placingOrder}
      >
        {placingOrder ? "Placing Order..." : "Place Your Order"}
      </button>
    </>
  );
}

export default OrderDetails;
