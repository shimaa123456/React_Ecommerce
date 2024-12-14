import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LogoNavbar = () => {
  const { user } = useSelector((state) => state.login);
  const storedUser = JSON.parse(sessionStorage.getItem('user'));
  const currentUser = user || storedUser;
  const defaultImageUrl = "https://randomuser.me/api/portraits/men/0.jpg";

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/'); 
  };

  const handleProfileClick = () => {
    if (currentUser && currentUser.id) {
      navigate(`/profile/${currentUser.id}`); 
    }
  };

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
      <div className="ms-auto d-flex align-items-center position-relative">
        {currentUser ? (
          <>
            <span className="me-3" style={{ fontSize: '0.9rem' }}>
              {currentUser.name}
            </span>
            <img
              src={currentUser.image || defaultImageUrl}
              alt="User Avatar"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <div
                className="dropdown-menu position-absolute mt-2"
                style={{
                  display: 'block',
                  zIndex: 1000,
                  right: 0,
                  top: '100%',
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              >
                <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                  <strong>Menu</strong>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setShowDropdown(false)}
                  >
                    X
                  </button>
                </div>
                <div>
                  <span className="dropdown-item disabled">
                    Role: {currentUser.role || 'Guest'}
                  </span>
                  <button
                    className="dropdown-item"
                    onClick={handleProfileClick}
                  >
                    Profile
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <span className="me-3" style={{ fontSize: '1rem' }}>Guest</span>
            <img
              src={defaultImageUrl}
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
