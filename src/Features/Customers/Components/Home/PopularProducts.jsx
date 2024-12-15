import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../Admin/Components/AdminRedux/ProductsSlice';

const PopularProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
    const displayedProducts = products.slice(currentIndex, currentIndex + itemsPerPage);
    return displayedProducts.map((product) => (
      <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
        <div className="card h-100">
          <img
            src={product.thumbnail}
            className="card-img-top"
            alt={product.title}
            style={{ height: '200px', objectFit: 'cover' }} // Reduced image size
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
                <button className="btn btn-dark btn-sm">Add to Cart</button>
                <button 
                  className="btn btn-outline-secondary btn-sm" 
                  style={{ transition: 'background-color 0.3s' }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#FF63A1'}
                  onMouseOut={(e) => e.target.style.backgroundColor = ''}>
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" style={{ color: '#6B94D3' }}>Popular Products</h2>
          <p style={{ fontStyle: 'italic', color: '#555' }}>
            Explore our collection of best-selling products, handpicked for you. 
            Each item is crafted with care and designed to meet your needs.
          </p>
        </div>
      </div>

      {/* Pagination and Product Grid */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Previous Button */}
        <button 
          onClick={handlePrev} 
          className="btn btn-primary" 
          style={{ backgroundColor: '#F79420', borderColor: '#F79420', marginRight: '20px' }}>
          <i className="fa fa-chevron-left"></i>
        </button>

        {/* Product Grid */}
        <div className="row justify-content-center">
          {renderProducts()}
        </div>

        {/* Next Button */}
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
