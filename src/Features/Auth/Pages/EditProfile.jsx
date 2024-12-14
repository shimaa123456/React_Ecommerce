import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../Admin/Components/AdminRedux/UsersSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading } = useSelector((state) => state.users);
  
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      image: "",
      password: "",
      role: "", 
    });
  
    useEffect(() => {
      if (user) {
        setFormData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image || "",
          password: user.password || "",
          role: user.role,
        });
      }
    }, [user]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const { name, email, phone, image } = formData;
  
      if (name.length < 4) {
        toast.error("Name must be at least 4 characters long.");
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
  
      const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
      if (!phoneRegex.test(phone)) {
        toast.error(
          "Phone number must be an Egyptian phone number starting with 010, 011, 012, or 015."
        );
        return;
      }
  
      const validImageUrlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg))$/i;
      if (image && !validImageUrlRegex.test(image)) {
        toast.error("Please enter a valid image URL (PNG, JPG, JPEG, or SVG).");
        return;
      }
  
      dispatch(
        editUser({ id: user.id, ...formData }) 
      )
        .unwrap()
        .then((updatedUser) => {
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
          toast.success("Profile updated successfully!");
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Failed to update profile:", error);
          toast.error("Failed to update profile.");
        });
    };
  
    return (
      <>
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center mb-3">
              <div className="col">
                <h2 className="page-title" style={{ color: "#6B94D3" }}>
                  Edit Profile
                </h2>
              </div>
            </div>
          </div>
        </div>
  
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-4 col-12 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">Profile Image</h3>
                        <img
                          className="img-account-profile rounded-circle mb-2"
                          src={
                            formData.image ||
                            "https://randomuser.me/api/portraits/men/1.jpg"
                          }
                          alt="Profile Image"
                          id="image-preview"
                        />
                        <div className="small font-italic text-muted mb-2">
                          JPG, PNG, JPEG, SVG only
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          id="image"
                          name="image"
                          placeholder="Enter image URL"
                          value={formData.image}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
  
                  <div className="col-lg-8 col-12">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">Profile Details</h3>
                        <div className="row row-cards">
                          <div className="col-md-12 mb-3">
                            <label htmlFor="name" className="form-label">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
  
                          <div className="col-md-12 mb-3">
                            <label htmlFor="email" className="form-label">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
  
                          <div className="col-md-12 mb-3">
                            <label htmlFor="phone" className="form-label">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              className="form-control"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
  
                          <div className="col-md-12 mb-3">
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              className="form-control"
                              value={formData.password}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
  
                      <div className="card-footer text-end">
                        <button
                          className="btn"
                          style={{ backgroundColor: "#F79420", color: "#fff" }}
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        {/* <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/dashboard")}
                        >
                          Cancel
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default EditProfile;
  
