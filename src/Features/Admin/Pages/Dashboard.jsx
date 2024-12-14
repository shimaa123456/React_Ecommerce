import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Components/AdminRedux/UsersSlice';
import { fetchProducts } from '../Components/AdminRedux/ProductsSlice'; 
import LogoNavbar from '../Components/LogoNavbar';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for React Router v6+

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize navigate

  // Get users and products data from Redux store
  const { users, error: usersError } = useSelector((state) => state.users);
  const { products, error: productsError } = useSelector((state) => state.products);

  useEffect(() => {
    if (usersError) {
      toast.error(`Error: ${usersError}`);
    }
    if (productsError) {
      toast.error(`Error: ${productsError}`);
    }
  }, [usersError, productsError]);

  useEffect(() => {
    // Dispatch action to fetch users and products when the component mounts
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Calculate the number of users, admins, products, and categories
  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === 'admin').length;

  const totalProducts = products.length;
  const categories = [...new Set(products.map((product) => product.category))];
  const totalCategories = categories.length;

  // Function to navigate to the Add Product page
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
            <button className="btn " onClick={handleAddProduct} style ={{ backgroundColor: '#6B94D3', color: 'white' }}>
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
                  <h5 className="card-title">0 Orders</h5>
                  <p className="card-text">0 shipped</p>
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

            {/* Quotations Card */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-file-alt fa-2x text-warning mb-3"></i>
                  <h5 className="card-title">0 Quotations</h5>
                  <p className="card-text">0 today</p>
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
