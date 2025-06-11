import { Route, Routes } from "react-router-dom";
import Orders from "../orders";
import UserCart from "../UsersCart";
import Protect from "../Secure/ProtectRoute";
import MyOrders from "../MyOrders";
import AdminRoutes from "../admin/AdminRoutes";

function SecurePages() {
  return (
    <div>
      <Protect>
        <Routes>
          <Route path="/user/cart" element={<UserCart />} />
          <Route path="/user/order" element={<Orders />} />
          <Route path="/user/my-orders" element={<MyOrders />} />
          <Route path="/Admin/*" element={<AdminRoutes />} />
        </Routes>
      </Protect>
    </div>
  );
}

export default SecurePages;
