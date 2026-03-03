import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Play from "./components/Play";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import Menu from "./components/Menu";
import Settings from "./components/Settings";  // Ensure this path is correct
import Levels from "./components/Levels";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/play" element={<Play />} />
        <Route path="/menu" element={<Menu />} />  {/* Make sure this is present */}
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/game/:difficulty" element={<Game />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
}

export default App;
