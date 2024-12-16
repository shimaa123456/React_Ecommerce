import { useState, useEffect } from "react";
import { faBox, faShoppingCart, faTruck, faShoppingBasket, faBars, faTimes, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Admin/Components/AdminRedux/ProductsSlice";

const UserNavbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState("null");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const { products } = useSelector((state) => state.products);

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Update the active item based on the URL path
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

  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsSidebarVisible(false); // Close the sidebar after clicking an item
  };

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchSubmitted(true);
  };

  const handleClearSearchResults = () => {
    setSearchQuery("");
    setSearchSubmitted(false);
  };

  // Filter products based on search query
  const filteredProducts = searchSubmitted
    ? searchQuery === ""  // Check if search query is empty
      ? []
      : products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];

  return (
    <nav className="navbar navbar-light bg-white px-4 border-bottom" style={{ borderBottom: "2px solid #4B7BAF" }}>
      <div className="d-flex justify-content-between w-100 align-items-center">
        {/* Hamburger Icon */}
        <button
          className="navbar-toggler d-lg-none position-absolute"
          type="button"
          onClick={toggleSidebar}
          aria-controls="sidebar"
          aria-expanded={isSidebarVisible}
          aria-label="Toggle navigation"
          style={{ left: "10px" }}
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
                onClick={() => handleItemClick(item.key)}
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

        {/* Search Form */}
        <form className="d-flex ms-auto d-block" onSubmit={handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search products"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
      </div>

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
                  onClick={() => handleItemClick(item.key)}
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

      {/* Search Results Sidebar */}
      {searchSubmitted && (
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
          <button
            className="btn btn-sm btn-danger mb-3"
            onClick={handleClearSearchResults}
            style={{ position: "absolute", top: "20px", right: "20px" }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <h5 className="search-results-heading">Search Results</h5>

          {searchQuery === "" ? (
            <p className="no-results-text">No query entered</p>
          ) : filteredProducts.length > 0 ? (
            <ul className="list-group">
              {filteredProducts.map((product) => (
                <li className="list-group-item" key={product.id}>
                  <div className="d-flex align-items-center">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                      className="me-2"
                    />
                    <div>
                      <strong style={{ color: "#86A7DA" }}>{product.title}</strong>
                      <p className="mb-0 text-muted">{product.category}</p>
                    </div>
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#F79420",
                        color: "white",
                        fontSize: "12px",
                        borderRadius: "50px",
                        marginLeft: "auto",
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} className="me-1" />
                      View
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results-text">No products found</p>
          )}
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
