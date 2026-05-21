import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./store";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.users.currentUser);
  const loginError = useSelector((state) => state.users.error);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation
  const validate = () => {

    let tempErrors = {};

    // Email
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Enter valid email";
    }

    // Password
    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be minimum 6 characters";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  // Submit Login
  const handleSubmit = (e) => {

    e.preventDefault();

    if (validate()) {

      dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );
    }
  };

  // Redirect after login
  useEffect(() => {

    if (currentUser) {

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", currentUser.email);

      alert("✅ Login Successful!");

      navigate("/");
    }

  }, [currentUser, navigate]);

  return (

    <div className="scene">

      <div className="grid-lines"></div>

      <div className="bg-glow blue"></div>
      <div className="bg-glow purple"></div>
      <div className="bg-glow cyan"></div>

      <div className="card-wrapper">

        <div className="card">

          <div className="card-top-border"></div>

          <div className="logo-ring">
            <div className="logo-inner">🔑</div>
          </div>

          <h2>Welcome Back</h2>

          <p className="card-sub">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}

            <div className="field-group">

              <label className="field-label">
                Email Address
              </label>

              <div className="field-wrapper">

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`field-input ${errors.email ? "input-error" : ""}`}
                />

              </div>

              {errors.email && (
                <small className="error-text">
                  {errors.email}
                </small>
              )}

            </div>

            {/* Password */}

            <div className="field-group">

              <label className="field-label">
                Password
              </label>

              <div className="field-wrapper">

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`field-input ${errors.password ? "input-error" : ""}`}
                />

              </div>

              {errors.password && (
                <small className="error-text">
                  {errors.password}
                </small>
              )}

            </div>

            {/* Login Button */}

            <button type="submit" className="login-btn">
              Login
            </button>

            {/* Redux Login Error */}

            {loginError && (
              <p className="error-text" style={{ marginTop: "10px" }}>
                {loginError}
              </p>
            )}

          </form>

          {/* Signup Link */}

          <div className="signup-row">

            Don't have an account?{" "}

            <button
              type="button"
              className="signup-link-btn"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;