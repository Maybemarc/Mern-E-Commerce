import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthProvider";
import Clothify from "/assets/Logo/clothify-high-resolution-logo.png";
import Loader from "./LoadPage";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, SetUser, checkUser, loading } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const logoutUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/logout`, {
        withCredentials: true,
      });
      SetUser(null);
      Cookies.remove("token");
      toast.success("Logged Out");
      checkUser();
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
            <Link to="/">
              <img className="Left_logo" src={Clothify} />
            </Link>
          </div>
        </div>

        <div className="Right_Nav desktop-only">
          {/* <div className="Search_Bar">
            <input type="text" placeholder="Search For an Item Here" />
          </div> */}
          <div>
            <Link to="/products">
              <h2>Explore</h2>
            </Link>
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
                const goToCategory = document.getElementById("Footer_Area");
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
              X
            </button>
          </div>
          <div className="drawer-links">
            {!user ? (
              <Link
                to="/signup"
                className="Component_One"
                onClick={() => setIsMenuOpen(false)}
              >
                <p className="Mobile_Links">Sign Up</p>
              </Link>
            ) : null}
            {!user ? (
              <p
                className="Mobile_Links"
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
              >
                Login
              </p>
            ) : (
              <h2>{user?.username?.toUpperCase().slice(0, 2)}</h2>
            )}
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>
              Shop
            </Link>
            <p
              className="Mobile_Links"
              onClick={() => {
                const goToFooter = document.getElementById("Footer_Area");
                if (goToFooter) {
                  goToFooter.scrollIntoView({ behavior: "smooth" });
                }
                setIsMenuOpen(false);
              }}
            >
              Category
            </p>
            <p
              className="Mobile_Links"
              onClick={() => {
                const goToConatct = document.getElementById("Footer_Area");
                if (goToConatct) {
                  goToConatct.scrollIntoView({ behavior: "smooth" });
                }
                setIsMenuOpen(false);
              }}
            >
              Contact Us
            </p>
            {user ? (
              <p
                className="Mobile_Links"
                onClick={() => {
                  logoutUser();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </p>
            ) : null}
            <Link to="/secure/user/cart" onClick={() => setIsMenuOpen(false)}>
              Cart
            </Link>

            {user?.isAdmin ? (
              <p
                className="Mobile_Links"
                onClick={() => {
                  navigate("/secure/Admin");
                  setIsMenuOpen(false);
                }}
              >
                Admin
              </p>
            ) : null}
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
