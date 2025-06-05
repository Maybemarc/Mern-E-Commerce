import { useEffect, useState } from "react";
import { useCart } from "../components/Context/Cart";
import { Link, useNavigate } from "react-router-dom";
import FollowOns from "../components/FollowOns";
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
  const { cart, removeCart, updateQuantity, loader } = useCart();
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

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
    window.location.reload();
  };

  const subtotal = cart.reduce((acc, item) => {
    const discountedPrice = Math.round(
      item.productId.price * (1 - item.productId.discountPercentage / 100)
    );
    return acc + discountedPrice * item.quantity;
  }, 0);

  if (loader) return <p>Loading cart...</p>;
  if (!cart || cart.length === 0) return <p>No products in the cart</p>;

  return (
    <div className="Cart_Container" >
      <h2 className="Cart_Page_Header" >Cart</h2>
      <div className="Cart_Collection">
        {console.log(cart)}
        <div className="Cart_Left">
          <div className="Cart_Header">Product
            
          </div>
          <div className="Cart_Header">Quantity</div>
          <div className="Cart_Header">SubTotal</div>
          <div className="Cart_Header"></div>
          {!cart
            ? "No products"
            : 
            cart.map((item) => (
                <>
                  <div className="Cart_Product">
                    <img src={item.productId.imageUrl} width="20%" />
                    <div className="Cart_Details">
                      <p className="Cart_Details_Name" >{item.productId.name}</p>
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
                    <DeleteIcon style={{ color: 'red' }} />
                  </div>
                </>
              ))}
        </div>
        <div className="Cart_Right">
          <p className="Cart_Total" >Cart Total</p>
          <div className="Total_Price">
            <h2>Subtotal</h2>
            <p>₹{subtotal}</p>
          </div>
          <div className="Total_Price">
            <h2>Discount</h2>
             <p>₹{subtotal}</p>
          </div>
          <Link to="/user/order" >
          <button className="Checkout" >Proceed to checkout</button>
          </Link>
        </div>
      </div>
      <FollowOns />
    </div>
  );
}

export default Cart;

// {cart.map((item) => (
//   <div>
//     <p>{item.productId.name}</p>
//     <p>{item.quantity}</p>
//     <img src={item.productId.imageUrl} />
//   </div>
// ))}
