const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/attendanceDB")
.then(() => console.log("MongoDB Local Connected"))
.catch(err => console.log(err));

// ✅ Schema
const AttendanceSchema = new mongoose.Schema({
  name: String,
  status: String,
  date: { type: Date, default: Date.now }
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);
// POST API
app.post("/attendance", async (req, res) => {
  const { name, status } = req.body;
  const newEntry = new Attendance({ name, status });
  await newEntry.save();
  res.send("Attendance saved");
});

// GET all records
app.get("/attendance", async (req, res) => {
  const data = await Attendance.find();
  res.json(data);
});

// ✅ 👉 ADD HERE (student-wise API)
app.get("/attendance/student/:name", async (req, res) => {
  const data = await Attendance.find({ name: req.params.name });
  res.json(data);
});

// (other APIs like PUT, DELETE can come here)

// Server start (LAST)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});