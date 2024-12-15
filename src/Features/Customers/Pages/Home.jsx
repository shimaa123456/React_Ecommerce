
import LogoNavbar from '../../Admin/Components/LogoNavbar';
import Navbar from '../Components/UserNavbar';
import HeroSection from '../Components/Home/HeroSection';
import PopularProducts from '../Components/Home/PopularProducts';
import SpecialOffers from '../Components/Home/SpecialOffers';
import Footer from '../Components/Home/Footer';

const HomePage = () => {
  return (
    <div className="bg-light min-vh-100">
    <div className="container-fluid p-0">
      {/* Top Navbar */}
      <LogoNavbar />

      {/* Secondary Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="container-fluid p-3">
      <HeroSection />
      </div>
      {/* Popular Products Section */}
      <div className="container-fluid p-3 m-3">
          <PopularProducts /> 
        </div>

        {/* Special Offers Section */}
        <div className="container-fluid p-3 m-3">
          <SpecialOffers />
        </div>

        {/* Footer */}
        <div className="container-fluid p-3">
          <Footer />
        </div>
    </div>
    </div>
  );
};

export default HomePage;
