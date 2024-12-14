import LogoNavbar from '../../Admin/Components/LogoNavbar';
import Sidebar from '../Components/aside';
import Navbar from '../Components/UserNavbar';
import Data from '../Components/productData';

const UserProductsPage = () => {
    return (
        <div className="bg-light min-vh-100">
            <div className="container-fluid p-0">
                {/* Top Navbar */}
                <LogoNavbar />

                {/* Secondary Navbar */}
                <Navbar />

                {/* Dashboard Content */}
                <div className="container-fluid p-4">
                    <div className="row">
                        {/* Sidebar on the left */}
                        <div className=" col-md-2">
                            <div className="border-right">
                                <Sidebar />
                            </div>
                        </div>

                        {/* Collection on the right */}
                        <div className=" col-md-10">
                            <div className="d-flex justify-content-between text-base mb-4 ">
                                <h1>All Collection</h1>
                                <select className="form-select form-select-sm border-2 border-gray-300 w-auto">
                                    <option value="relavent">Sort by Relavent</option>
                                    <option value="low-high">Sort by Low to High</option>
                                    <option value="high-low">Sort by High to Low</option>
                                </select>
                            </div>
                            {/* Add your collection content here */}
                            <Data/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProductsPage