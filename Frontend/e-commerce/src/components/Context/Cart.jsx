import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import toast, { ToastBar } from "react-hot-toast";
export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loader, setLoader] = useState(false);
  const { user, loading } = useAuth();

  const API_URL = import.meta.env.VITE_API_BASE_URL

  const fetchCart = async function () {
    setLoader(true)
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        withCredentials: true,
      });
      setCart(response.data.cart);
      setLoader(false);
    } catch (error) {
      console.log(`Error in Fetching Cart: `, error);
    }finally{
      setLoader(false)
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

   useEffect(() => {
    
  }, [cart]);

  const addCart = async (productId, quantity) => {
    setLoader(true)
    try {
      const response = await axios.post(
        `${API_URL}/cart/add`,
        {
          productId,
          quantity,
        },
        {
          withCredentials: true,
        }
      );
      setCart(response.data.cart);
      toast.success("Product Added")
      fetchCart()
    } catch (error) {
      console.log(`Error in Adding to Cart: `, error)
    }finally{
      setLoader(false)
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setLoader(true)
    try {
      const response = await axios.put(
        `${API_URL}/cart/update/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      setCart(response.data.cart);
      toast.success("Product Updated")
      fetchCart()
    } catch (error) {
      console.log(`Error in Updating Quantity: `, error);
    }finally{
      setLoader(false)
    }
  };

  const removeCart = async (productId) => {
    setLoader(true)
    try {
      const response = await axios.delete(
        `${API_URL}/cart/remove/${productId}`,
        { withCredentials: true }
      );
      setCart(response.data.cart);
      toast.error("Product Removed")
      fetchCart()
    } catch (error) {
      console.log(`Error in Removing to Cart: `, error);
    }finally{
      setLoader(false)
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
