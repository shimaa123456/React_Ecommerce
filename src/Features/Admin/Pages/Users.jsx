import LogoNavbar from '../Components/LogoNavbar';
import Navbar from '../Components/Navbar';
import { Outlet } from "react-router-dom";
const UsersPage = () => {
    return (
        <div className="bg-light min-vh-100">
        <div className="container-fluid p-0">
            {/* Top Navbar */}
            <LogoNavbar />

            {/* Secondary Navbar */}
            <Navbar />

            {/* Users Page Content */}
            <div className="container-fluid p-4">
            <Outlet />
            </div>
        </div>
        </div>
    );
};

export default UsersPage;