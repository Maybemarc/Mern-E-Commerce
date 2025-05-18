import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar_Box">
      <div className="Navbar_container">
        <div className="Left_Nav">
          <div className="left_Nav_Box">
            <img
              className="Left_logo"
              src="./src/assets/Logo/clothify-high-resolution-logo.png"
            />
          </div>
        </div>
        <div className="Right_Nav">
          <div className="Search_Bar">
            <input type="text" placeholder="Search For an Item Here" />
          </div>
        </div>
        <div className="Right_Nav">
          <div className="Search_Bar">
            <h2>Explore</h2>
          </div>
        </div>
      </div>
      
      <div className="Nav_Components">
        <div className="Component_Box_One">
          <Link to={"/"} className="Component_Link"> 
            <div className="Component_One">
              <h2>Home</h2>
            </div>
          </Link>
          <div className="Component_One">
            <h2>Shop</h2>
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
            <h2>Login</h2>
          </div>
          <div className="Component_One">
            <h2>Cart</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
