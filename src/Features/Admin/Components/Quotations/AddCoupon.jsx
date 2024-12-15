import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCoupon } from '../AdminRedux/CouponsSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCoupon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
    isActive: false,
    usageLimit: '',
    applicableCategories: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || formData.title.length < 3) {
      toast.error('Title must be at least 3 characters.');
      return;
    }
    if (!formData.discountPercentage || isNaN(formData.discountPercentage)) {
      toast.error('Discount Percentage must be a valid number.');
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      toast.error('Both Start Date and End Date are required.');
      return;
    }
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error('Start Date cannot be later than End Date.');
      return;
    }

    const couponData = {
      ...formData,
      discountPercentage: parseFloat(formData.discountPercentage),
      usageLimit: parseInt(formData.usageLimit, 10),
      applicableCategories: formData.applicableCategories
        ? formData.applicableCategories.split(',').map((cat) => cat.trim())
        : [],
      startDate: `${formData.startDate}T00:00:00`,
      endDate: `${formData.endDate}T23:59:59`,
    };

    dispatch(addCoupon(couponData))
      .unwrap()
      .then(() => {
        toast.success('Coupon added successfully!');
        navigate('/dashboard/quotations/coupons');
      })
      .catch((error) => {
        console.error('Failed to add coupon:', error);
        toast.error('Failed to add coupon.');
      });
  };

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <h2 className="page-title" style={{ color: '#6B94D3' }}>Add Coupon</h2>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <form onSubmit={handleSubmit}>
            <div className="row gy-3">
              {/* Left Column */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Basic Details</h3>
                    {/* Title */}
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {/* Description */}
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    {/* Start Date */}
                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Start Date</label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="form-control"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {/* End Date */}
                    <div className="mb-3">
                      <label htmlFor="endDate" className="form-label">End Date</label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="form-control"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Additional Details</h3>
                    {/* Discount Percentage */}
                    <div className="mb-3">
                      <label htmlFor="discountPercentage" className="form-label">Discount Percentage</label>
                      <input
                        type="number"
                        step="0.01"
                        id="discountPercentage"
                        name="discountPercentage"
                        className="form-control"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {/* Usage Limit */}
                    <div className="mb-3">
                      <label htmlFor="usageLimit" className="form-label">Usage Limit</label>
                      <input
                        type="number"
                        id="usageLimit"
                        name="usageLimit"
                        className="form-control"
                        value={formData.usageLimit}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {/* Applicable Categories */}
                    <div className="mb-3">
                      <label htmlFor="applicableCategories" className="form-label">Applicable Categories (comma-separated)</label>
                      <input
                        type="text"
                        id="applicableCategories"
                        name="applicableCategories"
                        className="form-control"
                        value={formData.applicableCategories}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {/* Is Active */}
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="isActive"
                          name="isActive"
                          className="form-check-input"
                          checked={formData.isActive}
                          onChange={handleChange}
                        />
                        <label htmlFor="isActive" className="form-check-label">Active</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="text-end">
              <button type="submit" style={{
            backgroundColor: '#F79420',
            borderColor: '#F79420',
          }}
          className="btn text-white">Save</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard/quotations/coupons')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
