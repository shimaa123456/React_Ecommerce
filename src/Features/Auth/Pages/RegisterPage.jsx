import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Components/AuthRedux/RegisterSlice';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [role] = useState('user');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Name validation
    if (name.length < 4) {
      toast.error('Name must be at least 4 characters long.');
      return;
    }

    // Password validation regex
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error('Password must be at least 8 characters long and include letters, numbers, and special characters.');
      return;
    }

    // Phone validation (Egyptian phone number)
    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      toast.error('Phone number must be an Egyptian phone number starting with 010, 011, 012, or 015.');
      return;
    }

    // Image URL validation (only .png, .jpg, .jpeg, .svg)
    const validImageUrlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg))$/i;
    if (image && !validImageUrlRegex.test(image)) {
      toast.error('Please enter a valid image URL (PNG, JPG, JPEG, or SVG).');
      return;
    }

    try {
      // Dispatch registerUser action
      await dispatch(registerUser({ name, email, password, phone, image, role })).unwrap();
      
      // Navigate to homepage after successful registration
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Registration failed.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f5f5f5, #f0f0f0, #ffffff)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px', backgroundColor: 'white' }}>
        <div className="card-body">
          {/* Logo and Website Name */}
          <div className="d-flex align-items-center mb-2">
            <img src="/logo.png" alt="Shoppy Logo" style={{ width: '80px', marginRight: '-20px' }} />
            <h2 className="mb-0" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '1.5rem', color: '#4B7BAF' }}>Shoppy</h2>
          </div>

          {/* Register Form */}
          <h4 className="text-center mb-5">Create an Account</h4>
          <form onSubmit={handleSubmit} className='m-4'>
            {/* Form fields */}
            <div className="mb-3 d-flex justify-content-between">
              <label htmlFor="name" className="form-label" style={{ width: '30%' }}>Full Name</label>
              <input type="text" id="name" className="form-control" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '65%' }} />
            </div>

            <div className="mb-3 d-flex justify-content-between">
              <label htmlFor="email" className="form-label" style={{ width: '30%' }}>Email address</label>
              <input type="email" id="email" className="form-control" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '65%' }} />
            </div>

            <div className="mb-3 d-flex justify-content-between">
              <label htmlFor="password" className="form-label" style={{ width: '30%' }}>Password</label>
              <input type="password" id="password" className="form-control" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '65%' }} />
            </div>

            <div className="mb-3 d-flex justify-content-between">
              <label htmlFor="phone" className="form-label" style={{ width: '30%' }}>Phone Number</label>
              <input type="tel" id="phone" className="form-control" placeholder="+201234567890" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '65%' }} />
            </div>

            {/* Image URL input section */}
            <div className="mb-3 d-flex justify-content-between">
              <label htmlFor="image" className="form-label" style={{ width: '30%' }}>Profile Image</label>
              <div style={{ width: '65%' }}>
                <input
                  type="text"
                  id="imageURL"
                  className="form-control"
                  placeholder="Enter Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-footer">
              <button type="submit" className="btn" style={{ backgroundColor: '#F67D1E', color: '#fff', width: '100%' }}>Register</button>
            </div>
          </form>

          <div className="text-center">
            <span>Already have an account? <a href="/" style={{
                  textDecoration: 'none',
                  color: '#F67D1E',
                }}>Login here</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
