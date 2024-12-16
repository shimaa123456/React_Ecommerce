import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // للتنقل بين الصفحات
import LogoNavbar from "../../Admin/Components/LogoNavbar";
import Navbar from "../Components/UserNavbar";


const CartPage = () => {
  const navigate = useNavigate(); // Hook للتنقل بين الصفحات

  // بيانات المنتجات
  const [products, setProducts] = useState([
    { id: 1, name: "Product Name", price: 99.99, quantity: 1 },
    { id: 2, name: "Another Product", price: 49.99, quantity: 3 },
  ]);

  // دالة لتحديث الكمية
  const updateQuantity = (id, delta) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(product.quantity + delta, 0) }
          : product
      )
    );
  };

  // حذف منتج
  const removeProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  // حساب الإجمالي
  const totalItems = products.reduce((acc, product) => acc + product.quantity, 0);
  const totalPrice = products.reduce((acc, product) => acc + product.quantity * product.price, 0);

  // أكشن عند الضغط على Proceed to Checkout
  const handleCheckout = () => {
    navigate("/checkout"); // الانتقال إلى صفحة الدفع
  };

  // أكشن عند الضغط على Continue Shopping
  const handleContinueShopping = () => {
    navigate("/products"); // الانتقال إلى صفحة المنتجات
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container-fluid p-0">
        <LogoNavbar />
        <Navbar />

        <div className="container mt-5">
          <h1 className="text-center mb-4">Shopping Cart</h1>

          <div className="row">
            <div className="col-md-8">
              {products.map((product) => (
                <div className="card mb-3" key={product.id}>
                  <div className="row g-0 align-items-center">
                    <div className="col-md-4">
                      <img
                        src="https://via.placeholder.com/150"
                        className="img-fluid rounded-start"
                        alt={product.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">${product.price.toFixed(2)}</p>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-secondary btn-sm me-2"
                            onClick={() => updateQuantity(product.id, -1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{product.quantity}</span>
                          <button
                            className="btn btn-secondary btn-sm me-3"
                            onClick={() => updateQuantity(product.id, 1)}
                          >
                            +
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeProduct(product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cart Summary</h5>
                  <hr />
                  <p className="card-text">
                    <strong>Total Items:</strong> {totalItems}
                  </p>
                  <p className="card-text">
                    <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                  </p>
                  <button
                    className="btn btn-primary btn-block w-100"
                    onClick={handleCheckout} // توصيل الدالة بزر الدفع
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="btn btn-secondary btn-block w-100 mt-2"
                    onClick={handleContinueShopping} // توصيل الدالة بزر الاستمرار
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
