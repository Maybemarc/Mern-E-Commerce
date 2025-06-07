import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discountPercentage: "",
    stock: "",
    imageUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/lookup/create", form, {
        withCredentials: true,
      });
      navigate("/admin/AllProducts");
    } catch (error) {
      console.error("Create failed:", error);
    }
  };

  return (
    <div className="create-product-container">
      <h2 className="form-title">Create New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        {[
          "name",
          "description",
          "price",
          "discountPercentage",
          "stock",
          "imageUrl",
          "category",
        ].map((field) => (
          <div className="form-group" key={field}>
            <label className="form-label">{field}</label>
            <input
              className="form-input"
              type={field === "price" || field === "stock" || field === "discountPercentage" ? "number" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="submit-button" type="submit">
           Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
