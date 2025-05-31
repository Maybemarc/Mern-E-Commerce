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
      <Card />
      <FollowOns />
      {/* <Categories /> */}
    </div>
  );
}

export default HomePage;
