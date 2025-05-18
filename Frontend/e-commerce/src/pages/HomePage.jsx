import Index from "../components/Index";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <div>
    <Navbar />
    <Index />
    

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