import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, SetUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async function () {
    const token = Cookies.get("token");
    if (!token) {
      SetUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        withCredentials: true,
      });
      SetUser(response.data);
        setLoading(false);
    } catch (error) {
      console.log(
        "Error in Checking User: ",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ user, SetUser,loading }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};
