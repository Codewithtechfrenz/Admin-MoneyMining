import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css/Login.css";
import logo from "../Images/Logo.png";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showOtpPopup, setShowOtpPopup] = useState(false);

  // ✅ 6 OTP boxes
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // ================= LOGIN API =================
  const handleLogin = async () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Please enter the email id");
      valid = false;
    } else if (!email.includes("@")) {
      setEmailError("Please include '@' in the email address");
      valid = false;
    }

    if (!password) {
      setPasswordError("Please enter the password");
      valid = false;
    } else if (password.length < 9) {
      setPasswordError("Password must be at least 9 characters");
      valid = false;
    }

    if (!valid) return;

    try {
      setLoading(true);

      const response = await API.post("/admin/adminLogin", {
        email: email,
        password: password,
      });

      if (response.data.status === 1) {
        toast.success(response.data.message);
        localStorage.setItem("tempToken", response.data.token);
        setShowOtpPopup(true);
      } else {
        toast.error(response.data.message);
      }

    } 
    catch (error) {
      console.log(error.response);
      toast.error("Login failed");
    }
     finally {
      setLoading(false);
    }
  };

  // ================= OTP INPUT =================
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // ✅ Auto move forward
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // ================= OTP VERIFY =================
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    const tempToken = localStorage.getItem("tempToken");

    // ✅ Check for 6 digits
    if (enteredOtp.length !== 6) {
      toast.error("Please enter complete OTP ❌");
      return;
    }

    try {
      const response = await API.post("/admin/adminLoginVerify", {
        token: tempToken,
        otp: enteredOtp,
      });

      if (response.data.status === 1) {
        toast.success(response.data.message);
        localStorage.setItem("authToken", response.data.jToken);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error.response);
      toast.error("OTP verification failed");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">
            Sign in to access your admin dashboard
          </p>

          <label>Email Address</label>
          <div className="input-box">
            <span>✉</span>
            <input
              type="text"
              value={email}
              placeholder="Enter your email address"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {emailError && <p className="error-text">{emailError}</p>}

          <label>Password</label>
          <div className="input-box" style={{ position: "relative" }}>
            <span>🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter the password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={togglePassword}
              style={{
                position: "absolute",
                right: "15px",
                cursor: "pointer",
                fontSize: "18px"
              }}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>
          {passwordError && <p className="error-text">{passwordError}</p>}

          <button
            className="signin-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In →"}
          </button>

          <p className="secure-text">
            Protected by techfrenz.com
          </p>
        </div>
      </div>

      <div className="login-left">
        <img src={logo} alt="Logo" className="left-logo" />
        <h1>
          Manage Your <br />
          <span>Money Mining</span>
        </h1>
        <p>
          Access your powerful admin dashboard to manage
          Money Mining, and grow your Money.
        </p>

        <div className="feature-box">
          <div className="feature">🔐 Secure Admin Access</div>
          <div className="feature">⚡ Real-time Dashboard</div>
          <div className="feature">🕒 24/7 Management</div>
        </div>
      </div>

      {showOtpPopup && (
        <div className="otp-overlay">
          <div className="otp-popup">
            
            {/* ❌ Close Button */}
            <span
              className="close-btn"
              onClick={() => setShowOtpPopup(false)}
            >
              ×
            </span>

            <h3>Enter OTP</h3>
            <p>We sent a 6-digit OTP to your email</p>

            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, index)
                  }
                />
              ))}
            </div> 

            <button className="verify-btn" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;