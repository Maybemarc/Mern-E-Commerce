import { Link } from "react-router-dom";

function OffersPage() {
  return (
    <div className="Offer_Collection">
      <div className="Offer_Container">
        <div className="Offer_One">
          <div className="Offer_One_Image">
            <img src="./src/assets/T-Shirt/domino-studio-164_6wVEHfI-unsplash.jpg" />
          </div>
          <div className="Offer_One_Content">
            <h4>New Shoe Collection</h4>
            <h2>25% OFF</h2>
            <Link to="/products?category=Shoe">
              <button className="Offer_One_Content_View_Offer">
                VIEW OFFER
              </button>
            </Link>
          </div>
        </div>
        <div className="Offer_Two">
          <div className="Offer_Two_Content1">
            <div className="Offer_Two_Content_Details">
              <h2>New SunGlasses Collection</h2>
              <h1>10%OFF</h1>
              <Link to="/products?category=Sunglasses">
                <div className="button_ViewOffer">
                  <button className="Offer_Two_Content_View_Offer">
                    VIEW OFFER
                  </button>
                </div>
              </Link>
            </div>
            <div className="Offer_Two_Content_Image">
              <img
                className="Offer_Image"
                src="./src/assets/T-Shirt/joseph-greve-dPw0N01onxE-unsplash.jpg"
                width="100%"
                height="100px"
              />
            </div>
          </div>
          <div className="Offer_Two_Content1 Color">
            <div className="Offer_Two_Content_Details">
              <h2>New Watch Collection</h2>
              <h1>10%OFF</h1>
              <Link to="/products?category=Watch">
                <div className="button_ViewOffer">
                  <button className="Offer_Two_Content_View_Offer">
                    VIEW OFFER
                  </button>
                </div>
              </Link>
            </div>
            <div className="Offer_Two_Content_Image">
              <img
                className="Offer_Image"
                src="./src/assets/T-Shirt/lucas-santos-huRn8ECqADI-unsplash.jpg"
                width="100%"
                height="100px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OffersPage;
