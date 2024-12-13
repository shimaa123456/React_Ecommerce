import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from './AdminRedux/UsersSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

  const handleAddUser = () => {
    // Add user functionality here
    alert('Add User functionality goes here!');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Users</h1>
        <button
        style={{ backgroundColor: '#F67D1E', borderColor: '#F67D1E' }}
        className="btn text-white"
        onClick={handleAddUser}
        >
        Add User
        </button>

      </div>
      <table className="table table-bordered table-striped">
        <thead className="thead-light">
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
                    user.role === 'admin' ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td>
                {loggedInUser && loggedInUser.id === user.id ? (
                  <strong>You</strong>
                ) : (
                  <>
                    <button className="btn btn-sm btn-info me-2">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-warning me-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-sm btn-danger">
                      <i className="fas fa-trash"></i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-3">
        <nav>
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
