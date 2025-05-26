import { useCart } from "../components/Context/Cart";

function Cart() {
  const { cart, addCart, removeCart, loader } = useCart();

  if (loader) {
    return <p>Loading...</p>;
  }

  if (!cart || cart.length === 0) return <p>No products in the cart</p>;

  return (
    <div>
      <h1>Cart Page</h1>
      {cart.map((item) => (
        <div>
          <p>{item.productId.name}</p>
          <p>{item.quantity}</p>
          <img src={item.productId.imageUrl} />
        </div>
      ))}
    </div>
  );
}

export default Cart;
