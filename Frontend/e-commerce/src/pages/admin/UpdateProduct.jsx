import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function CreateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discountPercentage: "",
    stock: "",
    imageUrl: "",
    category: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/lookup/product/${id}`).then(({ data }) => {
        setForm(data.product);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = id ? `http://localhost:3000/api/lookup/update/${id}` : "http://localhost:3000/api/lookup/create";
      const method = id ? "put" : "post";

      await axios[method](url, form, { withCredentials: true });
      navigate("/Admin/AllProducts");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <div className="majestic-form-container">
      <div className="nebula-glow" />
      <form className="majestic-form" onSubmit={handleSubmit}>
        <h2 className="title-cosmic">{id ? "Update" : "Create"} Galactic Product</h2>
        {Object.keys(form).map((field) => (
          <div className="form-group" key={field}>
            <label className="label-star">{field}</label>
            <input
              className="input-aurora"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        ))}
        <button className="btn-supernova" type="submit">
          {id ? "Update" : "Create"} ✨
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
