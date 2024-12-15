import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const Sidebar = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]); // تخزين الفئات هنا
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // تخزين الأخطاء

  // دالة لجلب البيانات من API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // جلب المنتجات من الـ API
        const response = await fetch("https://dummyjson.com/products?limit=194");
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();

        // استخراج الفئات الفريدة من المنتجات
        const productCategories = [...new Set(data.products.map((item) => item.category))];

        // إضافة خيار "All" يدويًا في بداية القائمة
        setCategories(["all", ...productCategories]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // دالة fetch فقط عند تحميل المكون

  // دالة لمعالجة تغيير الفئة
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value); // تحديث الفئة المختارة
  };

  // عرض حالة التحميل أو الخطأ
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* Button to trigger offcanvas on small/medium screens */}
      <div className="col-md-12">
  <button
    className="btn btn-primary d-md-none w-100" // أضفنا w-100 ليتوسع الزر ليأخذ عرض كامل
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvas"
    aria-controls="offcanvas"
  >
Category
  </button>
</div>


      {/* Offcanvas Sidebar for small/medium screens */}
      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvas"
        aria-labelledby="offcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLabel">Categories</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex flex-column gap-2 text-muted">
            {categories.length === 0 ? (
              <p>No categories available.</p>
            ) : (
              categories.map((category, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    value={category}
                    id={category}
                    onChange={handleCategoryChange}
                    defaultChecked={category === "all"} // اختيار الافتراضي
                  />
                  <label className="form-check-label" htmlFor={category}>
                    {typeof category === 'string' 
                      ? category.charAt(0).toUpperCase() + category.slice(1) 
                      : category.name.charAt(0).toUpperCase() + category.name.slice(1)} 
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Static Sidebar for large screens */}
      <div className="d-none d-md-block">
        <div className="border p-3 mt-4 bg-white shadow-sm">
          <p className="mb-3 fw-bold text-dark">Categories</p>
          <div className="d-flex flex-column gap-2 text-muted">
            {categories.length === 0 ? (
              <p>No categories available.</p>
            ) : (
              categories.map((category, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    value={category}
                    id={category}
                    onChange={handleCategoryChange}
                    defaultChecked={category === "all"} // اختيار الافتراضي
                  />
                  <label className="form-check-label" htmlFor={category}>
                    {typeof category === 'string' 
                      ? category.charAt(0).toUpperCase() + category.slice(1) 
                      : category.name.charAt(0).toUpperCase() + category.name.slice(1)} 
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
