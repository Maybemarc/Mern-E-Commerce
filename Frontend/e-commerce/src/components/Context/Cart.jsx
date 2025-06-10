import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loader, setLoader] = useState(true);
  const { user, loading } = useAuth();

  const fetchCart = async function () {
    try {
      const response = await axios.get("http://localhost:3000/api/cart", {
        withCredentials: true,
      });
      setCart(response.data.cart);
      setLoader(false);
    } catch (error) {
      console.log(`Error in Fetching Cart: `, error);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (user) {
        fetchCart();
      } else {
        setLoader(false);
      }
    }
  }, [user, loading]);

  const addCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cart/add",
        {
          productId,
          quantity,
        },
        {
          withCredentials: true,
        }
      );
      setCart(response.data.cart);
      fetchCart()
    } catch (error) {
      console.log(`Error in Adding to Cart: `, error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/cart/update/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      setCart(response.data.cart);
      fetchCart()
    } catch (error) {
      console.log(`Error in Updating Quantity: `, error);
    }
  };

  const removeCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/cart/remove/${productId}`,
        { withCredentials: true }
      );
      setCart(response.data.cart);
      fetchCart()
    } catch (error) {
      console.log(`Error in Removing to Cart: `, error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addCart, removeCart, updateQuantity, fetchCart,loader }}
    >
      {children}
    </CartContext.Provider>
  );
};
