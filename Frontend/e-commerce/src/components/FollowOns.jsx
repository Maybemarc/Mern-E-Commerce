import Payment from "../assets/T-Shirt/wallet-svgrepo-com.png"
import FreeShipping from "../assets/T-Shirt/truck-svgrepo-com.png";
import Contact from "../assets/T-Shirt/chat-round-svgrepo-com.png"
import Gifts from "../assets/T-Shirt/gift-svgrepo-com.png"

function FollowOns() {
  return (
    <div className="FollowOn_Box">
      <div className="FollowOn_Container">
        <div className="Follow_Content">
          <div className="Follow_Image">
            <img
              src={Payment}
              width="100%"
              height="30px"
            />
          </div>
          <div className="Follow_Description">
            <h2>Payments</h2>
            <p>
              Secure and hassle-free payments with all major cards, UPI, and
              wallets accepted.
            </p>
          </div>
        </div>
        <div className="Follow_Content">
          <div className="Follow_Image">
            <img
              src={FreeShipping}
              width="100%"
              height="30px"
            />
          </div>
          <div className="Follow_Description">
            <h2>Free Shipping</h2>
            <p>
              Enjoy fast and free shipping on all orders – no minimum purchase
              required!
            </p>
          </div>
        </div>
        <div className="Follow_Content">
          <div className="Follow_Image">
            <img
              src={Contact}
              width="100%"
              height="30px"
            />
          </div>
          <div className="Follow_Description">
            <h2>Contact Us</h2>
            <p>
              Have questions or need help? Contact us anytime at
              support@shopease.com.
            </p>
          </div>
        </div>
        <div className="Follow_Content">
          <div className="Follow_Image">
            <img
              src={Gifts}
              width="100%"
              height="30px"
            />
          </div>
          <div className="Follow_Description">
            <h2>Gift's</h2>
            <p>
              Celebrate every moment with handpicked gifts– perfect for
              birthdays and anniversaries,more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowOns;
