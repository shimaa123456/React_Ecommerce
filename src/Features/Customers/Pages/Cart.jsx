import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import LogoNavbar from "../../Admin/Components/LogoNavbar";
import Navbar from "../Components/UserNavbar";
import { fetchCart, updateCartItem, setTotalAmount } from "../../Admin/Components/AdminRedux/CartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";


const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const cart = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      dispatch(fetchCart({ userId: user.id })).finally(() => setLoading(false));
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(setTotalAmount());
  }, [cart, dispatch]);

  const updateQuantity = (productId, delta) => {
    const product = cart.find((p) => p.id === productId);
    if (product) {
      const newQuantity = product.quantity + delta;
  
      // Check if new quantity is within stock limits
      if (newQuantity > product.stock) {
        alert(`You cannot increase the quantity beyond the available stock of ${product.stock} items.`);
        return;
      }
  
      if (newQuantity > 0) {
        dispatch(updateCartItem({ userId: user.id, productId, newQuantity }));
      }
    }
  };

  const removeProduct = (productId) => {
    dispatch(updateCartItem({ userId: user.id, productId, newQuantity: 0 }));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      // Show toast if cart is empty
      toast.error("Your cart is empty! Please add some items before proceeding to checkout.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      navigate("/cart/checkout");
    }
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container-fluid p-0">
        <LogoNavbar />
        <Navbar />
        <div className="container mt-5">
          {/* Align "Shopping Cart" to the left */}
          <h1 className="mb-4" style={{ textAlign: 'left', color: '#6B94D3' }}>Shopping Cart</h1>

          {/* Cart Content */}
          <div className="row">
            <div className="col-md-8">
              {loading ? (
                <p>Loading...</p>
              ) : cart.length === 0 ? (
                <div className="col-md-12">
                  <div className="card shadow-sm p-4">
                    <div className="text-center">
                      <FontAwesomeIcon icon={faShoppingCart} size="3x" color="#FF63A1" />
                      <p className="mt-3" style={{ fontSize: '1.5rem', color: '#6B94D3' }}>No items in your cart</p>
                      <button
                        className="btn btn-primary btn-lg mt-3"
                        onClick={handleContinueShopping}
                        style={{ backgroundColor: '#F79420', borderColor: '#F79420' }}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                cart.map((product) => (
                  <div className="card mb-3" key={product.id}>
                    <div className="row g-0 align-items-center">
                      <div className="col-md-4">
                        <img
                          src={product.thumbnail || "https://via.placeholder.com/150"}
                          className="img-fluid rounded-start"
                          alt={product.title}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">${product.price ? product.price.toFixed(2) : "N/A"}</p>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-secondary btn-sm me-2"
                              onClick={() => updateQuantity(product.id, -1)}
                            >
                              -
                            </button>
                            <span className="mx-2">{product.quantity}</span>
                            <button
                              className="btn btn-secondary btn-sm me-3"
                              onClick={() => updateQuantity(product.id, 1)}
                            >
                              +
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => removeProduct(product.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cart Summary</h5>
                  <hr />
                  <p className="card-text">
                    <strong>Total Items:</strong> {cart.reduce((acc, product) => acc + product.quantity, 0)}
                  </p>
                  <p className="card-text">
                    <strong>Total Price:</strong> ${cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-primary btn-block w-100"
                    onClick={handleCheckout}
                    style={{ backgroundColor: '#F79420', borderColor: '#F79420' }}
                    disabled={cart.length === 0}  // Disable if cart is empty
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="btn btn-secondary btn-block w-100 mt-2"
                    onClick={handleContinueShopping}
                    style={{ backgroundColor: '#FF63A1', borderColor: '#FF63A1' }}
                  >
                    Continue Shopping
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

export default CartPage;
