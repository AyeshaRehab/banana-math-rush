import React, { useContext } from "react";
import "../styles/Settings.css";
import { MusicContext } from "../context/MusicContext"; 

const Settings = () => {
    const { isMusicOn, setIsMusicOn } = useContext(MusicContext);

    return (
        <div className="settings-container">
            <div className="settings-box"> {/* New container */}
                <h1 className="settings-title">⚙️ Settings</h1>
                <div className="toggle-container">
                    <span className="toggle-label">Music</span>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={isMusicOn}
                            onChange={() => setIsMusicOn(!isMusicOn)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;
