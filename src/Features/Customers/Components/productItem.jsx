import { useNavigate } from "react-router-dom";
import "../../../styles/productCard.css";

const ProductCard = ({ item }) => {
  const navigate = useNavigate(); 

  const handleAddToCartClick = () => {
    navigate("/cart"); 
  };

  const handleShareClick = () => {
    if (navigator.share) {
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
        });
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
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
            ></span>
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
  );
};

export default ProductCard;
