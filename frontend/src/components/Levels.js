import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Levels.css";

const Levels = () => {
    const navigate = useNavigate();

    return (
        <div className="levels-container">
            <div className="levels-box">
                <h1 className="levels-title">🎮 Levels </h1>
                <div className="buttons-container">
                    <button className="level-button easy" onClick={() => navigate("/game/easy")}>Easy</button>
                    <button className="level-button medium" onClick={() => navigate("/game/medium")}>Medium</button>
                    <button className="level-button hard" onClick={() => navigate("/game/hard")}>Hard</button>
                </div>
            </div>
        </div>
    );
};

export default Levels;
