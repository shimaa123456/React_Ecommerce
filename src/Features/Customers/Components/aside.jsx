import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../Admin/Components/AdminRedux/ProductsSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Sidebar = ({ setSelectedCategory }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  // Extract unique categories from products
  const categories = ["all", ...new Set(products.map((product) => product.category))];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="col-md-12">
        <button
          className="btn  d-md-none w-100"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          aria-controls="offcanvas"
          style={{ backgroundColor: "#6B94D3", color: "white" }}
        >
          Category
        </button>
      </div>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvas"
        aria-labelledby="offcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLabel">
            Categories
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex flex-column gap-2 text-muted">
            {categories.map((category, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  value={category}
                  id={category}
                  onChange={handleCategoryChange}
                  defaultChecked={category === "all"}
                />
                <label className="form-check-label" htmlFor={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-none d-md-block">
        <div className="border p-3 mt-4 bg-white shadow-sm">
          <p className="mb-3 fw-bold text-dark">Categories</p>
          <div className="d-flex flex-column gap-2 text-muted">
            {categories.map((category, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  value={category}
                  id={category}
                  onChange={handleCategoryChange}
                  defaultChecked={category === "all"}
                />
                <label className="form-check-label" htmlFor={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Sidebar;
