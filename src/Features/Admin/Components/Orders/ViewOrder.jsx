import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchOrderById } from '../AdminRedux/OrdersSlice';
import { fetchUsers } from '../AdminRedux/UsersSlice';
import { fetchProducts } from '../AdminRedux/ProductsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get the necessary data from the store
  const { order, loading, error } = useSelector((state) => state.orders);
  const { users } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    // Dispatch actions to fetch order, users, and products
    dispatch(fetchOrderById(id));
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, [dispatch, id]);

  // Handle loading, error, or success state
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  // Find the user by userId
  const user = users.find((user) => user.id === order.userId);
  
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#6B94D3' }}>Order #{order.id}</h1>
        <button
          className="btn btn-info"
          onClick={() => navigate('/dashboard/orders')}
        >
          Back
        </button>
      </div>
      <div className="row">
        {/* Order Details Column */}
        <div className="col-lg-12 col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>User</td>
                    <td>{user ? user.name : 'User not found'}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{order.status}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>${order.total}</td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td>${order.tax}</td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>${order.discount}</td>
                  </tr>
                  <tr>
                    <td>Coupon</td>
                    <td>{order.coupon}</td>
                  </tr>
                  <tr>
                    <td>Payment Method</td>
                    <td>{order.paymentMethod}</td>
                  </tr>
                  <tr>
                    <td>Shipping Method</td>
                    <td>{order.shippingMethod}</td>
                  </tr>
                  <tr>
                    <td>Created At</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Is Completed</td>
                    <td>{order.isCompleted ? 'Yes' : 'No'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Product Details Column */}
        <div className="col-lg-12 col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <h3>Products in this Order</h3>
              {/* Make the table responsive */}
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Product Image</th>
                      <th>Product Title</th>
                      <th>Price</th>
                      <th>Discount Percentage</th>
                      <th>Stock</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((orderProduct) => {
                      // Find the product in the fetched product list
                      const product = products.find(
                        (prod) => prod.id === orderProduct.id
                      );
                      
                      // Display product info if found, else show a placeholder
                      if (product) {
                        return (
                          <tr key={product.id}>
                            <td>
                              <img
                                src={product.images[0]}
                                alt={product.title}
                                width="50"
                                height="50"
                                className="img-fluid"
                              />
                            </td>
                            <td>{product.title}</td>
                            <td>${product.price}</td>
                            <td>{product.discountPercentage}%</td>
                            <td>{product.stock}</td>
                            <td>{orderProduct.quantity || 1}</td>
                          </tr>
                        );
                      } else {
                        return (
                          <tr key={orderProduct.id}>
                            <td colSpan="6">Product not found</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
