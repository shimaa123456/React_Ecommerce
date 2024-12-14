import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductById } from '../AdminRedux/ProductsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // Handle loading, error, or success state
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#6B94D3' }}>{product.title}</h1>
        <button
          className="btn btn-info"
          onClick={() => navigate('/dashboard/products')}
        >
          Back
        </button>
      </div>
      <div className="row">
        {/* Product Image Column */}
        <div className="col-lg-4 col-12 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <img
                src={product.images[0] || '/placeholder.png'} // Use the first image as the main image
                alt={product.title}
                className="img-fluid rounded mb-3"
                width="200"
                height="200"
              />
              <h3>{product.title}</h3>
            </div>
          </div>
        </div>

        {/* Product Details Column */}
        <div className="col-lg-8 col-12 mb-3">
          <div className="card">
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
                    <td>Discount Percentage</td>
                    <td>{product.discountPercentage}%</td>
                  </tr>
                  <tr>
                    <td>Stock</td>
                    <td>{product.stock}</td>
                  </tr>
                  <tr>
                    <td>Tags</td>
                    <td>{product.tags.join(', ')}</td>
                  </tr>
                  <tr>
                    <td>Rating</td>
                    <td>{product.rating}</td>
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
                    <td>Weight</td>
                    <td>{product.weight} kg</td>
                  </tr>
                  <tr>
                    <td>Dimensions</td>
                    <td>
                      Width: {product.dimensions.width} cm, Height: {product.dimensions.height} cm, Depth: {product.dimensions.depth} cm
                    </td>
                  </tr>
                  <tr>
                    <td>Warranty Information</td>
                    <td>{product.warrantyInformation}</td>
                  </tr>
                  <tr>
                    <td>Shipping Information</td>
                    <td>{product.shippingInformation}</td>
                  </tr>
                  <tr>
                    <td>Availability Status</td>
                    <td>{product.availabilityStatus}</td>
                  </tr>
                  <tr>
                    <td>Return Policy</td>
                    <td>{product.returnPolicy}</td>
                  </tr>
                  <tr>
                    <td>Minimum Order Quantity</td>
                    <td>{product.minimumOrderQuantity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
