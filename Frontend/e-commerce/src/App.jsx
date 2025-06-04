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
import Footer from "./components/Footer"

function App() {
  return (
    <div>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/ProductDetail/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/signUp"
            element={
              <Protect>
                <SignUp />
              </Protect>
            }
          />
          <Route
            path="/user/cart"
            element={
              <Protect>
                <UserCart />
              </Protect>
            }
          />
          <Route path="/user/order" element={<Orders />} />
        </Routes>
              <Footer />
      </CartProvider>
    </div>
  );
}

export default App;

// https://startersites.io/blocksy/furniture/
// https://startersites.io/blocksy/kiddy/
