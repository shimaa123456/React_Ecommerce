import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById, editOrder } from '../AdminRedux/OrdersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, loading, error } = useSelector((state) => state.orders);

  const [status, setStatus] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  //const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (order) {
      setStatus(order.status); // Set the current status of the order
      setIsCompleted(order.status === 'completed'); // Update isCompleted only when order status is 'completed'
    }
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'completed' && !window.confirm('Are you sure you want to mark this order as completed?')) {
      return; // If user doesn't confirm, do nothing
    }

    const updatedOrder = { ...order, status, isCompleted };

    dispatch(editOrder(updatedOrder))
      .unwrap()
      .then(() => {
        toast.success('Order status updated successfully!');
        navigate(`/dashboard/orders/view-order/${id}`);
      })
      .catch((err) => {
        toast.error(`Failed to update order: ${err}`);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit Order #{order.id}</h1>
        <button
          className="btn btn-info"
          onClick={() => navigate('/dashboard/orders')}
        >
          Back to Orders
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Order Status</label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  setStatus(newStatus);
                  setIsCompleted(newStatus === 'completed');
                }}
                disabled={isCompleted} // Disable the dropdown if order is already completed
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {isCompleted && (
              <div className="alert alert-success" role="alert">
                This order is already marked as completed. You cannot change it back to pending.
              </div>
            )}

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Update Status
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;
