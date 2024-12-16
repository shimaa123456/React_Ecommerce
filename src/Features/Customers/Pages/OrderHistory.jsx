import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../Admin/Components/AdminRedux/OrdersSlice';
import LogoNavbar from "../../Admin/Components/LogoNavbar";
import Navbar from "../Components/UserNavbar";
import { useNavigate } from 'react-router-dom'; 

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  
  // Get the logged-in user from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));
  
  // Initialize navigate function from react-router-dom
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filter orders based on userId
  const userOrders = orders.filter(order => order.userId === user?.id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to get status style
  const getStatusStyle = (status) => {
    if (status === 'completed') {
      return { backgroundColor: '#F79420', color: 'white' }; // Completed status
    }
    return { backgroundColor: '#FF63A1', color: 'white' }; // Pending status
  };

  // Handle "Make a New Order" button click
  const handleMakeNewOrder = () => {
    navigate('/products'); 
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container-fluid p-0">
        <LogoNavbar />
        <Navbar />
        <div className="container mt-5">
          <h1 className="mb-4" style={{ textAlign: 'left', color: '#6B94D3' }}>Order History</h1>

          <div className="row">
            <div className="col-md-8">
              {userOrders.length === 0 ? (
                // If no orders, show this card
                <div className="card mb-3">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-12">
                      <div className="card-body text-center">
                        <h5 className="card-title" style={{ color: '#6B94D3' }}>You haven&#39;t made any orders yet.</h5>
                        <p className="card-text">Looks like you haven’t made any purchases yet. Start browsing our products!</p>
                        <button
                          className="btn btn-primary"
                          onClick={handleMakeNewOrder}
                          style={{ backgroundColor: '#F79420', borderColor: '#F79420' }}
                        >
                          Start Shopping
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                userOrders.map((order) => (
                  <div className="card mb-3" key={order.id}>
                    <div className="row g-0 align-items-center">
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title" style={{ color: '#6B94D3' }}>Order ID: {order.id}</h5>
                          <p className="card-text">Total: ${order.total}</p>
                          <p className="card-text">Status:   
                            <span
                              className="badge"
                              style={getStatusStyle(order.status)}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span> 
                          </p>
                          <p className="card-text">Payment Method: {order.paymentMethod}</p>
                          <p className="card-text">Shipping Method: {order.shippingMethod}</p>
                          <p className="card-text">Coupon: {order.coupon}</p>
                          <p className="card-text">Created At: {new Date(order.createdAt).toLocaleDateString()}</p>

                          {/* Display products in the order */}
                          <h6>Products</h6>
                          <ul>
                            {order.products.map((product) => (
                              <li key={product.id}>
                                <div className="d-flex align-items-center">
                                  <div className="me-3">
                                    {/* Display product image */}
                                    <img
                                      src={product.thumbnail || "https://via.placeholder.com/150"}
                                      alt={product.title}
                                      className="img-fluid"
                                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                  </div>
                                  <div>
                                    <p className="mb-1">{product.title}</p>
                                    <p className="text-muted">${product.price}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Order Summary</h5>
                  <hr />
                  <p className="card-text">
                    <strong>Total Orders:</strong> {userOrders.length}
                  </p>
                  <p className="card-text">
                    <strong>Total Spend:</strong> ${userOrders.reduce((acc, order) => acc + order.total, 0).toFixed(2)}
                  </p>
                  <button className="btn btn-primary w-100 mt-3" style={{ backgroundColor: '#F79420', borderColor: '#F79420' }}
                    onClick={handleMakeNewOrder}>
                    Make a New Order
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

export default OrderHistory;
