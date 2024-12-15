import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div
      className="site-blocks-cover overlay"
      style={{
        position: 'relative', 
        backgroundImage: 'url(/home.jpg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '80vh', 
      }}
    >
      {/* Overlay to darken the image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)', 
          zIndex: 1, 
        }}
      ></div>

      {/* Content Section */}
      <div className="container" style={{ position: 'relative', zIndex: 2 , paddingTop: '20vh',}}>
        <div className="row align-items-center" style={{ height: '100%' }}>
          <div className="col-md-6 text-left">
            <h1 style={{ color: '#ffffff', fontSize: '3rem', fontWeight: 'bold' }}>
              Shop With Us
            </h1>
            <p style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '2rem' }}>
              Discover amazing products at unbeatable prices.
            </p>
            <Link
              to="/products"
              className="btn btn-primary py-3 px-5 rounded-0"
              style={{
                backgroundColor: '#4B7BAF', 
                border: 'none',
                color: '#fff',
                fontSize: '1.25rem',
              }}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
