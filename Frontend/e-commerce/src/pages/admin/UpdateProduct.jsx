import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";


function UpdateProduct() {
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

  const fetchProduct = async() => {
    try {
      const res = await axios.get(`http://localhost:3000/api/lookup/product/${id}`)
      setForm(res.data.product)
    } catch (error) {
      console.log(`Erron in Fetching to edit a product`, error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =  await axios.put(`http://localhost:3000/api/lookup/update/${id}`, form, { withCredentials: true });
      toast.success("Product Updated")
      navigate("/secure/Admin/AllProducts");
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error(error.response?.data.message || error.message)
    }
  };

  return (
    <div className="Update_container">
      <form className="Update_form" onSubmit={handleSubmit}>
        <h2 className="Update_Header">{id ? "Update" : "Create"} Product</h2>
        {Object.keys(form).map((field) => (
          <div className="form-group" key={field}>
            <label className="Update_label">{field}</label>
            <input
              className="Update_input"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        ))}
        <button className="Update_Button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
