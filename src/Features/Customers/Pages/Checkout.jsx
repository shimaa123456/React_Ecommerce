import LogoNavbar from '../../Admin/Components/LogoNavbar';
import Navbar from '../Components/UserNavbar';
import { useState } from 'react';

const CheckoutPage = () => {
    // States to store selected values
    const [paymentMethod, setPaymentMethod] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');
    const [coupon, setCoupon] = useState('');
    const [totalAmount, setTotalAmount] = useState(200); // Total price (example)
    const [tax, setTax] = useState(20); // Example tax
    const [finalAmount, setFinalAmount] = useState(totalAmount + tax);

    const handleCouponApply = () => {
        if (coupon === 'DISCOUNT10') {
            const discount = totalAmount * 0.1;
            setFinalAmount(finalAmount - discount);
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <div className="container-fluid p-0">
                {/* Top Navbar */}
                <LogoNavbar />

                {/* Secondary Navbar */}
                <Navbar />

                {/* Dashboard Content */}
                <div className="container-fluid p-4">
                    <h1 className="text-center mb-4">Checkout</h1>

                    <div className="row">
                        {/* Left Section */}
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h4>Shipping Information</h4>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="shippingMethod" className="form-label">Select Shipping Method</label>
                                            <select 
                                                id="shippingMethod" 
                                                className="form-select" 
                                                value={shippingMethod} 
                                                onChange={(e) => setShippingMethod(e.target.value)}>
                                                <option value="">Select Shipping Method</option>
                                                <option value="standard">Standard Shipping</option>
                                                <option value="express">Express Shipping</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div className="card-body">
                                    <h4>Payment Method</h4>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="paymentMethod" className="form-label">Select Payment Method</label>
                                            <select 
                                                id="paymentMethod" 
                                                className="form-select" 
                                                value={paymentMethod} 
                                                onChange={(e) => setPaymentMethod(e.target.value)}>
                                                <option value="">Select Payment Method</option>
                                                <option value="credit-card">Credit Card</option>
                                                <option value="paypal">PayPal</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div className="card-body">
                                    <h4>Coupon Code</h4>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="coupon" className="form-label">Enter Coupon Code</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="coupon" 
                                                value={coupon} 
                                                onChange={(e) => setCoupon(e.target.value)} 
                                            />
                                            <button 
                                                type="button" 
                                                className="btn btn-primary mt-2" 
                                                onClick={handleCouponApply}>Apply Coupon</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Right Section (Order Summary) */}
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h4>Order Summary</h4>
                                    <hr />
                                    <p><strong>Total Amount:</strong> ${totalAmount}</p>
                                    <p><strong>Tax:</strong> ${tax}</p>
                                    <p><strong>Final Amount:</strong> ${finalAmount}</p>

                                    <button className="btn btn-danger w-100">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
