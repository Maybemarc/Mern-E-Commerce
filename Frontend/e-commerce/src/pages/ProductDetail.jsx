import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Related from "../components/Related_products";
import { useAuth } from "../components/Context/AuthProvider";
import { useCart } from "../components/Context/Cart";

function ProductDetail() {
  const { id } = useParams();
  const [item, SetItems] = useState();
  const [spinner, SetSpinner] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { user, loading } = useAuth();
  const { addCart } = useCart();
  const navigate = useNavigate();

  const SingleProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/lookup/product/${id}`
      );
      SetItems(response.data.product);
      SetSpinner(false);
    } catch (error) {
      console.log(`Error in fetching SIngle Product`, error);
    }
  };

  const handleAddToCart = () => {
    if (!loading) {
      if (user) {
        addCart(item._id, quantity);
        navigate("/secure/user/cart")
      } else {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    SingleProduct();
  }, []);

  return (
    <div>
      <h1 className="SpecificProduct_Header" >SpecificProduct</h1>
      {spinner ? (
        <p>Loading... </p>
      ) : (
        <div className="specific_Product">
          <div className="product_Image">
            <img src={item.imageUrl} />
          </div>
          <div className="Specific_Product_Details">
            <h1>{item.name}</h1>
            <h2>{item.category}</h2>
            <p>{item.discountPercentage}% OFF</p>
            <p>{item.price}</p>
            <p> {item.description}</p>
            <div className="Cart_Content">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="quantity-input"
              />
              <button onClick={handleAddToCart} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {!spinner && item && (
        <Related category={item.category} productId={item._id} />
      )}
    </div>
  );
}

export default ProductDetail;
