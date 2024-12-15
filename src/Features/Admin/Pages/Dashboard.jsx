import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Components/AdminRedux/UsersSlice';
import { fetchProducts } from '../Components/AdminRedux/ProductsSlice'; 
import { fetchOrders } from '../Components/AdminRedux/OrdersSlice';  
import { fetchCoupons } from '../Components/AdminRedux/CouponsSlice';  
import LogoNavbar from '../Components/LogoNavbar';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  // Get users, products, orders, and coupons data from Redux store
  const { users, error: usersError } = useSelector((state) => state.users);
  const { products, error: productsError } = useSelector((state) => state.products);
  const { orders, error: ordersError } = useSelector((state) => state.orders); 
  const { coupons, error: couponsError } = useSelector((state) => state.coupons);

  useEffect(() => {
    if (usersError) {
      toast.error(`Error: ${usersError}`);
    }
    if (productsError) {
      toast.error(`Error: ${productsError}`);
    }
    if (ordersError) {
      toast.error(`Error: ${ordersError}`); 
    }
    if (couponsError) {
      toast.error(`Error: ${couponsError}`); 
    }
  }, [usersError, productsError, ordersError, couponsError]);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchCoupons());  
  }, [dispatch]);

  // Calculate metrics
  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === 'admin').length;
  const totalProducts = products.length;
  const categories = [...new Set(products.map((product) => product.category))];
  const totalCategories = categories.length;
  const totalOrders = orders.length;  
  const totalCompletedOrders = orders.filter((order) => order.status === 'completed').length;  

  const totalCoupons = coupons.length;

  // Coupons starting today
  const today = new Date().toISOString().split('T')[0];
  const todayCoupons = coupons.filter(
    (coupon) => coupon.startDate.split('T')[0] === today
  ).length;

  const handleAddProduct = () => {
    navigate('products/add-product');  
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container-fluid p-0">
        {/* Top Navbar */}
        <LogoNavbar />

        {/* Secondary Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <div className="container-fluid p-4">
          <header className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h4">Dashboard</h1>
            <button className="btn " onClick={handleAddProduct} style={{ backgroundColor: '#6B94D3', color: 'white' }}>
              <i className="fas fa-plus"></i> Create new product
            </button>
          </header>

          <div className="row">
            {/* Products Card */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-box fa-2x text-primary mb-3"></i>
                  <h5 className="card-title">{totalProducts} Products</h5>
                  <p className="card-text">{totalCategories} Categories</p>
                </div>
              </div>
            </div>

            {/* Orders Card */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-shopping-cart fa-2x text-success mb-3"></i>
                  <h5 className="card-title">{totalOrders} Orders</h5>
                  <p className="card-text">{totalCompletedOrders} Completed</p>
                </div>
              </div>
            </div>

            {/* Admins Card */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-user-shield fa-2x text-warning mb-3"></i>
                  <h5 className="card-title">{totalAdmins} Admins</h5>
                  <p className="card-text">{totalUsers - totalAdmins} Regular Users</p>
                </div>
              </div>
            </div>

            {/* Coupons Card */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-tag fa-2x text-info mb-3"></i>
                  <h5 className="card-title">{totalCoupons} Coupons</h5>
                  <p className="card-text">{todayCoupons} Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
