import FeaturedProducts from "../components/Featured_Products";
import FollowOns from "../components/FollowOns";
import Index from "../components/Index";
import OffersPage from "../components/offersPage";
import Card from "../components/Card";
import { useAuth } from "../components/Context/AuthProvider";
import Loader from "../components/LoadPage";


function HomePage() {
  const { loading } = useAuth();
  return (
    <div>
      {/* <h2>HomePage Contents</h2> */}
      {loading ? <Loader /> :
      <>
      <Index />
      <FeaturedProducts />
      <OffersPage />
      <Card />
      <FollowOns />
      </>
}
    </div>
  );
}

export default HomePage;
