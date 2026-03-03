const User = require("./models/User"); // ✅ Add this at the top of server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables
console.log("MongoDB URI:", process.env.MONGO_URI);


const app = express();
const PORT = 5000;

// ✅ Middleware (CORS & JSON Parsing)
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend to access the backend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // If using cookies or authentication tokens
}));
app.use(express.json()); // Allow JSON body parsing

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Sign-up API
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Sign-in API
app.post("/api/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// ✅ Leaderboard Routes
const leaderboardRoutes = require("./routes/leaderboard");
app.use("/api/leaderboard", leaderboardRoutes);

// 🔹 Fetch Math Question from External API
app.get("/api/question", async (req, res) => {
  try {
    const response = await axios.get("http://marcconrad.com/uob/banana/api.php?out=json");
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching question:", error.message);
    res.status(500).json({ error: "Failed to fetch question" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
