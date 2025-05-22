import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState(-1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortOrder]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/lookup");
      const uniqueCats = [...new Set(res.data.products.map((p) => p.category))];
      setCategories(uniqueCats);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/lookup", {
        params: {
          category: selectedCategory,
          sort: sortOrder,
        },
      });
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div style={{ flex: 3 }}>
        <h2>Products {selectedCategory && `in "${selectedCategory}"`}</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((prod) => (
              <div
                key={prod._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <h4>{prod.name}</h4>
                <p>₹{prod.price}</p>
                <p>{prod.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <h3>Filters</h3>

        <div>
          <h4>Categories</h4>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              style={{
                display: "block",
                margin: "5px 0",
                background: cat === selectedCategory ? "#444" : "#eee",
                color: cat === selectedCategory ? "#fff" : "#000",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory("")}
            style={{
              marginTop: "10px",
              background: "#ccc",
              border: "none",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Clear Category
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h4>Sort by Price</h4>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            style={{ padding: "6px", width: "100%" }}
          >
            <option value="-1">High to Low</option>
            <option value="1">Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
