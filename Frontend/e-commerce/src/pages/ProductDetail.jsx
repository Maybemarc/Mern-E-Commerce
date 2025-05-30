import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Related from "../components/Related_products";

function ProductDetail() {
  const { id } = useParams();
  const [item, SetItems] = useState();
  const [spinner, SetSpinner] = useState(true);

  const SingleProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/lookup/product/${id}`
      );
      console.log(response.data);
      SetItems(response.data.product);
      SetSpinner(false);
    } catch (error) {
      console.log(`Error in fetching SIngle Product`, error);
    }
  };

  useEffect(() => {
    SingleProduct();
  }, []);

  return (
    <div>
      <h1>SpecificProduct</h1>
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
            <p> {item.description}</p>
          </div>
        </div>
      )}

    {!spinner && item && <Related category={item.category} productId={item._id} />}
    </div>
  );
}

export default ProductDetail;
