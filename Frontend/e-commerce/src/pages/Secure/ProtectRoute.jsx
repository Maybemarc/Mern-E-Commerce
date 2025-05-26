import { useAuth } from "../../components/Context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

function Protect({ children }) {
  const { user,loading } = useAuth();
  const location = useLocation();
  
 if (loading) return <p>Loading...</p>;


  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default Protect;
