import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../Admin/Components/AdminRedux/ProductsSlice";
import LogoNavbar from '../../Admin/Components/LogoNavbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faShoppingCart, faTruck, faShoppingBasket, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import ReviewForm from "../Components/ReviewForm";

import { addToCart } from '../../Admin/Components/AdminRedux/cartSlice';


const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.products);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("null");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(productId)); // Fetch product details based on productId
  }, [productId, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("home")) {
      setActiveItem("home");
    } else if (path.includes("products")) {
      setActiveItem("products");
    } else if (path.includes("cart")) {
      setActiveItem("cart");
    } else if (path.includes("orderhistory")) {
      setActiveItem("orderhistory");
    }
  }, [location]);

  const handleAddToCartClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user || !user.id) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user.id,
          product: { ...product, quantity: 1 },
        })
      ).unwrap();
      toast.success(`${product.title} added to cart successfully!`);
    } catch (error) {
      toast.error(`Failed to add ${product.title} to cart: ${error.message}`);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-light min-vh-100">
      <div className="container-fluid p-0">
        <LogoNavbar />

        {/* Top Navbar */}
        <nav
          className="navbar navbar-light bg-white px-4 border-bottom"
          style={{ borderBottom: "2px solid #4B7BAF", height: "60px" }}
        >
          <div className="d-flex justify-content-between w-100 align-items-center">
            {/* Hamburger Icon */}
            <button
              className="navbar-toggler d-lg-none position-absolute"
              type="button"
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              aria-controls="sidebar"
              aria-expanded={isSidebarVisible}
              aria-label="Toggle navigation"
              style={{ left: "10px", top: "30%" }}
            >
              <FontAwesomeIcon icon={faBars} style={{ color: "#4B7BAF" }} />
            </button>

            {/* Navbar Links (Desktop View) */}
            <ul className="navbar-nav d-flex flex-row m-0 d-none d-lg-flex">
              {[
                { key: "home", label: "Home", icon: faBox, path: "/home" },
                { key: "products", label: "Products", icon: faShoppingCart, path: "/products" },
                { key: "cart", label: "Cart", icon: faTruck, path: "/cart" },
                { key: "orderhistory", label: "Order History", icon: faShoppingBasket, path: "/orderhistory" },
              ].map((item) => (
                <li className="nav-item me-4" key={item.key}>
                  <Link
                    to={item.path}
                    className={`nav-link d-flex align-items-center ${activeItem === item.key ? "active-nav-item" : ""}`}
                    onClick={() => setActiveItem(item.key)}
                    style={{
                      color: "#4B7BAF",
                      paddingBottom: "10px",
                      position: "relative",
                      fontSize: "1rem",
                      fontWeight: activeItem === item.key ? "bold" : "normal",  // Bold active item
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="me-2" />
                    {item.label}
                    {activeItem === item.key && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: -9,
                          left: 0,
                          width: "100%",
                          height: "3px",
                          backgroundColor: "#4B7BAF",
                        }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Sidebar (for smaller screens) */}
        {isSidebarVisible && (
          <div
            className="sidebar bg-white position-absolute w-100"
            style={{
              top: "60px",
              left: 0,
              padding: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            <ul className="navbar-nav d-flex flex-column">
              {[
                { key: "home", label: "Home", icon: faBox, path: "/home" },
                { key: "products", label: "Products", icon: faShoppingCart, path: "/products" },
                { key: "cart", label: "Cart", icon: faTruck, path: "/cart" },
                { key: "orderhistory", label: "Order History", icon: faShoppingBasket, path: "/orderhistory" },
              ].map((item) => (
                <li className="nav-item mb-3" key={item.key}>
                  <Link
                    to={item.path}
                    className={`nav-link d-flex align-items-center ${activeItem === item.key ? "active-nav-item" : ""}`}
                    onClick={() => setActiveItem(item.key)}
                    style={{
                      color: "#4B7BAF",
                      paddingBottom: "10px",
                      fontSize: "1rem",
                      position: "relative",
                      fontWeight: activeItem === item.key ? "bold" : "normal", // Bold active item
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="me-2" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Product Details Section */}
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 style={{ color: '#6B94D3' }}>{product.title}</h1>
            <button
              className="btn btn-info"
              onClick={() => navigate('/products')}
            >
              Back
            </button>
          </div>

          <div className="row">
            {/* Product Image and Details Column (Left) */}
            <div className="col-lg-6 col-12 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <img
                    src={product.thumbnail || '/placeholder.png'}
                    alt={product.title}
                    className="img-fluid rounded mb-3"
                    width="200"
                    height="200"
                  />
                  <h3>{product.title}</h3>
                </div>
              </div>

              <div className="card mt-3">
                <div className="card-body">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>Description</td>
                        <td>{product.description}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>{product.category}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>${product.price}</td>
                      </tr>
                      <tr>
                        <td>Stock</td>
                        <td>{product.stock}</td>
                      </tr>
                      <tr>
                        <td>Brand</td>
                        <td>{product.brand}</td>
                      </tr>
                      <tr>
                        <td>SKU</td>
                        <td>{product.sku}</td>
                      </tr>
                      <tr>
                        <td>Rating</td>
                        <td>{product.rating}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleAddToCartClick}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews and Review Form Column (Right) */}
            <div className="col-lg-6 col-12 mb-3">
              <div className="card">
                <div className="card-body">
                  <h4>Customer Reviews</h4>
                  {product.reviews && product.reviews.length > 0 ? (
                    <ul>
                      {product.reviews.map((review, index) => (
                        <li key={index} className="review-item">
                          <div>
                            <strong>{review.reviewerName}</strong> - {review.rating} Stars
                          </div>
                          <p>{review.comment}</p>
                          <small>{new Date(review.date).toLocaleDateString()}</small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>
              </div>

              {/* Review Form */}
              <div className="card mt-3">
                <div className="card-body">
                  {productId && <ReviewForm productId={product.id} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
