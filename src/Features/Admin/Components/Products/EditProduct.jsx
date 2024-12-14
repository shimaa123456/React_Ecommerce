import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, fetchProducts } from '../AdminRedux/ProductsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    discountPercentage: '',
    stock: '',
    tags: '',
    thumbnail: '',
    images: '', // Comma-separated list of additional images
    // Add more fields to hold other product data
    rating: '',
    brand: '',
    sku: '',
    weight: '',
    dimensions: '',
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    returnPolicy: '',
    minimumOrderQuantity: '',
    meta: '',
  });

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts()); // Fetch products if not already fetched
    } else {
      const product = products.find((product) => product.id === id); // Match product by ID
      if (product) {
        setFormData({
          title: product.title,
          description: product.description,
          category: product.category,
          price: product.price,
          discountPercentage: product.discountPercentage,
          stock: product.stock,
          tags: product.tags.join(' '), // Assuming tags are an array
          thumbnail: product.thumbnail,
          images: product.images.join(', '), // Assuming images is an array
          // Set all other fields
          rating: product.rating,
          brand: product.brand,
          sku: product.sku,
          weight: product.weight,
          dimensions: JSON.stringify(product.dimensions), // Assuming dimensions is an object
          warrantyInformation: product.warrantyInformation,
          shippingInformation: product.shippingInformation,
          availabilityStatus: product.availabilityStatus,
          returnPolicy: product.returnPolicy,
          minimumOrderQuantity: product.minimumOrderQuantity,
          meta: JSON.stringify(product.meta), // Assuming meta is an object
        });
      }
    }
  }, [dispatch, id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, category, price, discountPercentage, stock, thumbnail, images, rating, brand, sku, weight, dimensions, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, meta } = formData;

    // Validation
    if (!title || title.length < 3) {
      toast.error('Title must be at least 3 characters long.');
      return;
    }
    if (!category) {
      toast.error('Category is required.');
      return;
    }
    if (!price || isNaN(price)) {
      toast.error('Price must be a valid number.');
      return;
    }
    if (!stock || isNaN(stock)) {
      toast.error('Stock must be a valid number.');
      return;
    }
    if (!thumbnail || !/^https?:\/\/.*\.(jpg|jpeg|png|svg)$/i.test(thumbnail)) {
      toast.error('Thumbnail must be a valid image URL (JPG, JPEG, PNG, SVG).');
      return;
    }

    // Split the additional images and validate them
    if (images) {
      const imageUrls = images.split(',').map((url) => url.trim());
      const invalidImages = imageUrls.filter((url) => !/^https?:\/\/.*\.(jpg|jpeg|png|svg)$/i.test(url));
      if (invalidImages.length > 0) {
        toast.error('One or more additional images are not valid URLs.');
        return;
      }
    }

    // Convert tags into an array (if necessary)
    const tags = title.toLowerCase().split(' ').filter((word) => word.length > 2);

    const productData = {
      ...formData, // Keep all the form data
      price: parseFloat(price),
      discountPercentage: parseFloat(discountPercentage) || 0,
      stock: parseInt(stock, 10),
      tags,
      images: images ? images.split(',').map((url) => url.trim()) : [thumbnail], // Ensure that images array is set
      rating: rating || null,
      brand: brand || null,
      sku: sku || null,
      weight: weight || null,
      dimensions: dimensions ? JSON.parse(dimensions) : null,
      warrantyInformation: warrantyInformation || null,
      shippingInformation: shippingInformation || null,
      availabilityStatus: availabilityStatus || null,
      returnPolicy: returnPolicy || null,
      minimumOrderQuantity: minimumOrderQuantity || null,
      meta: meta ? JSON.parse(meta) : null,
    };

    // Dispatch the edit product action with all fields
    dispatch(editProduct({ id, ...productData }))
      .unwrap()
      .then(() => {
        toast.success('Product updated successfully!');
        navigate('/dashboard/products');
      })
      .catch((error) => {
        console.error('Failed to update product:', error);
        toast.error('Failed to update product.');
      });
  };

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <h2 className="page-title" style={{ color: '#6B94D3' }}>Edit Product</h2>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Product Details */}
              <div className="col-md-8 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Product Details</h3>

                    {/* Title */}
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">Category</label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        id="price"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Discount Percentage */}
                    <div className="mb-3">
                      <label htmlFor="discountPercentage" className="form-label">Discount Percentage</label>
                      <input
                        type="number"
                        step="0.01"
                        id="discountPercentage"
                        name="discountPercentage"
                        className="form-control"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Stock */}
                    <div className="mb-3">
                      <label htmlFor="stock" className="form-label">Stock</label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        className="form-control"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Product Images</h3>

                    {/* Thumbnail */}
                    <div className="mb-3">
                      <label htmlFor="thumbnail" className="form-label">Thumbnail URL</label>
                      <input
                        type="text"
                        id="thumbnail"
                        name="thumbnail"
                        className="form-control"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Show Image Preview if Thumbnail is valid */}
                    {formData.thumbnail && /^https?:\/\/.*\.(jpg|jpeg|png|svg)$/i.test(formData.thumbnail) && (
                      <div className="mb-3">
                        <img 
                          src={formData.thumbnail} 
                          alt="Thumbnail Preview" 
                          style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                        />
                      </div>
                    )}

                    {/* Additional Images */}
                    <div className="mb-3">
                      <label htmlFor="images" className="form-label">Additional Images (comma-separated URLs)</label>
                      <textarea
                        id="images"
                        name="images"
                        className="form-control"
                        rows="3"
                        value={formData.images}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-end">
              <button type="submit" className="btn" style={{ backgroundColor: '#F79420', color: '#fff' }}>Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard/products')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
