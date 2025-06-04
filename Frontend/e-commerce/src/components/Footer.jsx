import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [Categories, SetCategories] = useState([]);

  const fetchProducts = async function () {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/lookup?limit=30"
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
    <div className="Footer_Container">
      <div className="Footer_Category">
        <div className="Footer_Types">
          <h2>Hello</h2>
          {Categories.length === 0
            ? "NO Category"
            : Categories.map((cat) => (
                <Link to={`/products?category=${cat}`} key={cat._id} className="Footer_Links" >
                    <p className="Footer_Items" >{cat}</p>
                </Link>
              ))}
        </div>
        <div className="Contact_Us">
          <h2>Hello</h2>
          <p>cat</p>
          <p>cat</p>
          <p>cat</p>
        </div>
        <div className="Copyright">
          <h1>CopyRight @ {new Date().getFullYear()}</h1>
        </div>
      </div>
    </div>
  );
}

export default Footer;
