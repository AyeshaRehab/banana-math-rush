import React, { useState, useEffect } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [lastPlayed, setLastPlayed] = useState("");

  useEffect(() => {
    // Fetch username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Fetch total games played from localStorage
    const storedGamesPlayed = localStorage.getItem("gamesPlayed");
    if (storedGamesPlayed) {
      setGamesPlayed(storedGamesPlayed);
    }

    // Fetch the last played date from localStorage (if applicable)
    const storedLastPlayed = localStorage.getItem("lastPlayed");
    if (storedLastPlayed) {
      setLastPlayed(storedLastPlayed);
    } else {
      // Default to a placeholder if no lastPlayed date exists
      setLastPlayed("N/A");
    }
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-title">Your Profile</h2>
      <div className="profile-info">
        <div className="profile-details">
          <label className="profile-label">Username:</label>
          <div className="profile-data">{username}</div>
        </div>
        <div className="profile-details">
          <label className="profile-label">Total Games Played:</label>
          <div className="profile-data">{gamesPlayed}</div>
        </div>
        <div className="profile-details">
          <label className="profile-label">Last Played:</label>
          <div className="profile-data">{lastPlayed}</div>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
