import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE_URL

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_URL}/auth/`, form, {
        withCredentials: true,
      });
      toast.success("Registered")
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
       toast.error(err.response?.data.message || error.message);
    }
  };

  return (
    <div className="Register_Collection">
      <div className="Register_Container">
        <h1 className="Register_Header">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="Register_Name">
            <label>
              Name <span>*</span>{" "}
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="Register_Name">
            <label>
              Email <span>*</span>{" "}
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="Register_Name">
            <label>
              Password <span>*</span>{" "}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="Register_Button" type="submit">
            Register
          </button>
          {error && <p>{error}</p>}
        </form>
        <div className="Login_Ridrect">
          <span className="Existing_User">Already a user? </span>
          <button className="Redirect_Login"
          onClick={() => navigate("/login")}
          >Login</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
