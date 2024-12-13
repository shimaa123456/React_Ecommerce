
import LogoNavbar from '../../Admin/Components/LogoNavbar';
import Navbar from '../Components/UserNavbar';

const HomePage = () => {
  return (
    <div className="bg-light min-vh-100">
    <div className="container-fluid p-0">
      {/* Top Navbar */}
      <LogoNavbar />

      {/* Secondary Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="container-fluid p-4">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h4">Home</h1>
        </header>

      </div>
    </div>
    </div>
  );
};

export default HomePage;
