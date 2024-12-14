import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, deleteOrder } from '../AdminRedux/OrdersSlice';
import { fetchUsers } from '../AdminRedux/UsersSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { users } = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const navigate = useNavigate();


  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(id))
        .unwrap()
        .then(() => {
          toast.success('Order deleted successfully!');
        })
        .catch((error) => {
          toast.error(`Failed to delete order: ${error}`);
        });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#6B94D3' }}>Orders</h1>
      </div>

      {/* Make the table responsive on small screens */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead style={{ backgroundColor: '#6B94D3', color: 'white' }}>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User</th>
              <th scope="col">Total</th>
              <th scope="col">Tax</th>
              <th scope="col">Discount</th>
              <th scope="col">Status</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Shipping Method</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
                    
              <tr key={order.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>
                {users.find((user) => user.id === order.userId)?.name || 'User not found'}
                </td>
                <td>${order.total}</td>
                <td>${order.tax}</td>
                <td>${order.discount}</td>
                <td>
                <span
                    className={`badge ${
                        order.status === 'completed'
                        ? 'text-white'
                        : 'text-dark'
                    }`}
                    style={{
                      backgroundColor: order.status === 'completed' ? '#FF63A1' : '#F79420',
                    }}
                  >
                    {order.status}
                  </span>
                  </td>
                <td>{order.paymentMethod}</td>
                <td>{order.shippingMethod}</td>
                <td>
                  <div className="d-flex" style={{ flexWrap: 'nowrap' }}>
                    <button
                      className="btn btn-sm me-2"
                      style={{
                        backgroundColor: '#6B94D3',
                        color: 'white',
                        border: 'none',
                      }}
                      onClick={() => navigate(`/dashboard/orders/view-order/${order.id}`)}
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
                      onClick={() => navigate(`/dashboard/orders/edit-order/${order.id}`)}
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
                      onClick={() => handleDeleteOrder(order.id)}
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

export default AllOrders;
