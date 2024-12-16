import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Features/Auth/Pages/LoginPage"; 
import Register from "./Features/Auth/Pages/RegisterPage";
import Profile from "./Features/Auth/Pages/ProfilePage";
import EditProfile from "./Features/Auth/Pages/EditProfile";


import Dashboard from "./Features/Admin/Pages/Dashboard";
import Orders from "./Features/Admin/Pages/Orders"; 
import Quotations from "./Features/Admin/Pages/Quotations"; 
import Users from "./Features/Admin/Pages/Users";
import AllUsers from "./Features/Admin/Components/Users/AllUsers";
import AddUser from "./Features/Admin/Components/Users/AddUser";
import EditUser from "./Features/Admin/Components/Users/EditUser";
import ViewUser from "./Features/Admin/Components/Users/ViewUser";
import Products from "./Features/Admin/Pages/Products";
import AllProducts from "./Features/Admin/Components/Products/AllProducts";
import AddProduct from "./Features/Admin/Components/Products/AddProduct";
import  EditProduct from "./Features/Admin/Components/Products/EditProduct";
import ViewProduct from "./Features/Admin/Components/Products/ViewProduct";
import AllOrders from "./Features/Admin/Components/Orders/AllOrders";
import ViewOrder from "./Features/Admin/Components/Orders/ViewOrder";
import EditOrder from "./Features/Admin/Components/Orders/EditOrder";
import QuotationsHome from "./Features/Admin/Components/Quotations/QuotationsHome";
import DiscountsPage from "./Features/Admin/Components/Quotations/DiscountsPage";
import AllCouponsPage from "./Features/Admin/Components/Quotations/AllCouponsPage";
import AddCoupon from "./Features/Admin/Components/Quotations/AddCoupon";
 import ViewCoupon from "./Features/Admin/Components/Quotations/ViewCoupon";
 import EditCoupon from "./Features/Admin/Components/Quotations/EditCoupon";



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
        <Route path="profile/:id" element={<Profile />} />
        <Route path="edit-profile/:id" element={<EditProfile />} />

        {/* Dashboard Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/users" element={<Users />}>
          <Route index element={<AllUsers />} />
          <Route path="add-user" element={<AddUser/>} />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="/dashboard/users/view-user/:id" element={<ViewUser />} />
        </Route>
        <Route path="dashboard/products" element={<Products />}>
          <Route index element={<AllProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="/dashboard/products/view-product/:id" element={<ViewProduct />} />
        </Route>
        <Route path="dashboard/orders" element={<Orders />} >
          <Route index element={<AllOrders />} />
          <Route path="/dashboard/orders/view-order/:id" element={<ViewOrder />} />
          <Route path="edit-order/:id" element={<EditOrder />} />
        </Route>
        <Route path="dashboard/quotations" element={<Quotations />} >
          <Route index element={<QuotationsHome/>} />
          <Route path="discounts" element={<DiscountsPage />} />
          <Route path="coupons" element={<AllCouponsPage />} />
          <Route path="add-coupon" element={<AddCoupon />} />
          <Route path="/dashboard/quotations/view-coupon/:id" element={<ViewCoupon />} />
          <Route path="/dashboard/quotations/edit-coupon/:id" element={<EditCoupon />} />
        </Route>

        {/* Home Route */}
      <Route path="home" element={<Home />} />
        <Route path="products" element={<UserProducts />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cart/checkout" element={<Checkout />} />
        <Route path="orderhistory" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;




