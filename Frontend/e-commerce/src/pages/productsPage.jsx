import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../components/Context/AuthProvider";
import { useCart } from "../components/Context/Cart";

function ProductsPage() {
  const { user, loading } = useAuth();
  const { addCart } = useCart();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState(-1);
  const navigate = useNavigate()

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/lookup?limit=30`, {
        params: {
          category: selectedCategory,
          sort: sortOrder,
        },
      });
      setProducts(res.data.products);
    } catch (error) {
      console.log(`Error in fetchProducts: `, error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/lookup?limit=30");
      const result = [...new Set(res.data.products.map((c) => c.category))];
      setCategories(result);
    } catch (error) {
      console.log(`Error in fetching Categories: `, error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortOrder]);

  return (
    <div className="ProductsPage_Collection">
      <div className="ProductsPage_Heading">
        <h2>Products Page</h2>
      </div>
      <div className="ProductsPage_Container">
        {!products
          ? "No products"
          : products.map((prod) => (
              <div className="ProductsPage_Box_Content" key={prod._id}>
                <Link
                  to={`/productDetail/${prod._id}`}
                  className="ProductsPage_Links"
                >
                  <div className="ProductsPage_Box">
                    <p className="ProductsPage_Percentage">
                      {prod.discountPercentage}% OFF
                    </p>
                    <img src={prod.imageUrl} />
                    <p className="ProductsPage_Link_Name">{prod.name}</p>
                    <p className="ProductsPage_Link_Name_Category">
                      {prod.category}
                    </p>
                  </div>
                </Link>
                <div className="ProductsPage_Details">
                  <div className="ProductsPage_Content">
                    <p className="ProductsPage_Final_price"></p>
                    <p
                      className="ProductsPage_Original_price"
                      style={{ textDecoration: "line-through" }}
                    >
                      {prod.price}
                    </p>
                  </div>
                  <button
                    onClick={
                      !loading
                        ? user
                          ? () => addCart(prod._id, 1)
                          : () => navigate("/login")
                        : null
                    }
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
        <div className="ProductsPage_Box2">
          {categories.map((cat) => (
            <div className="ProductsPage_Category">
              <button className="ProductsPage_Category_Button">{cat}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
