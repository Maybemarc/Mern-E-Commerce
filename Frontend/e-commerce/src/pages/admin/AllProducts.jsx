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
      console.log(res.data);
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
        <Link to="/secure/Admin/CreateProduct" className="Create_Product" > Create New Product</Link>
      </div>

      <table>
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
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.category}</td>
              <td>
                <img src={prod.imageUrl} />
              </td>
              <td>₹{prod.price}</td>
              <td>{prod.discountPercentage}%</td>
              <td>{prod.stock}</td>
              <td className="Edit_Links" >
                <Link to={`/secure/Admin/updateProduct/${prod._id}`}>Edit</Link>
                <button
                  className="Delete_Button"
                  onClick={() => handleDelete(prod._id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllProducts;
