import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, editProduct } from "../AdminRedux/ProductsSlice";
import { useNavigate } from "react-router-dom";

const DiscountsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query.trim()) {
      const results = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };

  // Add product to the selection list
  const handleSelectProduct = (product) => {
    const isSelected = selectedProducts.some(
      (selected) => selected.id === product.id
    );

    if (!isSelected) {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, discountPercentage: product.discountPercentage || 0 },
      ]);
    }

    setSearch("");
    setFilteredProducts([]);
  };

  // Remove selected product from the list
  const handleRemoveProduct = (id) => {
    setSelectedProducts(selectedProducts.filter((product) => product.id !== id));
  };

  // Handle discount change for selected products
  const handleDiscountChange = (id, discount) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) =>
        product.id === id
          ? { ...product, discountPercentage: Number(discount) }
          : product
      )
    );
  };

  // Save discounts
  const handleSaveDiscounts = () => {
    selectedProducts.forEach((product) => {
      dispatch(editProduct({ id: product.id, ...product }));
    });

    alert("Discounts saved successfully!");
    navigate("/dashboard/quotations");
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate("/dashboard/quotations");
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0" style={{ color: "#6B94D3" }}>Manage Discounts</h1>
        <button className="btn btn-info" onClick={handleBackClick}>
          Back to Quotations
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-3 position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Search products by name or category..."
          value={search}
          onChange={handleSearchChange}
        />
        {filteredProducts.length > 0 && (
          <ul className="list-group position-absolute w-100 shadow">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelectProduct(product)}
                style={{ cursor: "pointer" }}
              >
                {product.title} - <small>{product.category}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Products */}
      {selectedProducts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Discount (%)</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.images && product.images[0] ? product.images[0] : "placeholder.jpg"}
                      alt={product.title}
                      width="50"
                      height="50"
                      className="img-fluid"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={product.discountPercentage}
                      onChange={(e) =>
                        handleDiscountChange(product.id, e.target.value)
                      }
                      min="0"
                      max="100"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Save Button */}
      {selectedProducts.length > 0 && (
        <button style={{
            backgroundColor: '#F79420',
            borderColor: '#F79420',
          }}
          className="btn text-white"
          onClick={handleSaveDiscounts}>
          Save Discounts
        </button>
      )}

      {/* Loading and Error */}
      {loading && <p className="text-info">Loading products...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
    </div>
  );
};

export default DiscountsPage;
