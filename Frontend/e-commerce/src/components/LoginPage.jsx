import axios from "axios";
import {  useState } from "react";
import Cookies from "js-cookie"

function Login() {
  const [content, SetContent] = useState({
    email: "",
    password: "",
  });

  const handleChange = function (event) {
    const { name, value } = event.target;
    SetContent((previtems) => ({ ...previtems, [name]: value }));
  };

  const login = async function (e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email: content.email, password: content.password }
      );
      console.log(response.data);
      SetContent(response.data);
      Cookies.set("token",response.data.token,{expires:365})
    } catch (error) {
      console.log(`Error in loggin In: `, error);
    }
  };

  return (
    <div>
      <h1>Login page</h1>

      <form onSubmit={login}>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={content.email}
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={content.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
