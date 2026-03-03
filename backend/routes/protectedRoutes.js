const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/play", auth, (req, res) => {
  res.json({ message: "Welcome to the Play Page! 🎮" });
});

module.exports = router;
