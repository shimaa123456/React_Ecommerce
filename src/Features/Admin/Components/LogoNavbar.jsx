import { useSelector } from 'react-redux';

const LogoNavbar = () => {
  const { user } = useSelector((state) => state.login); 
  const storedUser = JSON.parse(sessionStorage.getItem('user'));
  const currentUser = user || storedUser;  

  const defaultImageUrl = "https://randomuser.me/api/portraits/men/0.jpg"; 
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3 py-2">
      <div className="d-flex align-items-center mb-1">
        <img
          src="/logo2.png"
          alt="Shoppy Logo"
          style={{ width: '25px', marginRight: '0px' }} 
        />
        <h2
          className="mb-0"
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: '1.3rem',
            color: '#4B7BAF',
          }}
        >
          Shoppy
        </h2>
      </div>
      <div className="ms-auto d-flex align-items-center">
        {currentUser ? (
          <>
            <span className="me-3" style={{ fontSize: '0.9rem' }}>
              {currentUser.name} {/* Display the user's name */}
            </span>
            <img
              src={currentUser.image || defaultImageUrl} 
              alt="User Avatar"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
          </>
        ) : (
            <>
          <span className="me-3" style={{ fontSize: '1rem' }}>Guest</span>
          <img
              
              src="https://randomuser.me/api/portraits/men/0.jpg"
              alt="User Avatar"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
            </>
        )}
      </div>
    </nav>
  );
};

export default LogoNavbar;
