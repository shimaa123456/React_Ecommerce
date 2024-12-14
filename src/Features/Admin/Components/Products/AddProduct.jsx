import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../AdminRedux/ProductsSlice'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    discountPercentage: '',
    stock: '',
    tags: '',
    thumbnail: '', // Main image URL
    images: '', // Comma-separated list of additional images
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, category, price, discountPercentage, stock, thumbnail, images } = formData;

    // Basic validation
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
    if (images) {
      const imageUrls = images.split(',').map((url) => url.trim());
      const invalidImages = imageUrls.filter((url) => !/^https?:\/\/.*\.(jpg|jpeg|png|svg)$/i.test(url));
      if (invalidImages.length > 0) {
        toast.error('One or more additional images are not valid URLs.');
        return;
      }
    }

    // Generate tags based on the title
    const generatedTags = title.toLowerCase().split(' ').filter((word) => word.length > 2);

    // Default data
    const defaultData = {
      weight: 0,
      dimensions: { width: 0, height: 0, depth: 0 },
      warrantyInformation: 'No warranty available.',
      shippingInformation: 'Ships within 1 week.',
      availabilityStatus: stock > 0 ? 'In Stock' : 'Out of Stock',
      reviews: [],
      returnPolicy: 'No return policy available.',
      rating: 0, // Default rating
      minimumOrderQuantity: 1,
      meta: {},
    };

    // If no additional images are entered, use the thumbnail as the first image
    const productImages = images ? images.split(',').map((url) => url.trim()) : [thumbnail];

    const productData = {
      ...formData,
      price: parseFloat(price),
      discountPercentage: parseFloat(discountPercentage) || 0,
      stock: parseInt(stock, 10),
      tags: generatedTags,
      thumbnail,
      images: productImages,
      ...defaultData, // Add the default data
    };

    // Dispatching the action to add product
    dispatch(addProduct(productData))
      .unwrap()
      .then(() => {
        toast.success('Product added successfully!');
        navigate('/dashboard/products');
      })
      .catch((error) => {
        console.error('Failed to add product:', error);
        toast.error('Failed to add product.');
      });
  };

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <h2 className="page-title" style={{ color: '#6B94D3' }}>Add Product</h2>
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

export default AddProduct;
