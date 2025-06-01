import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthProvider";
import { useCart } from "./Context/Cart";

function Related(props) {
  const { user, loading } = useAuth();
  const [Related, SetRelated] = useState();
  const [retreving, Setretreing] = useState(true);
  const { addCart } = useCart();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/lookup?category=${props.category}`
      );
      console.log(response.data.products);
      const result = response.data.products.filter(
        (c) => c._id !== props.productId
      );
      SetRelated(result);
      Setretreing(false);
    } catch (error) {
      console.log(`Error in Related Product`, error);
    }
  };

  const discountedPrice = (price, discounted) => price * (1 - discounted / 100);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="Related_Products">
      <div className="Related_Header">
        <h2>Related</h2>
      </div>
      {retreving ? (
        <p>Loading...</p>
      ) : (
        Related.map((prod) => (
          <div className="Related_Container" key={prod._id}>
            <Link
              to={`/productDetail/${prod._id}`}
              className="Related_Links"
              onClick={() => {
                window.location.href = `/productDetail/${prod._id}`;
              }}
            >
              <div className="Related_Box">
                <p className="Related_Percentage">
                  {prod.discountPercentage}% OFF
                </p>
                {console.log(prod)}
                <img src={prod.imageUrl} />
                <p className="Featured_Link_Name">{prod.name}</p>
                <p className="Related_Link_Name_Category"> {prod.category}</p>
              </div>
            </Link>
            <div className="Related_Price_Details">
              <div className="Detail_Price_Content">
                <p className="Related_Final_Price">
                  {discountedPrice(prod.price, prod.discountPercentage).toFixed(
                    0
                  )}
                </p>
                <p
                  className="Realted_Original_Price"
                  style={{ textDecoration: "line-through" }}
                >
                  {prod.price}
                </p>
              </div>
              <button
                onClick={
                  !loading
                    ? user
                      ? () => addCart(prod._id, 1)
                      : () => navigate("/login")
                    : null
                }
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Related;
