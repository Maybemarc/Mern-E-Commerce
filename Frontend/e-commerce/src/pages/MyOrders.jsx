import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../components/Context/AuthProvider";
import FollowOns from "../components/FollowOns";
import toast from "react-hot-toast";

function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/orders/my-orders",
        {
          withCredentials: true,
        }
      );
      setOrders(res.data.orders);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/orders/product/item/${orderId}`,
        {
          withCredentials: true,
        }
      );
      toast.error("Order Cancelled")
      fetchOrders();
    } catch (err) {
      console.log("Error cancelling order:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="MyOrders_Overall">
        <h2 className="Checkout_Header" >My Orders</h2>
      <div className="MyOrders_List">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div className="MyOrders_Card" key={order._id}>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>
              <ul>
                {order.products.map((p, idx) => (
                  <li key={idx}>
                    {p.quantity} x {p.productId.name}
                  </li>
                ))}
              </ul>
              {order.status === "completed" && (
                <button
                  onClick={() => handleCancel(order._id)}
                  className="Cancel_Button"
                >
                  Cancel
                </button>
              )}
            </div>
          ))
        )}
      </div>
      <FollowOns />
    </div>
  );
}

export default MyOrders;
