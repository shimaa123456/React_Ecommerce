
const Sidebar = () => {
    return (
      <aside  >
      <div className="border  p-3 mt-4 bg-white shadow-sm  ">
        <p className="mb-3 fw-bold text-dark">Categories</p>
        <div className="d-flex flex-column gap-2 text-muted">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="all" id="all" />
            <label className="form-check-label" htmlFor="all">
              All
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="beauty" id="beauty" />
            <label className="form-check-label" htmlFor="beauty">
              Beauty
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="fragrances" id="fragrances" />
            <label className="form-check-label" htmlFor="fragrances">
            Fragrances
            </label>
            
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="furniture" id="furniture" />
            <label className="form-check-label" htmlFor="furniture">
            Furniture
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="groceries" id="groceries" />
            <label className="form-check-label" htmlFor="groceries">
            Groceries
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="home-decoration" id="home-decoration" />
            <label className="form-check-label" htmlFor="home-decoration">
            Home Decoration
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="kitchen-accessories" id="kitchen-accessories" />
            <label className="form-check-label" htmlFor="kitchen-accessories">
            Kitchen Accessories
            </label>
            </div>
            
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="laptops" id="laptops" />
            <label className="form-check-label" htmlFor="laptops">
            Laptops
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="men" id="men" />
            <label className="form-check-label" htmlFor="men">
              Men
            </label>
          </div><div className="form-check">
            <input className="form-check-input" type="checkbox" value="shoes" id="shoes" />
            <label className="form-check-label" htmlFor="shoes">
              Men Shoses
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="watch" id="watch" />
            <label className="form-check-label" htmlFor="watch">
Watches            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="mobile-accessories" id="mobile-accessories" />
            <label className="form-check-label" htmlFor="mobile-accessories">
            Mobile Aaccessories
</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="motorcycle" id="motorcycle" />
            <label className="form-check-label" htmlFor="motorcycle">
            Motorcycle</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="skin-care" id="skin-care" />
            <label className="form-check-label" htmlFor="skin-care">
            Skin-care</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="smartphone" id="smartphone" />
            <label className="form-check-label" htmlFor="smartphone">
            Smartphones</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="sports-accessories" id="sports-accessories" />
            <label className="form-check-label" htmlFor="sports-accessories">
            Sports Accessories</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="sunglasses" id="sunglasses" />
            <label className="form-check-label" htmlFor="sunglasses">
            Sunglasses</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="tablets" id="tablets" />
            <label className="form-check-label" htmlFor="tablets">
            Tablets</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="women" id="women" />
            <label className="form-check-label" htmlFor="women">
           Women</label>
          </div>
        </div>
      </div>
    </aside>

      
    );
  };
  export default Sidebar;