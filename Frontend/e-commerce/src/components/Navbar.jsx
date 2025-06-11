import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthProvider";
import Clothify from "../assets/Logo/clothify-high-resolution-logo.png";
import Loader from "./LoadPage";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, SetUser, checkUser,loading } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {
          withCredentials: true,
        }
      );
      SetUser(null);
      Cookies.remove("token");
      toast.success("Logged Out")
      checkUser()
      navigate("/login");
    } catch (error) {
      console.log(
        "Error in Logout User: ",
        error.response?.data || error.message
      );
      toast.error(error.response?.data.message || error.message);
      Cookies.remove("token");
      SetUser(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  if (loading) return <Loader />;

  return (
    <div className="Navbar_Box" id="Navbar_Area">
      <div className="Navbar_container">
        <div className="Left_Nav">
          <div className="left_Nav_Box">
            <img className="Left_logo" src={Clothify} alt="Logo" />
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
            <h2 onClick={() => navigate("/products")}>Shop</h2>
          </div>
          <div className="Component_One">
            <h2
              onClick={() => {
                const goToCategory = document.getElementById("Category_Area");
                if (goToCategory) {
                  goToCategory.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Category
            </h2>
          </div>
          <div className="Component_One">
            <h2
              onClick={() => {
                const footer = document.getElementById("Footer_Area");
                if (footer) {
                  footer.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Contact Us
            </h2>
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
              <h2>{user?.username?.toUpperCase().slice(0, 2)}</h2>
            )}
          </div>
          <div className="Component_One">
            <h2 onClick={() => navigate("/secure/user/cart")}>Cart</h2>
          </div>
          <div className="Component_One">
            {user ? <h2 onClick={() => logoutUser()}>Logout</h2> : null}
          </div>

          <div className="Component_One">
            {user?.isAdmin ? (
              <h2 onClick={() => navigate("/secure/Admin")}>Admin</h2>
            ) : null}
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
