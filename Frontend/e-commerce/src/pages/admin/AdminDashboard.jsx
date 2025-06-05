import { useEffect, useState } from "react";
import { useAuth } from "../../components/Context/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard(){
const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/orders/all-orders", {
          withCredentials: true,
        });
        console.log(res.data.orders);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="admin-orders">
      <div className="Admin_Products">
        <Link to="/Admin/AllProducts" >
        All Products List
        </Link>
        </div>
      <h2>All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Items</th>
              <th>Total</th>
              <th>Placed On</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId?.username}</td>
                <td>{order.userId?.email}</td>
                <td>
                  {order.products.map((item, idx) => (
                    <div key={idx}>
                      {item.productId.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td>₹{order.totalAmount}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard