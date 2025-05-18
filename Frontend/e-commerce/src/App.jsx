import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/productsPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/order" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;

// https://startersites.io/blocksy/furniture/
// https://startersites.io/blocksy/kiddy/
