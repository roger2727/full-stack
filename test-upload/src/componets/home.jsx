import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import RandomRecipes from "./RandomRecipes";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="nav">
        <h1>LOGO</h1>
        <div>
          <button className="auth-btn" onClick={() => navigate("/register")}>
            Register
          </button>
          <button className="auth-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
      <div>
        <RandomRecipes />
      </div>
      <div></div>
    </div>
  );
};

export default Home;
