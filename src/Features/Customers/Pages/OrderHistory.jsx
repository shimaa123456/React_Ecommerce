import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Import navigation components
import LogoNavbar from '../../Admin/Components/LogoNavbar';
import Navbar from '../Components/UserNavbar';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]); // لتخزين الطلبات
  const [loading, setLoading] = useState(true); // مؤشر التحميل
  const [error, setError] = useState(null); // لتخزين الأخطاء إن وجدت

  useEffect(() => {
    fetchOrders(); // استدعاء الـ API عند تحميل الصفحة
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5001/orders"); // رابط JSON Server
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data); // تخزين البيانات في الحالة
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error: {error}</div>;

  return (
    <div className="bg-light min-vh-100">
      {/* Logo Navbar */}
      <LogoNavbar />

      <div className="container-fluid p-0">
        {/* Secondary Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="container mt-4">
          <h1 className="text-center">Order History</h1>
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer ID</th>
                <th>Payment Status</th>
                <th>Total Price</th>
                <th>Number of Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.userId}</td>
                  <td className={`text-${getPaymentColor(order.status)}`}>
                    {order.status}
                  </td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>{order.products.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// دالة لتحديد لون حالة الدفع
const getPaymentColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "warning";
    case "completed":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "secondary";
  }
};

export default OrderHistory;
