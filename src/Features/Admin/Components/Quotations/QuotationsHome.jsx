import { useNavigate } from 'react-router-dom';

const QuotationsHomePage = () => {
  const navigate = useNavigate();

  // Handlers for navigation
  const handleNavigateToCoupons = () => {
    navigate('/dashboard/quotations/coupons');
  };

  const handleNavigateToDiscounts = () => {
    navigate('/dashboard/quotations/discounts');
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Quotations</h1>
      <div className="row justify-content-center">
        {/* Coupons Card */}
        <div className="col-12 col-md-4 mb-3">
          <div
            className="card text-center"
            onClick={handleNavigateToCoupons}
            style={{ cursor: 'pointer', border: '2px solid #007bff' }}
          >
            <div className="card-body">
              <i className="fas fa-tags fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Coupons</h5>
              <p className="card-text">Manage your coupon codes here.</p>
            </div>
          </div>
        </div>

        {/* Discounts Card */}
        <div className="col-12 col-md-4 mb-3">
          <div
            className="card text-center"
            onClick={handleNavigateToDiscounts}
            style={{ cursor: 'pointer', border: '2px solid #28a745' }}
          >
            <div className="card-body">
              <i className="fas fa-percent fa-3x text-success mb-3"></i>
              <h5 className="card-title">Discounts</h5>
              <p className="card-text">Set up and manage discounts here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationsHomePage;
