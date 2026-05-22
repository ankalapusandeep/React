import React, { useState } from "react";
import "./Signup.css";
import { useDispatch } from "react-redux";
import { registerUser } from "./store";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate fields
  const validate = () => {
    let tempErrors = {};

    if (!formData.fullname.trim()) tempErrors.fullname = "Full name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = " Enter a valid email";
    }
    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "ⓘ Password must be at least 6 characters";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = " Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "ⓘ Enter a valid 10-digit number";
    }
    if (!formData.gender) tempErrors.gender = " Please select gender";
    if (!formData.address.trim()) tempErrors.address = " Address is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
         const newUser = {
        id: Date.now(), // unique id
        ...formData,
      };

      // ✅ Save in Redux + LocalStorage
      dispatch(registerUser(newUser));
      alert("✅ SignUp Successful!");
      console.log("User Data:", newUser);
      navigate("/login");
      // you can save this data to backend or localStorage
    }
  };

  return (
    <div className="signup-container" style={{marginTop:"80px"}}>
      <div className="signup-card">
        <h2 className="signup-title">Create an Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label >Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={errors.fullname ? "error-input" : ""}
              placeholder=" Enter your full name"
            />
            {errors.fullname && <small className="error-text">{errors.fullname}</small>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error-input" : ""}
              placeholder=" Enter your email"
            />
            {errors.email && <small className="error-text">{errors.email}</small>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error-input" : ""}
              placeholder=" Enter your password"
            />
            {errors.password && <small className="error-text">{errors.password}</small>}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "error-input" : ""}
              placeholder=" Enter your phone number"
            />
            {errors.phone && <small className="error-text">{errors.phone}</small>}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? "error-input" : ""}
            >
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <small className="error-text">{errors.gender}</small>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "error-input" : ""}
              placeholder=" Enter your address"
            />
            {errors.address && <small className="error-text">{errors.address}</small>}
          </div>

          {/* Submit */}
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
