import FeaturedProducts from "../components/Featured_Products";
import FollowOns from "../components/FollowOns";
import Index from "../components/Index";
import OffersPage from "../components/offersPage";
import Card from "../components/Card";



function HomePage() {
  return (
    <div>
      {/* <h2>HomePage Contents</h2> */}
      <Index />
      <FeaturedProducts />
      <OffersPage />
      <Card />
      <FollowOns />
    </div>
  );
}

export default HomePage;
