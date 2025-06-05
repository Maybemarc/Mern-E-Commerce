import { Route, Routes } from "react-router-dom";
import Orders from "../orders";
import AdminDashboard from "../admin/AdminDashboard";
import AllProducts from "../admin/AllProducts";
import CreateProduct from "../admin/CreateProduct";
import UpdateProduct from "../admin/UpdateProduct";
import UserCart from "../UsersCart";
import Protect from "../Secure/ProtectRoute";

function SecurePages() {
  return (
    <div>
      <h2>Hello secure</h2>

      <Protect>
        <Routes>
          <Route path="/user/cart" element={<UserCart />} />
          <Route path="/user/order" element={<Orders />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Admin/AllProducts" element={<AllProducts />} />
          <Route path="/Admin/CreateProduct" element={<CreateProduct />} />
          <Route path="/Admin/UpdateProduct/:id" element={<UpdateProduct />} />
        </Routes>
      </Protect>
    </div>
  );
}

export default SecurePages;
