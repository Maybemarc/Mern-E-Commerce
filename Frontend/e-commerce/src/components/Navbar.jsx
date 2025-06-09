import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthProvider";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <div className="Navbar_Box">
      <div className="Navbar_container">
        <div className="Left_Nav">
          <div className="left_Nav_Box">
            <img
              className="Left_logo"
              src="./src/assets/Logo/clothify-high-resolution-logo.png"
              alt="Logo"
            />
          </div>
        </div>

        <div className="Right_Nav desktop-only">
          <div className="Search_Bar">
            <input type="text" placeholder="Search For an Item Here" />
          </div>
          <div>
            <h2>Explore</h2>
          </div>
        </div>

        <div
          className="hamburger-icon mobile-only"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </div>
      </div>

      <div className="Nav_Components desktop-only">
        <div className="Component_Box_One">
          <Link to="/" className="Component_Link">
            <div className="Component_One">
              <h2>Home</h2>
            </div>
          </Link>
          <div className="Component_One">
            <h2 onClick={() => navigate("/products")} >Shop</h2>
          </div>
          <div className="Component_One">
            <h2>About Us</h2>
          </div>
          <div className="Component_One">
            <h2>Contact Us</h2>
          </div>
        </div>
        <div className="Component_Box_Two">
          <div className="Component_One">
            {!user ? (
              <Link to="/signup" className="Component_One">
                <h2>Sign Up</h2>
              </Link>
            ) : null}
          </div>
          <div className="Component_One">
            {!user ? (
              <h2 onClick={() => navigate("/login")} className="Component_One">
                Login
              </h2>
            ) : (
              <h2>Hi</h2>
            )}
          </div>
          <div className="Component_One">
            <h2 onClick={() => navigate("/secure/user/cart")} >Cart</h2>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-drawer">
          <div className="drawer-header">
            <h2>Menu</h2>
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
              ×
            </button>
          </div>
          <div className="drawer-links">
            {!user ? <h2>Sign Up</h2> : null}
            {!user ? <h2>Login</h2> : <h2>Hi</h2>}
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact Us
            </Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
            <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
              Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <div className="Navbar_Box">
//       <div className="Navbar_container">
//         <div className="Left_Nav">
//           <div className="left_Nav_Box">
//             <img
//               className="Left_logo"
//               src="./src/assets/Logo/clothify-high-resolution-logo.png"
//             />
//           </div>
//         </div>
//         <div className="Right_Nav">
//           <div className="Search_Bar">
//             <input type="text" placeholder="Search For an Item Here" />
//           </div>
//         </div>
//         <div className="Right_Nav">
//           <div className="Search_Bar">
//             <h2>Explore</h2>
//           </div>
//         </div>
//       </div>

//       <div className="Nav_Components">
//         <div className="Component_Box_One">
//           <Link to={"/"} className="Component_Link">
//             <div className="Component_One">
//               <h2>Home</h2>
//             </div>
//           </Link>
//           <div className="Component_One">
//             <h2>Shop</h2>
//           </div>
//           <div className="Component_One">
//             <h2>About Us</h2>
//           </div>
//           <div className="Component_One">
//             <h2>Contact Us</h2>
//           </div>
//         </div>
//         <div className="Component_Box_Two">
//           <div className="Component_One">
//             <h2>Login</h2>
//           </div>
//           <div className="Component_One">
//             <h2>Cart</h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
