import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  const [Products, SetProducts] = useState([]);
  const [CartItems, SetCartItems] = useState([]);

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

      const addTwo = remainigProducts.slice(0, 2);
      SetProducts([...uniqueProducts, ...addTwo]);
    } catch (error) {
      console.log(`Error in fetching Products`, error);
    }
  };

  const addItems = async function (prod) {
    SetCartItems((prevItems) => [...prevItems, prod]);
    console.log(`${prod.name} has been added`);
};

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Featured Products Page</h1>
      {!Products
        ? "No products"
        : Products.map((prod) => (
            <div>
              <Link to={`/productDetail/${prod._id}`}>
                <div>
                  <p>{prod.name}</p>
                  <p>{prod.description}</p>
                  <img src={prod.imageUrl} width="100%" />
                  <p>{prod.price}</p>
                </div>
              </Link>
              <button onClick={() => addItems(prod)} >Add To Cart</button>
            </div>
          ))}
    </div>
  );
}

export default FeaturedProducts;
