import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./store";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const currentUser = useSelector((state) => state.users.currentUser);
  const loginError = useSelector((state) => state.users.error);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Enter valid email with '@'";
    return "";
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!value) return "Password is required";
    if (!passwordRegex.test(value)) {
      return "Password must contain 6 characters, 1 number and 1 special character";
    }

    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passErr);

    if (emailErr || passErr) return;

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", currentUser.email);
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

          <h2>Welcome back</h2>
          <p className="card-sub">Sign in to your account</p>

          <form onSubmit={handleLogin} noValidate>
            <div className="field-group">
              <label className="field-label">Email address</label>

              <div className="field-wrapper">
                <input
                  type="email"
                  placeholder="Enter mail.."
                  value={email}
                  onChange={handleEmailChange}
                  className={`field-input ${emailError ? "input-error" : ""}`}
                />
              </div>

              {emailError && <p className="error-text">{emailError}</p>}
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>

              <div className="field-wrapper">
                <input
                  type="password"
                  placeholder="Enter password.."
                  value={password}
                  onChange={handlePasswordChange}
                  className={`field-input ${passwordError ? "input-error" : ""}`}
                />
              </div>

              {passwordError && <p className="error-text">{passwordError}</p>}
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            {loginError && <p className="error-text">{loginError}</p>}
          </form>

          <div className="signup-row">
            Don&apos;t have an account?{" "}
            <button type="button" onClick={() => navigate("/signup")}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;