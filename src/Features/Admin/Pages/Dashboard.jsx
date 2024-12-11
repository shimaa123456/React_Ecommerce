
import LogoNavbar from '../Components/LogoNavbar';
import Navbar from '../Components/Navbar';

const DashboardPage = () => {
  return (
    <div className="bg-light min-vh-100">
    <div className="container-fluid p-0">
      {/* Top Navbar */}
      <LogoNavbar />

      {/* Secondary Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="container-fluid p-4">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h4">Dashboard</h1>
          <button className="btn btn-primary">
            <i className="fas fa-plus"></i> Create new order
          </button>
        </header>

        <div className="row">
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="fas fa-box fa-2x text-primary mb-3"></i>
                <h5 className="card-title">5 Products</h5>
                <p className="card-text">5 categories</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="fas fa-shopping-cart fa-2x text-success mb-3"></i>
                <h5 className="card-title">0 Orders</h5>
                <p className="card-text">0 shipped</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="fas fa-truck fa-2x text-info mb-3"></i>
                <h5 className="card-title">0 Purchases</h5>
                <p className="card-text">0 today</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="fas fa-file-alt fa-2x text-warning mb-3"></i>
                <h5 className="card-title">0 Quotations</h5>
                <p className="card-text">0 today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DashboardPage;
