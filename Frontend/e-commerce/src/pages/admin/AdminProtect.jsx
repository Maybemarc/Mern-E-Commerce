import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthProvider";
import Loader from "../../components/LoadPage";
import { useEffect } from "react";

function AdminProtect({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate()

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
    
  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      navigate("/");
    }
  }, [user, loading]);

  return children;
}

export default AdminProtect;
