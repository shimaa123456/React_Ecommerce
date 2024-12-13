import LogoNavbar from '../Components/LogoNavbar';
import Navbar from '../Components/Navbar';

const ProductsPage = () => {
    return (
        <div className="bg-light min-vh-100">
            <div className="container-fluid p-0">
                {/* Top Navbar */}
                <LogoNavbar />

                {/* Secondary Navbar */}
                <Navbar />

                {/* Dashboard Content */}
                <div className="container-fluid p-4">Products</div>
            </div>
        </div>
    );
};

export default ProductsPage;
