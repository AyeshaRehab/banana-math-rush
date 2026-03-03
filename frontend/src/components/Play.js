import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Play.css";
import background from "../images/g4.png";

const Play = () => {
  const navigate = useNavigate();

  return (
    <div
      className="play-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Play Button -> Navigates to Menu */}
      <button className="play-button" onClick={() => navigate("/menu")}>
        ▶ Play
      </button>
    </div>
  );
};

export default Play;
