import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../AdminRedux/UsersSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
    image: '', // Image URL input
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, password, phone, image } = formData;

    // Name validation
    if (name.length < 4) {
      toast.error('Name must be at least 4 characters long.');
      return;
    }

    // Password validation regex (at least 8 characters, including numbers, letters, and special characters)
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

    // Dispatching the action to add user
    dispatch(addUser(formData))
      .unwrap()
      .then(() => {
        toast.success('User added successfully!');
        navigate('/dashboard/users'); 
      })
      .catch((error) => {
        console.error('Failed to add user:', error);
        toast.error('Failed to add user');
      });
  };

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center mb-3">
            <div className="col">
              <h2 className="page-title" style={{ color: '#6B94D3' }}>Add User</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* User Image Column */}
                <div className="col-lg-4 col-12 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">User Image</h3>
                      <img
                        className="img-account-profile rounded-circle mb-2"
                        src={formData.image || 'https://randomuser.me/api/portraits/men/1.jpg'}
                        alt="User Image"
                        id="image-preview"
                      />
                      <div className="small font-italic text-muted mb-2">
                        JPG, PNG, JPEG, SVG only
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        id="image"
                        name="image"
                        placeholder="Enter image URL"
                        value={formData.image}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* User Details Column */}
                <div className="col-lg-8 col-12 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">User Details</h3>
                      <div className="row">
                        {/* Name */}
                        <div className="col-md-12 mb-3">
                          <label htmlFor="name" className="form-label">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* Email */}
                        <div className="col-md-12 mb-3">
                          <label htmlFor="email" className="form-label">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* Password */}
                        <div className="col-md-12 mb-3">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* Phone */}
                        <div className="col-md-6 mb-3">
                          <label htmlFor="phone" className="form-label">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* Role */}
                        <div className="col-md-6 mb-3">
                          <label htmlFor="role" className="form-label">Role</label>
                          <select
                            className="form-select"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                          >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="card-footer text-end">
                      <button
                        className="btn"
                        style={{ backgroundColor: '#F79420', color: '#fff' }}
                        type="submit"
                      >
                        Save
                      </button>
                      <a className="btn btn-outline-warning" href="/dashboard/users">
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
