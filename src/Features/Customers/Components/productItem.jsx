import '../../../styles/productCard.css';

const ProductCard = ({ item }) => (
  <div className="col-md-3 col-sm-6 col-12 mb-4">
    <div className="cards border-0">
      <div
        className="d-flex align-items-center justify-content-center image-container"
        style={{ height: '300px', width: '250px' }}
      >
        <img
          src={item.thumbnail}
          className="card-img-top"
          alt={item.title}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
       <div className="icons d-flex align-items-center justify-content-center">
      
  
  <span className="fas fa-heart icon"title="Add to Favorites"></span>
  <span className="fas fa-shopping-cart icon"title="Add to Cart"></span>
  <span
  className="fas fa-eye icon"title=" View Details">
</span>

</div>

      </div>
      <div className="body">
  <h5 className="card-title text-center">{item.title}</h5>
  <p className="card-text text-center">${item.price}</p>
</div>

    </div>
  </div>
);

export default ProductCard;
