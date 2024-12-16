import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../Admin/Components/AdminRedux/ProductsSlice';
import { addToCart } from '../../../Admin/Components/AdminRedux/CartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"; 

const PopularProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { loading: cartLoading, error: cartError } = useSelector((state) => state.cart);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = async (product) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || !user.id) {
      toast.error('Please log in to add items to your cart.');
      return;
    }

    try {
      await dispatch(addToCart({ userId: user.id, product: { ...product, quantity: 1 } })).unwrap();
      toast.success(`${product.title} added to cart successfully!`);
    } catch (error) {
      toast.error(`Failed to add ${product.title} to cart: ${error}`);
    }
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    } else {
      setCurrentIndex(products.length - itemsPerPage);
    }
  };

  // Modify handleViewDetailsClick to accept the product and navigate with the product ID
  const handleViewDetailsClick = (productId) => {
    navigate(`/products/${productId}`); // Navigate to the product details page
  };

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push('fa-star');
    for (let i = 0; i < halfStar; i++) stars.push('fa-star-half-alt');
    for (let i = 0; i < emptyStars; i++) stars.push('fa-star-o');

    return stars.map((star, index) => (
      <i key={index} className={`fa ${star}`} style={{ color: '#FF63A1', margin: '0 2px' }} />
    ));
  };

  const renderProducts = () => {
    // Filter products with stock > 0
    const availableProducts = products.filter(product => product.stock > 0);

    // Get the currently displayed products based on the current index
    const displayedProducts = availableProducts.slice(currentIndex, currentIndex + itemsPerPage);
    return displayedProducts.map((product) => (
      <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
        <div className="card h-100">
          <img
            src={product.thumbnail}
            className="card-img-top"
            alt={product.title}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title" style={{ color: '#6B94D3' }}>{product.title}</h5>
            <div className="d-flex justify-content-between">
              <p className="card-text" style={{ color: '#F79420' }}>
                <strong>Price: ${product.price.toFixed(2)}</strong>
              </p>
              <div className="card-text">
                <strong>Rating: </strong>
                <span>{renderRating(product.rating)}</span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex" style={{ gap: '10px' }}>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => handleAddToCart(product)}
                  disabled={cartLoading}>
                  {cartLoading ? 'Adding...' : 'Add to Cart'}
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  style={{ transition: 'background-color 0.3s' }}
                  onClick={() => handleViewDetailsClick(product.id)} // Pass product.id
                  onMouseOver={(e) => e.target.style.backgroundColor = '#FF63A1'}
                  onMouseOut={(e) => e.target.style.backgroundColor = ''}>
                  View
                </button>
              </div>
            </div>
            {cartError && <p style={{ color: 'red' }}>{cartError}</p>}
          </div>
        </div>
      </div>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" style={{ color: '#6B94D3' }}>Popular Products</h2>
          <p style={{ fontStyle: 'italic', color: '#555' }}>
            Explore our collection of best-selling products, handpicked for you. 
            Each item is crafted with care and designed to meet your needs.
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          onClick={handlePrev}
          className="btn btn-primary"
          style={{ backgroundColor: '#F79420', borderColor: '#F79420', marginRight: '20px' }}>
          <i className="fa fa-chevron-left"></i>
        </button>

        <div className="row justify-content-center">
          {renderProducts()}
        </div>

        <button
          onClick={handleNext}
          className="btn btn-primary"
          style={{ backgroundColor: '#F79420', borderColor: '#F79420', marginLeft: '20px' }}>
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default PopularProducts;
