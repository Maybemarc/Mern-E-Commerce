import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";
import ProductsPage from "./pages/productsPage";
import { CartProvider } from "./components/Context/Cart";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SecurePages from "./pages/protected_routes/SecurePages";
import {Toaster} from "react-hot-toast";

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
          <Route path="/secure/*" element={<SecurePages />} />
        </Routes>
        <Footer />
        <Toaster />
      </CartProvider>
    </div>
  );
}

export default App;

// https://startersites.io/blocksy/furniture/
// https://startersites.io/blocksy/kiddy/
