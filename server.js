const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB (Render ENV)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// ✅ Schema
const AttendanceSchema = new mongoose.Schema({
  name: String,
  status: String,
  date: { type: Date, default: Date.now }
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

// ✅ Student schema
const StudentSchema = new mongoose.Schema({
  name: String
});

const Student = mongoose.model("Student", StudentSchema);

// ✅ LOGIN
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
      document.getElementById("loginPage").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
      loadStudents();
    } else {
      alert("Invalid login");
    }

  } catch (err) {
    console.error(err);
    alert("Backend not reachable ❌");
  }
}

// ✅ UPDATE attendance
app.put("/attendance/:id", async (req, res) => {
  const { status } = req.body;

  const updated = await Attendance.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);
});

// ✅ GET all
app.get("/attendance", async (req, res) => {
  const data = await Attendance.find();
  res.json(data);
});

// ✅ FILTER by date
app.get("/attendance/:date", async (req, res) => {
  const start = new Date(req.params.date);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const data = await Attendance.find({
    date: { $gte: start, $lt: end }
  });

  res.json(data);
});

// ✅ STUDENT wise
app.get("/attendance/student/:name", async (req, res) => {
  const data = await Attendance.find({ name: req.params.name });
  res.json(data);
});

// ✅ DELETE
app.delete("/attendance/:id", async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// ✅ STUDENTS
app.post("/students", async (req, res) => {
  const student = new Student({ name: req.body.name });
  await student.save();
  res.send("Student added");
});

app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// ✅ SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





