import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "./Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const { user, SetUser, checkUser, loading } = useAuth();
  const [content, SetContent] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/");
      }
    }
  });

  const handleChange = function (event) {
    const { name, value } = event.target;
    SetContent((previtems) => ({ ...previtems, [name]: value }));
  };

  const login = async function (e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email: content.email, password: content.password },
        {
          withCredentials: true,
        }
      );
      SetUser(response.data.token);
      Cookies.set("token", response.data.token, { expires: 365 });
      toast.success("Logged In");
      await checkUser();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      navigate("/login");
    }
  };

  return (
    <div className="Login_Collection">
      <div className="Login_Container">
        <div className="Login_Welcome">
          <h1>Welcome Back</h1>
          <h3>Login to explore the products</h3>
          <button
            onClick={() => navigate("/Signup")}
            className="Register_Redirect"
          >
            New User?
          </button>
        </div>
        <div className="Login_Details">
          <div className="Login_Box">
            <h2>Login</h2>
            <form onSubmit={login}>
              <div className="Login_Form_Content">
                <label>
                  Email <span>*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={content.email}
                />
                <label>
                  Password<span>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={content.password}
                />
                <button className="Login_button" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
