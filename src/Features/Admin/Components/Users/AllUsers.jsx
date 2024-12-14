import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../AdminRedux/UsersSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const loggedInUser = JSON.parse(sessionStorage.getItem('user')) || null;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/dashboard/users/add-user');
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
        .unwrap()
        .then(() => {
          toast.success('User deleted successfully!');
        })
        .catch((error) => {
          toast.error(`Failed to delete user: ${error}`);
        });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#6B94D3' }}>Users</h1>
        <button
          style={{
            backgroundColor: '#F79420',
            borderColor: '#F79420',
          }}
          className="btn text-white"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>

      {/* Make the table responsive on small screens */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead style={{ backgroundColor: '#6B94D3', color: 'white' }}>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={user.id}
                className={
                  loggedInUser && loggedInUser.id === user.id ? 'table-warning' : ''
                }
              >
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>
                  <img
                    src={user.image}
                    alt={user.name}
                    className="rounded-circle"
                    width="50"
                    height="50"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === 'admin'
                        ? 'text-white'
                        : 'text-dark'
                    }`}
                    style={{
                      backgroundColor: user.role === 'admin' ? '#FF63A1' : '#F79420',
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  {loggedInUser && loggedInUser.id === user.id ? (
                    <strong>You</strong>
                  ) : (
                    <div className="d-flex" style={{ flexWrap: 'nowrap' }}>
                      <button
                        className="btn btn-sm me-2"
                        style={{
                          backgroundColor: '#6B94D3',
                          color: 'white',
                          border: 'none',
                        }}
                        onClick={() => navigate(`/dashboard/users/view-user/${user.id}`)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-sm me-2"
                        style={{
                          backgroundColor: '#F79420',
                          color: 'white',
                          border: 'none',
                        }}
                        onClick={() => navigate(`/dashboard/users/edit-user/${user.id}`)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: '#FF63A1',
                          color: 'white',
                          border: 'none',
                        }}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls - shown only on small screens */}
      <div className="d-flex justify-content-center mt-3">
        <nav className="d-block d-md-none">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <li
                  key={page}
                  className={`page-item ${
                    page === currentPage ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    style={{
                      backgroundColor: page === currentPage ? '#F79420' : '',
                      borderColor: '#F79420',
                      color: page === currentPage ? 'white' : '',
                    }}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* For larger screens - regular pagination */}
        <nav className="d-none d-md-block">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <li
                  key={page}
                  className={`page-item ${
                    page === currentPage ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    style={{
                      backgroundColor: page === currentPage ? '#F79420' : '',
                      borderColor: '#F79420',
                      color: page === currentPage ? 'white' : '',
                    }}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AllUsers;
