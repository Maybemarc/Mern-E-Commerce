function Index() {
  return (
    <div className="Index_Box">
      <div className="Index_Container">
        <div className="Index_One">
          <div className="Index_Title">
            <h1>Welcome to Clothify- Your One-Stop Online Store</h1>
          </div>
          <div className="Index_Content">
            <p>
              Discover the latest products at unbeatable prices. Shop, add to
              cart, and order with ease — all from the comfort of your home.
            </p>
          </div>
          <div className="Index_Shop_Now">
            <span className="Shop_Button">Shop Now</span>
          </div>
        </div>
        <div className="Index_Two">
          <div className="Indexing Index_Image_One">
             <div className="Two_Shop">
              <strong>T-Shirt</strong>
              <br />
              <span>$499</span>
            </div>
            <span className="Two_Arrow"> &#8594;</span>
          </div>
          <div className="Indexing Index_Image_Two">
            <div className="Two_Shop">
              <strong>Hoodie</strong>
              <br />
              <span>$321</span>
            </div>
            <span className="Two_Arrow"> &#8594;</span>
          </div>
          <div className="Indexing Index_Image_Three">
            <p className="Three_para_One">25% OFF</p>
            <p className="Three_para_Two">On clothing now</p>
            <p className="Three_para_Three">Explore Now</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
