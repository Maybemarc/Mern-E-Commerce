import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";
import UserCart from "./pages/UsersCart";
import Orders from "./pages/orders";
import ProductsPage from "./pages/productsPage";
import Protect from "./pages/Secure/ProtectRoute";
import { CartProvider } from "./components/Context/Cart";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/admin/AdminDashboard"
import AllProducts from "./pages/admin/AllProducts";
import CreateProduct from "./pages/admin/CreateProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";

function App() {
  return (
    <div>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/ProductDetail/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/user/cart" element={<UserCart />} />
          <Route path="/user/order" element={<Orders />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Admin/AllProducts" element={<AllProducts />} />
          <Route path="/Admin/CreateProduct" element={<CreateProduct />} />
          <Route path="/Admin/UpdateProduct/:id" element={<UpdateProduct />} />
        </Routes>
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;

// https://startersites.io/blocksy/furniture/
// https://startersites.io/blocksy/kiddy/
