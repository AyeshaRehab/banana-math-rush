import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";
import background from "../images/g6.png"; 

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div
      className="menu-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 className="menu-title">Game Menu</h2>
      <button className="menu-button" onClick={() => navigate("/levels")}>🎮 New Game</button>
      <button className="menu-button" onClick={() => navigate("/leaderboard")}>🏆 Leaderboard</button>
      <button className="menu-button" onClick={() => navigate("/profile")}>👤 Profile</button> {/* Added Profile button */}
      <button className="menu-button" onClick={() => navigate("/settings")}>⚙️ Settings</button>
      <button className="menu-button" onClick={() => navigate("/")}>🚪 Exit</button>
    </div>
  );
};

export default Menu;
