import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from '../Components/AuthRedux/LoginSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading } = useSelector((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((user) => {
        if (user.role === 'admin') {
          navigate('/dashboard');
        } else if (user.role === 'user') {
          navigate('/home');
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f5f5f5, #f0f0f0, #ffffff)',
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '500px',
          borderRadius: '15px',
          backgroundColor: 'white',
        }}
      >
        <div className="card-body">
          <div className="d-flex align-items-center mb-2">
            <img
              src="/logo.png"
              alt="Shoppy Logo"
              style={{ width: '80px', marginRight: '-20px' }}
            />
            <h2
              className="mb-0"
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: '1.5rem',
                color: '#4B7BAF',
              }}
            >
              Shoppy
            </h2>
          </div>
          <h4 className="text-center mb-4">Login to your account</h4>
          <form onSubmit={handleSubmit} className="m-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ paddingLeft: '10px', paddingRight: '10px' }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '10px', paddingRight: '10px' }}
                />
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <label className="form-check-label" htmlFor="remember">
                Remember me on this device
              </label>
            </div>

            <div className="form-footer">
              <button
                type="submit"
                className="btn"
                disabled={isLoading}
                style={{
                  backgroundColor: '#F67D1E',
                  color: '#fff',
                  width: '100%',
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          <div
            className="d-flex justify-content-between text-secondary mt-3 m-4"
            style={{ fontSize: '0.9rem' }}
          >
            <span>
              Don&rsquo;t have an account yet?{' '}
              <a
                href="/register"
                style={{
                  textDecoration: 'none',
                  color: '#F67D1E', 
                }}
              >
                {' '}
                Sign up
              </a>
            </span>
            <span>
              <a
                href="/forgot-password"
                style={{
                  textDecoration: 'none',
                  color: '#F67D1E',
                }}
              >
                I forgot my password
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
