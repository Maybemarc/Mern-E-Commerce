import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  const [Categories, SetCategories] = useState([]);

  const API_URL = import.meta.env.VITE_API_BASE_URL

  const fetchProducts = async function () {
    try {
      const response = await axios.get(
        `${API_URL}/lookup?limit=30`
      );
      const result = response.data.products;
      const uniqueCategories = [...new Set(result.map((p) => p.category))];
      SetCategories(uniqueCategories);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="Footer_Container" id="Footer_Area">
      <div className="Footer_Category">
        <div className="Footer_Types">
          <h2>Shop</h2>
          {Categories.length === 0
            ? "NO Category"
            : Categories.map((cat,index) => (
                <div className="Footer_Links_Content" key={index}>
                  <Link
                    to={`/products?category=${cat}`}
                    className="Footer_Links"
                  >
                    <p className="Footer_Items"
                    onClick={() => {
                      const goToProducts = document.getElementById("Navbar_Area")
                      if(goToProducts){
                        goToProducts.scrollIntoView({behavior:"smooth"})
                      }

                    }}
                    >{cat}</p>
                  </Link>
                </div>
              ))}
        </div>
        <div className="Contact_Us">
          <h2>Contact</h2>
          <div className="Links_Redirect">
            <a href="mailto:surya207757@gmail.com" target="blank">
              <EmailIcon className="Link_icon" />
              <p> Email</p>
            </a>
          </div>
          <div className="Links_Redirect">
            <a href="https://github.com/Maybemarc" target="blank">
              <GitHubIcon className="Link_icon" />
              <p>GitHub</p>
            </a>
          </div>
          <div className="Links_Redirect">
            <a href="https://www.linkedin.com/in/surya-k-a556972a0" target="blank">
              <LinkedInIcon className="Link_icon" />
              <p>LinkedIn</p>
            </a>
          </div>
        </div>
        <div className="Copyright">
          <h1>CopyRight @ {new Date().getFullYear()}</h1>
        </div>
      </div>
    </div>
  );
}

export default Footer;
