import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../components/Context/AuthProvider";
import { useCart } from "../components/Context/Cart";
import FollowOns from "../components/FollowOns";

function ProductsPage() {
  const { user, loading } = useAuth();
  const { addCart } = useCart();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [priceLimit, setPriceLimit] = useState(5000);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/lookup?limit=30`, {
        params: {
          category: selectedCategory,
          sort: sortOrder,
        },
      });
      setProducts(res.data.products);
      const max = Math.max(100, 5000);
      setMaxPrice(max);
      setPriceLimit(max);
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

  const discountedPrice = (price, discounted) => price * (1 - discounted / 100);

  const sortedProducts = [...products]
    .filter((p) => discountedPrice(p.price, p.discountPercentage) <= priceLimit)
    .sort((a, b) => {
      const priceA = discountedPrice(a.price, a.discountPercentage);
      const priceB = discountedPrice(b.price, b.discountPercentage);
      return sortOrder === -1 ? priceB - priceA : priceA - priceB;
    });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortOrder]);

  return (
    <div className="ProductsPage_Overall" id="Product_Area">
      <div className="ProductsPage_Collection">
        <div className="ProductsPage_Heading"></div>
        <div className="ProductsPage_Sorting">
          <p>
            Showing <strong>{sortedProducts.length}</strong> Results in{" "}
            {selectedCategory ? selectedCategory : "all"} Category
          </p>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="Sort_Button"
          >
            <option disabled value="">
              Sort by
            </option>
            <option value="-1">High to low</option>
            <option value="1">Low to high</option>
          </select>
          <button
            className="Mobile_Filter_Toggle"
            onClick={() => setShowFilterDrawer(true)}
          >
            Filters
          </button>
        </div>

        <div className="ProductsPage_Container">
          <div className="ProductsPage_Left">
            {!products
              ? "No products"
              : sortedProducts.map((prod) => (
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
                        <p className="ProductsPage_Final_price">
                          ₹
                          {discountedPrice(
                            prod.price,
                            prod.discountPercentage
                          ).toFixed(0)}
                        </p>
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
                              ? () => {
                                  addCart(prod._id, 1);
                                  setTimeout(() => {
                                    navigate("/secure/user/cart");
                                  }, 1000);
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
          <div
            className={`ProductsPage_Box2 ${
              showFilterDrawer ? "open-drawer" : "closed-drawer"
            }`}
          >
            <button
              className="Close_Filter_Drawer"
              onClick={() => setShowFilterDrawer(false)}
            >
              ✕
            </button>
            <p>Filter By Catergories</p>
            {categories.map((cat, index) => (
              <div className="ProductsPage_Category" key={index}>
                <button
                  className="ProductsPage_Category_Button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: cat === selectedCategory ? "#444" : null,
                    color:
                      cat === selectedCategory ? "rgb(255, 255, 255)" : "#000",
                  }}
                >
                  {cat}
                </button>
              </div>
            ))}
            <button
              className="Clear_All"
              onClick={() => {
                setSelectedCategory("");
              }}
            >
              Clear All
            </button>
            <div style={{ marginTop: "2rem" }}>
              <label htmlFor="price-slider">
                <strong>Filter by Price (₹{priceLimit})</strong>
              </label>
              <input
                type="range"
                id="price-slider"
                min="100"
                max={Math.ceil(maxPrice)}
                step="100"
                value={priceLimit}
                onChange={(e) => setPriceLimit(Number(e.target.value))}
                style={{ width: "100%", accentColor: "green" }}
              />
            </div>
          </div>
        </div>
      </div>
      <FollowOns />
    </div>
  );
}

export default ProductsPage;
