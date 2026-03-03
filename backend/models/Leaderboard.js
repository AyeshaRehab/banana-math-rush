const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true, default: 0 }
});

const Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);
module.exports = Leaderboard;
