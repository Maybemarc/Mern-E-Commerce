import axios from "axios";
import { useEffect, useState } from "react";

function Related(props) {
  const [Related, SetRelated] = useState();
  const [retreving, Setretreing] = useState(true);
  console.log(props.productId);
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/lookup?category=${props.category}`
      );
      console.log(response.data.products);
      const result = response.data.products.filter((c) => c._id !== props.productId)
      SetRelated(result);
      Setretreing(false);
    } catch (error) {
      console.log(`Error in Related Product`, error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="Related_Container">
      {/* <div className="Related_Header">
        <h2>Related</h2>
      </div> */}
      {retreving ? (
        <p>Loading...</p>
      ) : (
        Related.map((prod) => (
          <div className="Related_Box">
            <img src={prod.imageUrl}  />
            <p>{prod.name}</p>
            <p> {prod.category}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Related;
