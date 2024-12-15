import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoupons, deleteCoupon } from '../AdminRedux/CouponsSlice';  
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllCouponsPage = () => {
  const dispatch = useDispatch();
  const { coupons = [], loading, error } = useSelector((state) => state.coupons);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const totalPages = Math.ceil(coupons.length / itemsPerPage);
  const paginatedCoupons = coupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const navigate = useNavigate();

  const handleAddCoupon = () => {
    navigate('/dashboard/quotations/add-coupon');
  };

  const handleDeleteCoupon = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      dispatch(deleteCoupon(id))
        .unwrap()
        .then(() => {
          toast.success('Coupon deleted successfully!');
        })
        .catch((error) => {
          toast.error(`Failed to delete coupon: ${error}`);
        });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Add safety checks
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#6B94D3' }}>Coupons</h1>
        <button
          style={{
            backgroundColor: '#F79420',
            borderColor: '#F79420',
          }}
          className="btn text-white"
          onClick={handleAddCoupon}
        >
          Add Coupon
        </button>
      </div>

      {/* Make the table responsive on small screens */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead style={{ backgroundColor: '#6B94D3', color: 'white' }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Discount (%)</th>
              <th scope="col">Active</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
  {paginatedCoupons.map((coupon, index) => (
    <tr key={coupon.id}>
      <td>{index + 1}</td>
      <td>{coupon.title}</td>
      <td>{new Date(coupon.startDate).toLocaleDateString()}</td>
      <td>{new Date(coupon.endDate).toLocaleDateString()}</td>
      <td>{coupon.discountPercentage}%</td>
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
      <td>
        <div className="d-flex" style={{ flexWrap: 'nowrap' }}>
          <button
            className="btn btn-sm me-2"
            style={{
              backgroundColor: '#6B94D3',
              color: 'white',
              border: 'none',
            }}
            onClick={() => navigate(`/dashboard/quotations/view-coupon/${coupon.id}`)}
          >
            <i className="fas fa-eye"></i>
          </button>
          <button
            className="btn btn-sm me-2"
            style={{
              backgroundColor: '#F79420',
              color: 'white',
              border: 'none',
            }}
            onClick={() => navigate(`/dashboard/quotations/edit-coupon/${coupon.id}`)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: '#FF63A1',
              color: 'white',
              border: 'none',
            }}
            onClick={() => handleDeleteCoupon(coupon.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            {/* Previous Button */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                style={{
                  backgroundColor: currentPage === 1 ? '#f0f0f0' : '',
                  borderColor: '#F79420',
                  color: currentPage === 1 ? '#999' : '',
                }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
            </li>

            {/* Dynamic Page Numbers */}
            {Array.from({ length: Math.min(totalPages, 4) }, (_, idx) => {
              const page = idx + 1 + (Math.ceil(currentPage / 4) - 1) * 4; // Offset for the current group
              if (page > totalPages) return null; // Avoid rendering pages beyond the totalPages
              return (
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    style={{
                      backgroundColor: page === currentPage ? '#F79420' : '',
                      borderColor: '#F79420',
                      color: page === currentPage ? 'white' : '',
                    }}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              );
            })}

            {/* Next Button */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                style={{
                  backgroundColor: currentPage === totalPages ? '#f0f0f0' : '',
                  borderColor: '#F79420',
                  color: currentPage === totalPages ? '#999' : '',
                }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AllCouponsPage;
