import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate, Link } from "react-router-dom";
import BannerBackgroundImage from './entrance.jpg';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "123") {
      navigate("/event-organizer");
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="login-container" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
    }}>
      <img src={BannerBackgroundImage} alt="Background" style={{ width: "100%", height: "auto", objectFit: "cover" }}/>
      <div className="wrapper" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}>
        <form onSubmit={handleSubmit}>
          <h1>LOGIN</h1>
          
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="show-password">
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              /> Show Password
            </label>
          </div>

          <button type="submit" className="login-button">Login</button>

          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;