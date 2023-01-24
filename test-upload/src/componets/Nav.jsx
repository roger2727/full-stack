import React from "react";
import "./Nav.css";
import logo from "../images/logo.png";
const Nav = () => {
  return (
    <div className="nav-box">
      <div className="nav">
        <img className="logo" src={logo} alt="logo" />
        <div>
          <button className="auth-btn" onClick={() => navigate("/register")}>
            Register
          </button>
          <button className="auth-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
