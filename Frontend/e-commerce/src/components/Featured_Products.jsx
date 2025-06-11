import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthProvider";
import { useCart } from "./Context/Cart";

function FeaturedProducts() {
  const [Products, SetProducts] = useState([]);
  const { user, loading } = useAuth();
  const { addCart } = useCart();
  const navigate = useNavigate();
  

  const fetchProducts = async function () {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/lookup?limit=30"
      );
      const allProducts = response.data.products;
      const seenCategories = new Set();
      const uniqueProducts = [];
      const remainigProducts = [];

      for (const product of allProducts) {
        if (!seenCategories.has(product.category)) {
          seenCategories.add(product.category);
          uniqueProducts.push(product);
        } else {
          remainigProducts.push(product);
        }
      }

      const addTwo = remainigProducts.slice(0, 3);
      SetProducts([...uniqueProducts, ...addTwo]);
    } catch (error) {
      console.log(`Error in fetching Products`, error);
    }
  };

  const discountedPrice = (price, discounted) => price * (1 - discounted / 100);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="Featured_Products">
      <div className="Featured_Products_Heading">
        <h2>Featured Products</h2>
      </div>
      {!Products
        ? "No products"
        : Products.map((prod) => (
            <div className="Featured_Container" key={prod._id}>
              <Link
                to={`/productDetail/${prod._id}`}
                className="Featured_Links"
              >
                <div className="Featured_Box">
                  <p className="percentage"> {prod.discountPercentage}% OFF</p>
                  <img src={prod.imageUrl} />
                  <p className="Featured_Link_Name">{prod.name}</p>
                  <p className="Featured_Link_Name_Category">{prod.category}</p>
                </div>
              </Link>
              <div className="Price_Details">
                <div className="Price_Content">
                  ₹<p className="Final_price">
                    {discountedPrice(
                      prod.price,
                      prod.discountPercentage
                    ).toFixed(0)}
                  </p>
                  <p
                    className="Original_price"
                    style={{ textDecoration: "line-through" }}
                  >
                    {prod.price}
                  </p>
                </div>
                <button
                  onClick={
                    !loading
                      ? user
                        ? () => {
                          addCart(prod._id, 1)
                          navigate("/secure/user/cart")
                        }
                        : () => navigate("/login")
                      : null
                  }
                >
                  Add To Cart
                </button>
              </div>
            </div>
        ))}
    </div>
  );
}

export default FeaturedProducts;
