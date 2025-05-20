import FeaturedProducts from "../components/Featured_Products";
import FollowOns from "../components/FollowOns";
import Index from "../components/Index";
import Navbar from "../components/Navbar";
import OffersPage from "../components/offersPage";
import Categories from "../components/Categories";
import Card from "../components/Card";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Index />
      <FeaturedProducts />
      <OffersPage />
      {/* <Categories /> */}
      {/* <FollowOns /> */}
      <Card />
    </div>
  );
}

export default HomePage;

//   const getAllProducts = async function () {
//     try {
//       const response = await axios.get("http://localhost:3000/api/lookup", {
//         withCredenetials: true,
//       });
//       console.log(response.data.products);
//       SetProducts(response.data.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllProducts();
//   }, []);

// <h1>Home page</h1>
//     {!products ? (
//       <div>
//         <h3>No blog</h3>
//       </div>
//     ) : (
//       products.map((product) => <h2 key={product.id}>{product.name}</h2>)
//     )}
