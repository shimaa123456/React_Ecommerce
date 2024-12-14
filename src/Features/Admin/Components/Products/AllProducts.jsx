import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../AdminRedux/ProductsSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/dashboard/products/add-product');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          toast.success('Product deleted successfully!');
        })
        .catch((error) => {
          toast.error(`Failed to delete product: ${error}`);
        });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#6B94D3' }}>Products</h1>
        <button
          style={{
            backgroundColor: '#F79420',
            borderColor: '#F79420',
          }}
          className="btn text-white"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {/* Make the table responsive on small screens */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead style={{ backgroundColor: '#6B94D3', color: 'white' }}>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Rating</th>
              <th scope="col">Availability</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : product.thumbnail}
                    alt={product.title}
                    className="img-fluid"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.rating} ★</td>
                <td>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</td>
                <td>
                  <div className="d-flex" style={{ flexWrap: 'nowrap' }}>
                    <button
                      className="btn btn-sm me-2"
                      style={{
                        backgroundColor: '#6B94D3',
                        color: 'white',
                        border: 'none',
                      }}
                      onClick={() => navigate(`/dashboard/products/view-product/${product.id}`)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="btn btn-sm me-2"
                      style={{
                        backgroundColor: '#F79420',
                        color: 'white',
                        border: 'none',
                      }}
                      onClick={() => navigate(`/dashboard/products/edit-product/${product.id}`)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{
                        backgroundColor: '#FF63A1',
                        color: 'white',
                        border: 'none',
                      }}
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            {/* Previous Button */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                style={{
                  backgroundColor: currentPage === 1 ? '#f0f0f0' : '',
                  borderColor: '#F79420',
                  color: currentPage === 1 ? '#999' : '',
                }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
            </li>

            {/* Dynamic Page Numbers */}
            {Array.from({ length: Math.min(totalPages, 4) }, (_, idx) => {
              const page = idx + 1 + (Math.ceil(currentPage / 4) - 1) * 4; // Offset for the current group
              if (page > totalPages) return null; // Avoid rendering pages beyond the totalPages
              return (
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    style={{
                      backgroundColor: page === currentPage ? '#F79420' : '',
                      borderColor: '#F79420',
                      color: page === currentPage ? 'white' : '',
                    }}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              );
            })}

            {/* Next Button */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                style={{
                  backgroundColor: currentPage === totalPages ? '#f0f0f0' : '',
                  borderColor: '#F79420',
                  color: currentPage === totalPages ? '#999' : '',
                }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AllProducts;
