import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCouponById } from '../AdminRedux/CouponsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewCoupon = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get the necessary data from the store
  const { coupon, loading, error } = useSelector((state) => state.coupons);

  useEffect(() => {
    // Dispatch action to fetch coupon by ID
    dispatch(fetchCouponById(id));
  }, [dispatch, id]);

  // Handle loading, error, or success state
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (loading) return <div>Loading...</div>;
  if (!coupon) return <div>Coupon not found</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#6B94D3' }}>Coupon Details</h1>
        <button
          className="btn btn-info"
          onClick={() => navigate('/dashboard/quotations/coupons')}
        >
          Back to Coupons List
        </button>
      </div>
      <div className="row">
        {/* Coupon Details Column */}
        <div className="col-lg-12 col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{coupon.id}</td>
                  </tr>
                  <tr>
                    <td>Title</td>
                    <td>{coupon.title}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{coupon.description}</td>
                  </tr>
                  <tr>
                    <td>Discount Percentage</td>
                    <td>{coupon.discountPercentage}%</td>
                  </tr>
                  <tr>
                    <td>Start Date</td>
                    <td>{new Date(coupon.startDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td>End Date</td>
                    <td>{new Date(coupon.endDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td>Active</td>
                    <td>
                      <span
                        style={{
                          color: coupon.isActive ? 'green' : 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        {coupon.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Usage Limit</td>
                    <td>{coupon.usageLimit}</td>
                  </tr>
                  <tr>
                    <td>Applicable Categories</td>
                    <td>{coupon.applicableCategories.join(', ')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCoupon;
