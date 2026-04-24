const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());


// ✅ 👉 PASTE MONGODB CONNECTION HERE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB ERROR:", err.message);
  });


// ✅ routes come AFTER connection
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Schema
const AttendanceSchema = new mongoose.Schema({
  name: String,
  status: String,
  date: { type: Date, default: Date.now }
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123") {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// Add attendance
app.post("/attendance", async (req, res) => {
  const { name, status } = req.body;

  const newEntry = new Attendance({ name, status });
  await newEntry.save();

  res.send("Saved");
});

// Get all
app.get("/attendance", async (req, res) => {
  const data = await Attendance.find();
  res.json(data);
});

// Student-wise
app.get("/attendance/student/:name", async (req, res) => {
  const data = await Attendance.find({ name: req.params.name });
  res.json(data);
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});