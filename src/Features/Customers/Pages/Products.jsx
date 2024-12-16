import { useState } from 'react';
import LogoNavbar from '../../Admin/Components/LogoNavbar';
import Sidebar from '../Components/aside';
import Navbar from '../Components/UserNavbar';
import Data from '../Components/productData';
import '../../../styles/productCard.css';


const UserProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("all"); 
    

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
                        <div className="col-md-2 ">
                            <div className="border-right">
                                <Sidebar setSelectedCategory={setSelectedCategory} />
                            </div>
                        </div>

                        {/* Collection on the right */}
                        <div className="col-md-10 ">
                            {/* Pass selectedCategory to Data */}
                            <div className="showdata">
                                <Data selectedCategory={selectedCategory} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProductsPage;
