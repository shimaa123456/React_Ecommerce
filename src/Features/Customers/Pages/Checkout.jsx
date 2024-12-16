import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoNavbar from "../../Admin/Components/LogoNavbar";
import Navbar from "../Components/UserNavbar";
import { addOrder } from "../../Admin/Components/AdminRedux/OrdersSlice";
import { clearCart } from "../../Admin/Components/AdminRedux/CartSlice";
import { fetchCoupons } from "../../Admin/Components/AdminRedux/CouponsSlice";
import { updateProductStock } from "../../Admin/Components/AdminRedux/ProductsSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const cart = useSelector((state) => state.cart.items);
  const coupons = useSelector((state) => state.coupons.coupons);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const calculateProductDiscount = (product) => {
    const discountAmount = (product.price * product.discountPercentage) / 100;
    const discountedPrice = product.price - discountAmount;
    return {
      originalPrice: product.price,
      discountedPrice: discountedPrice,
      discountAmount: discountAmount,
    };
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return cart.reduce((total, product) => {
      const { discountAmount } = calculateProductDiscount(product);
      return total + (discountAmount * product.quantity);
    }, 0);
  };

  const cartTotal = calculateCartTotal();
  const totalDiscount = calculateTotalDiscount();
  const TAX_RATE = 0.15;
  const tax = cartTotal * TAX_RATE;

  const handleApplyCoupon = () => {
    const coupon = coupons.find((coupon) => coupon.title === couponCode);

    if (!coupon) {
      alert("Invalid coupon code.");
      return;
    }

    const currentDate = new Date().toISOString();
    if (!coupon.isActive || currentDate < coupon.startDate || currentDate > coupon.endDate) {
      alert("This coupon is not active or has expired.");
      return;
    }

    const applicableCategories = coupon.applicableCategories;
    const cartCategories = cart.map((product) => product.category);
    const isApplicable = applicableCategories.some((category) => cartCategories.includes(category) || category === "all");

    if (!isApplicable) {
      alert("This coupon is not applicable to the products in your cart.");
      return;
    }

    setDiscount(coupon.discountPercentage);
  };

  // const handleCompleteOrder = async () => {
  //   if (!paymentMethod || !shippingMethod) {
  //     alert("Please select both payment and shipping methods.");
  //     return;
  //   }

  //   const finalPrice = cartTotal + tax - discount;

  //   const newOrder = {
  //     userId: user.id,
  //     status: "pending",
  //     total: finalPrice,
  //     tax: tax,
  //     discount: discount,
  //     coupon: couponCode,
  //     paymentMethod,
  //     shippingMethod,
  //     createdAt: new Date().toISOString(),
  //     isCompleted: false,
  //     products: cart,
  //   };

  //   try {
  //     await dispatch(addOrder(newOrder));
  //     await dispatch(clearCart({ userId: user.id }));
  //     alert("Order placed successfully!");
  //     navigate("/orderhistory");
  //   } catch (error) {
  //     console.error("Failed to complete order:", error);
  //     alert("Failed to complete the order. Please try again.");
  //   }
  // };

  const handleCompleteOrder = async () => {
    if (!paymentMethod || !shippingMethod) {
      alert("Please select both payment and shipping methods.");
      return;
    }
  
    const finalPrice = cartTotal + tax - discount;
  
    const newOrder = {
      userId: user.id,
      status: "pending",
      total: finalPrice,
      tax: tax,
      discount: discount,
      coupon: couponCode,
      paymentMethod,
      shippingMethod,
      createdAt: new Date().toISOString(),
      isCompleted: false,
      products: cart,
    };
  
    try {
      await dispatch(addOrder(newOrder));
  
      // Update the stock of each product in the cart
      for (let product of cart) {
        const updatedProduct = { ...product, stock: product.stock - product.quantity };
        await dispatch(updateProductStock(updatedProduct));
      }
  
      await dispatch(clearCart({ userId: user.id }));
      alert("Order placed successfully!");
      navigate("/orderhistory");
    } catch (error) {
      console.error("Failed to complete order:", error);
      alert("Failed to complete the order. Please try again.");
    }
  };
  

  return (
    <div className="bg-light min-vh-100">
      <div className="container-fluid p-0">
        <LogoNavbar />
        <Navbar />
        <div className="container mt-5">
          <h1 className="text-center mb-4" style={{ color: "#6B94D3" }}>Checkout</h1>
          <div className="row">
            {/* Left Column - Order Summary + Product List */}
            <div className="col-md-6">
              <div className="card shadow-sm p-4 mb-4">
                <h3 className="card-title" style={{ color: "#F79420" }}>Order Summary</h3>
                <p><strong>Total Items:</strong> {cart.reduce((acc, product) => acc + product.quantity, 0)}</p>
                <p><strong>Total Price (Before Discount):</strong> ${cartTotal.toFixed(2)}</p>
                <p><strong>Total Discount:</strong> -${totalDiscount.toFixed(2)}</p>
                <p><strong>Tax (15%):</strong> ${tax.toFixed(2)}</p>
                <p><strong>Coupon Discount:</strong> -${discount.toFixed(2)}</p>
                <hr />
                <p><strong>Final Price:</strong> ${(cartTotal + tax - discount).toFixed(2)}</p>
              </div>

              <div className="card shadow-sm p-4 mb-4">
                <h3 className="mb-3" style={{ color: "#F79420" }}>Products</h3>
                {cart.map((product) => {
                  const { originalPrice, discountedPrice, discountAmount } = calculateProductDiscount(product);
                  return (
                    <div key={product.id} className="product-summary mb-4">
                      <p><strong>{product.title}</strong></p>
                      <p>Quantity: {product.quantity}</p>
                      <p><strong>Original Price:</strong> ${originalPrice.toFixed(2)} x {product.quantity} = ${(originalPrice * product.quantity).toFixed(2)}</p>
                      <p><strong>Discount Applied:</strong> -${(discountAmount * product.quantity).toFixed(2)}</p>
                      <p><strong>Discounted Price:</strong> ${discountedPrice.toFixed(2)} x {product.quantity} = ${(discountedPrice * product.quantity).toFixed(2)}</p>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Checkout Form */}
            <div className="col-md-6">
              <div className="card shadow-sm p-4">
                <h3 className="card-title" style={{ color: "#F79420" }}>Checkout Details</h3>
                <form>
                  {/* Payment Method */}
                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select
                      className="form-select"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Cash on Delivery">Cash on Delivery</option>
                    </select>
                  </div>

                  {/* Shipping Method */}
                  <div className="mb-3">
                    <label className="form-label">Shipping Method</label>
                    <select
                      className="form-select"
                      value={shippingMethod}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    >
                      <option value="">Select Shipping Method</option>
                      <option value="Standard Shipping">Standard Shipping</option>
                      <option value="Express Shipping">Express Shipping</option>
                    </select>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-3">
                    <label className="form-label">Coupon Code</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleApplyCoupon}
                        style={{ backgroundColor: "#F79420", borderColor: "#F79420" }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Complete Order */}
                  <button
                    type="button"
                    className="btn btn-success w-100"
                    onClick={handleCompleteOrder}
                    style={{ backgroundColor: "#F79420", borderColor: "#F79420" }}
                  >
                    Complete Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
