import FollowOns from "../components/FollowOns";
import OrderDetails from "../components/OrderDetails";

function Orders() {
  return (
    <div className="Order_Overall">
      <div className="Order_Collection">
        <div className="Order_Container">
          <div className="Order_Box1">
            <p className="Billing_Content">Billing Details</p>
            <form action="post">
              <div className="input_Names">
                <input type="text" placeholder="First name *" required />
                <input type="text" placeholder="Last name *" required />
              </div>
              <div className="input_Details">
                <label>
                  Address <span>*</span>
                </label>
                <input type="text" placeholder="" required />
                <label>
                  Town / City <span>*</span>
                </label>
                <input type="text" placeholder="Town / City" required />
                <label>
                  ZIPCODE <span>*</span>
                </label>
                <input type="text" placeholder="" required />
                <label>
                  Phone <span>*</span>
                </label>
                <input type="number" placeholder="" required />
                <label>
                  Email Address<span>*</span>
                </label>
                <input type="email" placeholder="Email" required />
              </div>
            </form>
          </div>
          <div className="Order_Box2">
            <OrderDetails />
          </div>
        </div>
      </div>
      <FollowOns />
    </div>
  );
}

export default Orders;
