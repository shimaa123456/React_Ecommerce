import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Admin/Components/AdminRedux/CartSlice";
import { toast } from "react-toastify";
import "../../../styles/productCard.css";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  
  // Get loading and error states from the cart slice
  const { loading: cartLoading, error: cartError } = useSelector((state) => state.cart);

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);
    }
  }, [cartError]);

  const handleAddToCartClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user || !user.id) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user.id,
          product: { ...item, quantity: 1 },
        })
      ).unwrap();
      toast.success(`${item.title} added to cart successfully!`);
    } catch (error) {
      toast.error(`Failed to add ${item.title} to cart: ${error.message}`);
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      // Fallback or check if HTTPS is in use
      if (window.location.protocol === "https:") {
        navigator
          .share({
            title: item.title,
            text: `Check out this product: ${item.title}`,
            url: window.location.href,
          })
          .then(() => {
            console.log("Shared successfully!");
          })
          .catch((error) => {
            console.error("Error sharing:", error);
            toast.error("Error sharing this product.");
          });
      } else {
        toast.error("Sharing is only available over HTTPS.");
      }
    } else {
      toast.error("Sharing is not supported in this browser.");
    }
  };

  // If stock is 0, don't render the product card (avoid taking space)
  if (item.stock === 0) {
    return null; // The entire product card will not be rendered if stock is 0
  }

  return (
    <>
      <div className="col-md-3 col-sm-6 col-12 mb-4 ms-6 me-4 b">
        <div className="cards border-0">
          <div
            className="d-flex align-items-center justify-content-center image-container"
            style={{ height: "300px", width: "250px" }}
          >
            <img
              src={item.thumbnail}
              className="card-img-top"
              alt={item.title}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            <div className="icons d-flex align-items-center justify-content-center">
              <span
                className="fas fa-shopping-cart icon"
                title="Add to Cart"
                onClick={handleAddToCartClick}
                style={{ cursor: "pointer" }}
              >
                {cartLoading ? "..." : ""}
              </span>
              <span
                className="fas fa-eye icon"
                title="View Details"
                style={{ cursor: "pointer" }}
              ></span>
              <span
                className="fas fa-share icon"
                title="Share"
                onClick={handleShareClick}
                style={{ cursor: "pointer" }}
              ></span>
            </div>
          </div>
          <div className="body">
            <h5 className="card-title text-center">{item.title}</h5>
            <p className="card-text text-center">${item.price}</p>

            <div className="rating text-center">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`fa fa-star ${index < item.rating ? "checked" : ""}`}
                  style={{
                    color: index < item.rating ? "#FFD700" : "#ccc",
                    fontSize: "18px",
                    margin: "0 2px",
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Add PropTypes validation
ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired, 
  }).isRequired,
};

export default ProductCard;
