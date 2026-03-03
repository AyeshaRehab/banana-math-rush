const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");

// ✅ Get all leaderboard entries, sorted by points (highest first)
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ points: -1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Add a new player or update their score
router.post("/", async (req, res) => {
  const { name, points } = req.body;
  try {
    let player = await Leaderboard.findOne({ name });

    if (player) {
      player.points += points; // Increment score
      await player.save();
    } else {
      player = new Leaderboard({ name, points });
      await player.save();
    }
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Reset leaderboard (delete all players)
router.delete("/reset", async (req, res) => {
  try {
    await Leaderboard.deleteMany({});
    res.json({ message: "Leaderboard reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
