import { Link } from 'react-router-dom'; // For linking to the products page

const SpecialOffers = () => {
  return (
    <div className="container-fluid p-4">
      <div className="text-center mb-4">
        <h2 className="section-title" style={{ color: '#6B94D3', fontWeight: 'bold' }}>Special Offers</h2>
        <p style={{ fontStyle: 'italic', color: '#555', fontSize: '1.1rem' }}>
          Don&#39;t miss out on our amazing offers. Limited time only!
        </p>
      </div>

      <div className="row align-items-center rounded p-3">
        {/* Left Section: Image */}
        <div className="col-md-6 mb-4 mb-md-0">
          <img 
            src="/offer.webp" 
            className="img-fluid rounded" 
            alt="Special Offer" 
            style={{ objectFit: 'cover', width: '100%', maxHeight: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          />
        </div>

        {/* Right Section: Text and Button */}
        <div className="col-md-6 d-flex flex-column">
          {/* Top Content */}
          <div style={{ padding: '20px', textAlign: 'left' }}>
            {/* Images in a row with spacing */}
            <div 
              className="d-flex flex-wrap gap-1 mb-3" 
              style={{ justifyContent: 'space-between' }}
            >
              {[ 3, 4, 5].map((num) => (
                <img 
                  key={num} 
                  src={`/offer${num}.png`} 
                  alt={`Small Offer Image ${num}`} 
                  className="img-fluid" 
                  style={{ 
                    borderRadius: '10px', 
                    maxHeight: '120px', 
                    objectFit: 'cover', 
                    width: 'calc(25% - 5px)', 
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
              ))}
            </div>
            <h5 className="card-title" style={{ color: '#FF63A1', fontWeight: 'bold', fontSize: '1.5rem' }}>Special Offers</h5>
            <p 
              className="card-text" 
              style={{ color: '#555', lineHeight: '1.6', maxWidth: '400px' }}
            >
              Save up to <strong>50%</strong> on selected items! This is your chance to grab the best deals before they&#39;re gone.
            </p>
          </div>

          {/* Button */}
          <div style={{ padding: '20px', textAlign: 'left' }}>
            <Link 
              to="/products" 
              className="btn" 
              style={{
                backgroundColor: '#FF63A1', 
                color: '#fff', 
                fontSize: '1.2rem', 
                padding: '12px 25px', 
                borderRadius: '5px', 
                textDecoration: 'none',
                transition: 'background-color 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#6B94D3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#FF63A1'}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
