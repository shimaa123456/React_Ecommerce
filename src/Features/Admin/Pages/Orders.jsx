import LogoNavbar from '../Components/LogoNavbar';
import Navbar from '../Components/Navbar';
import { Outlet } from "react-router-dom";

const OrdersPage = () => {
    return (
        <div className="bg-light min-vh-100">
        <div className="container-fluid p-0">
            {/* Top Navbar */}
            <LogoNavbar />

            {/* Secondary Navbar */}
            <Navbar />

            {/* Orders Content */}
            <div className="container-fluid p-4">
            <Outlet />
            </div>
        </div>
        </div>
    );
};

export default OrdersPage;