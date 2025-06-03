import { useEffect, useState } from "react";
import { useCart } from "../components/Context/Cart";

function Cart() {
  const { cart, addCart, removeCart, loader } = useCart();
   const [quantities, setQuantities] = useState({});
     useEffect(() => {
    // Initialize quantities from cart
    const initialQuantities = {};
    cart.forEach(item => {
      if (item.productId) {
        initialQuantities[item.productId._id] = item.quantity;
      }
    });
    setQuantities(initialQuantities);
  }, [cart])

  if (!cart || cart.length === 0) return <p>No products in the cart</p>;

  return (
    <div>
      <h1>Cart Page</h1>
      <div className="Cart_Collection">
        {console.log(cart)}
        <div className="Cart_Left">
          <div className="Cart_Header">Product Name</div>
          <div className="Cart_Header">Quantity</div>
          <div className="Cart_Header">SubTotal</div>
          <div className="Cart_Header">Delete</div>
          {!cart ? "No products":
          cart.map((item) => (
            
            <>
            {console.log(item)}
              <div className="Cart_Product">
                <img src={item.productId.imageUrl} width="20%" />
                <div className="Cart_Details">
                  <p>{item.productId.name}</p>
                  <p>{item.productId.price}</p>
                  <p>₹{Math.round(item.productId.price * (1 - item.productId.discountPercentage / 100))}</p>
                </div>
              </div>
              <div className="Cart_Quantity">
               <input
                  type="number"
                  min="1"
                  value={item.quantity}
                    onChange={(e) => {
                      const qty = parseInt(e.target.value);
                      if (qty >= 1 && qty <= product.stock) {
                        addCart(product._id, qty);
                      }
                    }}
                />
              </div>
              <div className="Cart_Price">
                   ₹{Math.round(item.productId.price * (1 - item.productId.discountPercentage / 100)) * item.quantity}
              
              </div>
              <div 
              className="Cart_Delete"
              onClick={() => removeCart(item.productId._id)}
              >
                Delete
              </div>
            </>
          ))}
        </div>
        <div className="Cart_Right">
          <p>Hello Right </p>
        </div>
      </div>
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
