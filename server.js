console.log("MONGO_URI =", process.env.MONGO_URI);


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB (IMPORTANT: use Render env variable)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));

// ================= SCHEMAS =================

const AttendanceSchema = new mongoose.Schema({
  name: String,
  status: String,
  date: { type: Date, default: Date.now }
});

const StudentSchema = new mongoose.Schema({
  name: String
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);
const Student = mongoose.model("Student", StudentSchema);

// ================= ROUTES =================

// Root
app.get("/", (req, res) => {
  res.send("🚀 Backend running");
});

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123") {
    return res.json({ success: true, token: "abc123" });
  }

  res.json({ success: false });
});

// ADD attendance
app.post("/attendance", async (req, res) => {
  const { name, status } = req.body;

  const entry = new Attendance({ name, status });
  await entry.save();

  res.json({ message: "Saved" });
});

// UPDATE attendance
app.put("/attendance/:id", async (req, res) => {
  const updated = await Attendance.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(updated);
});

// DELETE attendance
app.delete("/attendance/:id", async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// GET all
app.get("/attendance", async (req, res) => {
  const data = await Attendance.find();
  res.json(data);
});

// FILTER by date
app.get("/attendance/date/:date", async (req, res) => {
  const start = new Date(req.params.date);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const data = await Attendance.find({
    date: { $gte: start, $lt: end }
  });

  res.json(data);
});

// STUDENT-wise
app.get("/attendance/student/:name", async (req, res) => {
  const data = await Attendance.find({ name: req.params.name });
  res.json(data);
});

// STUDENTS
app.post("/students", async (req, res) => {
  const student = new Student({ name: req.body.name });
  await student.save();
  res.send("Student added");
});

app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ✅ Use environment variable
const MONGO_URI = process.env.MONGO_URI;

// Debug (IMPORTANT)
console.log("MONGO_URI:", MONGO_URI);

// Safety check
if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found");
  process.exit(1);
}

// Connect DB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});