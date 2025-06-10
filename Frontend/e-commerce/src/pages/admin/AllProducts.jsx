import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/lookup?limit=100",
        {
          withCredentials: true,
        }
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/lookup/delete/${id}`, {
        withCredentials: true,
      });
      console.log(id);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-product-list">
      <div className="All_Product_Box">
        <h2>All Products</h2>
        <Link to="/secure/Admin/CreateProduct" className="Create_Product">
          <p>Create New Product</p>
        </Link>
      </div>

      <table className="All_Products_Table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Image</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id} className="All_Row">
              <td className="td-name">{prod.name}</td>
              <td className="td-category">{prod.category}</td>
              <td className="td-image">
                <img src={prod.imageUrl} alt={prod.name} />
              </td>
              <td className="td-price">₹{prod.price}</td>
              <td className="td-discount">{prod.discountPercentage}%</td>
              <td className="td-stock">{prod.stock}</td>
              <td className="td-actions Edit_Links">
                <div className="Edit_links_Content">
                  <Link
                    to={`/secure/Admin/updateProduct/${prod._id}`}
                    className="AllProducts_Edit_Content"
                  >
                    Edit
                  </Link>
                  <button
                    className="Delete_Button"
                    onClick={() => handleDelete(prod._id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllProducts;

// <tr key={prod._id} className="All_Row" >
//               <td>{prod.name}</td>
//               <td>{prod.category}</td>
//               <td>
//                 <img src={prod.imageUrl} />
//               </td>
//               <td>₹{prod.price}</td>
//               <td>{prod.discountPercentage}%</td>
//               <td>{prod.stock}</td>
//               <td className="Edit_Links" >
//                 <Link to={`/secure/Admin/updateProduct/${prod._id}`}>Edit</Link>
//                 <button
//                   className="Delete_Button"
//                   onClick={() => handleDelete(prod._id)}
//                 >
//                   🗑 Delete
//                 </button>
//               </td>
//             </tr>
