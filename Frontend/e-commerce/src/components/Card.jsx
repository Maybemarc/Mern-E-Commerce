import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Icons from "../utils/icons";

function Card() {
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
    <div className="Categories_Container" id="Category_Area">
      <div className="category">
        <h2>Categories</h2>
      </div>
      {Categories.length === 0
        ? "No category"
        : Categories.map((cat, index) => (
          <div className="category_Types" key={index} >
                <Link to={`/products?category=${cat}`} >
                <div className={`Category_List Fill_Color${index + 1}`}>
                  <img src={Icons[index]} width="50px" height="50px" />
                  <p>{cat}</p>

                  <div className="Arrow_Nav">
                    <img
                      src="/assets/T-Shirt/right-arrow-svgrepo-com.png"
                      width="20px"
                      height="20px"
                    />
                  </div>
                </div>
            </Link>
              </div>
          ))}
    </div>
  );
}

export default Card;


