import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useEffect(() => {
    fetchOrders(); 
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5001/orders"); 
      if (!response.ok) throw new Error("Failed to fetch orders ");
      const data = await response.json();
      setOrders(data); 
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center">Order History</h1>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Payment Status</th>
            <th>Total Price</th>
            <th>Number of Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderNumber}</td>
              <td>{order.date}</td>
              <td>{order.customerName}</td>
              <td className={`text-${getPaymentColor(order.paymentStatus)}`}>
                {order.paymentStatus}
              </td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.itemsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// دالة لتحديد لون حالة الدفع
const getPaymentColor = (status) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "Success":
      return "success";
    case "Cancelled":
      return "danger";
    default:
      return "secondary";
  }
};

export default OrderHistory;
