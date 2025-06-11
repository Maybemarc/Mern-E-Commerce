import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="NotFound_Container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to="/" >
        <button className="NotFound_Redirect">HomePage</button>
      </Link>
    </div>
  );
}

export default NotFound
