import LogoNavbar from '../../Admin/Components/LogoNavbar';
import Navbar from '../Components/UserNavbar';

    const CartPage = () => {
        
     
     
     
    return (
        <div className="bg-light min-vh-100">
            <div className="container-fluid p-0">
                {/* Top Navbar */}
                <LogoNavbar />

                {/* Secondary Navbar */}
                <Navbar />

                {/* Dashboard Content */}
                <div className="container mt-5">
      <h1 className="text-center mb-4">Shopping Cart</h1>

      <div className="row">
        {/* قائمة المنتجات */}
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="row g-0 align-items-center">
              <div className="col-md-4">
                <img
                  src="https://via.placeholder.com/150"
                  className="img-fluid rounded-start"
                  alt="Product"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Product Name</h5>
                  <p className="card-text">$99.99</p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-secondary btn-sm me-2">-</button>
                    <span className="mx-2">1</span>
                    <button className="btn btn-secondary btn-sm me-3">+</button>
                    <button className="btn btn-danger btn-sm">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* منتج آخر */}
          <div className="card mb-3">
            <div className="row g-0 align-items-center">
              <div className="col-md-4">
                <img
                  src="https://via.placeholder.com/150"
                  className="img-fluid rounded-start"
                  alt="Product"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Another Product</h5>
                  <p className="card-text">$49.99</p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-secondary btn-sm me-2">-</button>
                    <span className="mx-2">2</span>
                    <button className="btn btn-secondary btn-sm me-3">+</button>
                    <button className="btn btn-danger btn-sm">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الملخص */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Cart Summary</h5>
              <hr />
              <p className="card-text">
                <strong>Total Items:</strong> 3
              </p>
              <p className="card-text">
                <strong>Total Price:</strong> $199.97
              </p>
              <button className="btn btn-primary btn-block w-100">
                Proceed to Checkout
              </button>
              <button className="btn btn-secondary btn-block w-100 mt-2">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>



            </div>
        </div>    
    );
};

export default CartPage;