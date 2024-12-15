import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserById } from '../../Admin/Components/AdminRedux/UsersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  const handleEdit = () => {
    navigate(`/edit-profile/${user.id}`);
  };

  const handleClose = () => {
    if (user && user.role === 'admin') {
      navigate('/dashboard'); 
    } else {
      navigate('/home'); 
    }
  };

  return (
    
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#6B94D3' }}>{user.name}</h1>
        <div>
          <button className="btn btn-info me-2" onClick={handleEdit}>
            Edit Profile
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-12 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <img
                src={user.image || '/placeholder.png'}
                alt={user.name}
                className="img-fluid rounded-circle mb-3"
                width="150"
                height="150"
              />
              <h3>{user.name}</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Email</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>{user.role}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{user.address || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
