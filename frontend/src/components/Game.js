import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Game.css";
import background from "../images/ggame.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Utility function to update games played in localStorage
const updateGamesPlayed = () => {
  let gamesPlayed = parseInt(localStorage.getItem("gamesPlayed") || "0"); // Get current count, default to 0
  gamesPlayed += 1; // Increment count by 1
  localStorage.setItem("gamesPlayed", gamesPlayed.toString()); // Save the updated count to localStorage
};

// Assuming you want to store the last played date when the user finishes a game
const updateLastPlayed = () => {
  const currentDate = new Date().toLocaleDateString(); // Get the current date
  localStorage.setItem("lastPlayed", currentDate); // Store it in localStorage
};

const Game = () => {
  const { difficulty } = useParams();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [points, setPoints] = useState(0);
  const [username, setUsername] = useState("");
  const [timer, setTimer] = useState(0); // Timer state

  // Timer durations based on difficulty
  const difficultyTimers = {
    easy: 60, // 60 seconds
    medium: 45, // 45 seconds
    hard: 30, // 30 seconds
  };

  useEffect(() => {
    // Fetch username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (difficulty) {
      fetchQuestion();
      setTimer(difficultyTimers[difficulty]); // Set timer based on difficulty
    }
  }, [difficulty]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setMessage("⏳ Time's up! ❌");
    }
  }, [timer]);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/question");
      setQuestion(response.data);
      setMessage("");
      setTimer(difficultyTimers[difficulty]); // Reset timer for new question
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const MySwal = withReactContent(Swal);
  const handleSubmit = async () => {
    if (!question || question.solution === undefined) {
      MySwal.fire({
        icon: "error",
        title: "❌ Oops!",
        text: "No question loaded!",
        customClass: {
          popup: "swal-theme-popup",
          title: "swal-theme-title",
          confirmButton: "swal-theme-button",
        },
      });
      return;
    }

    const correctAnswer = Number(question.solution);
    const userAnswer = parseFloat(answer.trim());

    if (userAnswer === correctAnswer) {
      const newPoints =
        points +
        (difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15);
      setPoints(newPoints);

      // ✅ Send updated score to the backend
      try {
        await axios.post("http://localhost:5000/api/leaderboard", {
          name: username, // Ensure username is stored properly in localStorage
          points: newPoints,
        });
      } catch (error) {
        console.error("❌ Error updating leaderboard:", error);
      }

      MySwal.fire({
        icon: "success",
        title: "Correct!",
        text: "Awesome job!",
        customClass: {
          popup: "swal-theme-popup",
          title: "swal-theme-title",
          confirmButton: "swal-theme-button",
        },
      });

      // Track total games played when the user answers correctly
      updateGamesPlayed(); // Increment games played count

      // Call this function when the user finishes the game
      updateLastPlayed();

      fetchQuestion(); // Load the next question
    } else {
      MySwal.fire({
        icon: "error",
        title: "Incorrect!",
        text: "Try again!",
        customClass: {
          popup: "swal-theme-popup",
          title: "swal-theme-title",
          confirmButton: "swal-theme-button",
        },
      });
    }

    setAnswer("");
  };

  return (
    <div
      className="game-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 className="heee">Banana Math Game</h2>

      {message && <p className="messages">{message}</p>}
      <p className="messages">🎯 Points: {points}</p>
      <p className="ply">
        👦🏻 Player: <strong>{username}</strong>
      </p>

      {/* Timer Display */}
      <p className="timer">⏳ Time Left: {timer} sec</p>

      {question ? (
        <div className="question-box">
          <img src={question.question} alt="Math Question" />
        </div>
      ) : (
        <p>Loading question...</p>
      )}

      <input
        type="text"
        placeholder="Enter your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button className="new-question-btns" onClick={handleSubmit}>
        Submit Answer
      </button>
      <button className="new-question-btn" onClick={fetchQuestion}>
        New Question
      </button>
    </div>
  );
};

export default Game;
