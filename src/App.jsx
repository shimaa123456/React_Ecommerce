import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Features/Auth/Pages/LoginPage"; 
import Register from "./Features/Auth/Pages/RegisterPage";
import Dashboard from "./Features/Admin/Pages/Dashboard";
import Products from "./Features/Admin/Pages/Products"; 
import Orders from "./Features/Admin/Pages/Orders"; 
import Quotations from "./Features/Admin/Pages/Quotations"; 
import Users from "./Features/Admin/Pages/Users";
import AllUsers from "./Features/Admin/Components/AllUsers";
import AddUser from "./Features/Admin/Components/AddUser";




import Home from "./Features/Customers/Pages/Home";
import UserProducts from "./Features/Customers/Pages/Products";
import Cart from "./Features/Customers/Pages/Cart";
import Checkout from "./Features/Customers/Pages/Checkout";
import OrderHistory from "./Features/Customers/Pages/OrderHistory";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* Public Routes */}
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/products" element={<Products />} />
        <Route path="dashboard/orders" element={<Orders />} />
        <Route path="dashboard/quotations" element={<Quotations />} />
        <Route path="dashboard/users" element={<Users />}>
          <Route index element={<AllUsers />} />
          <Route path="adduser" element={<AddUser/>} />
        </Route>

        {/* Home Route */}
        <Route path="home" element={<Home />} />
        <Route path="products" element={<UserProducts />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orderhistory" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
