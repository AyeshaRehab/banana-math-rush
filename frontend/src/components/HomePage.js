import React from "react"; 
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import background from "../images/g1.png"; // Import image

const HomePage = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="header">
      
        <Link to="/signup" className="signup-button">Sign Up</Link>
      </div>

      <div className="content">
        <h2>Banana Math-Rush!</h2>
        <p>
          Test your math skills in a fun and exciting way! Solve equations, 
          unlock new levels, and become a math champion.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
