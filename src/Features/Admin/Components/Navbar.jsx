import { useState } from "react";
import { faBox, faShoppingCart, faTruck, faFileAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // New state for sidebar visibility

  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsSidebarVisible(false); // Close the sidebar after clicking an item
  };

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility

  return (
    <nav className="navbar navbar-light bg-white px-4 border-bottom" style={{ borderBottom: "2px solid #4B7BAF" }}>
      {/* Navbar Items */}
      <div className="d-flex justify-content-between w-100 align-items-center">
        {/* Hamburger Icon (for smaller screens) */}
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
            { key: "dashboard", label: "Dashboard", icon: faBox },
            { key: "products", label: "Products", icon: faShoppingCart },
            { key: "orders", label: "Orders", icon: faTruck },
            { key: "quotations", label: "Quotations", icon: faFileAlt },
          ].map((item) => (
            <li className="nav-item me-4" key={item.key}>
              <a
                className={`nav-link d-flex align-items-center ${activeItem === item.key ? "active-nav-item" : ""}`}
                href="#"
                onClick={() => handleItemClick(item.key)}
                style={{
                  color: "#4B7BAF",
                  paddingBottom: "10px",
                  position: "relative",
                  fontSize: "1rem",
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
              </a>
            </li>
          ))}
        </ul>

        {/* Search Form */}
        <form className="d-flex ms-auto d-block">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
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
              { key: "dashboard", label: "Dashboard", icon: faBox },
              { key: "products", label: "Products", icon: faShoppingCart },
              { key: "orders", label: "Orders", icon: faTruck },
              { key: "quotations", label: "Quotations", icon: faFileAlt },
            ].map((item) => (
              <li className="nav-item mb-3" key={item.key}>
                <a
                  className={`nav-link d-flex align-items-center ${activeItem === item.key ? "active-nav-item" : ""}`}
                  href="#"
                  onClick={() => handleItemClick(item.key)}
                  style={{
                    color: "#4B7BAF",
                    paddingBottom: "10px",
                    fontSize: "1rem",
                    position: "relative",
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} className="me-2" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Inline Styles */}
      <style>
        {`
          .nav-item .nav-link {
            transition: all 0.3s ease;
          }
          .nav-item .nav-link:hover {
            color: #2a507a;
          }
          .nav-item .nav-link.active-nav-item {
            font-weight: bold;
            color: #4B7BAF;
          }

          @media (max-width: 991.98px) {
            /* Sidebar Items */
            .sidebar {
              display: block;
              position: absolute;
              top: 60px;
              left: 0;
              background-color: #fff;
              width: 100%;
              z-index: 1000;
            }
            .sidebar ul {
              padding-left: 0;
              margin: 0;
            }
          }
         @media (min-width: 991.98px) {
          .sidebar {
          display: none;
        }
          @media (max-width: 415px) {
            .navbar .d-flex.ms-auto {
            d: none;
          }
        }
        }

        `}
      </style>
    </nav>
  );
};

export default Navbar;
