import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AllProducts from "./AllProducts";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import AdminProtect from "./AdminProtect";

function AdminRoutes() {
  return (
    <div>
      <AdminProtect>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/CreateProduct" element={<CreateProduct />} />
          <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
        </Routes>
      </AdminProtect>
    </div>
  );
}

export default AdminRoutes;
