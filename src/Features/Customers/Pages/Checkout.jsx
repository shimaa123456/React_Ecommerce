import LogoNavbar from '../../Admin/Components/LogoNavbar';
import Navbar from '../Components/UserNavbar';

const CheckoutPage = () => {
    return (
        <div className="bg-light min-vh-100">
            <div className="container-fluid p-0">
                {/* Top Navbar */}
                <LogoNavbar />

                {/* Secondary Navbar */}
                <Navbar />

                {/* Dashboard Content */}
                <div className="container-fluid p-4">Checkout</div>
            </div>
        </div>
    );
};

export default CheckoutPage;