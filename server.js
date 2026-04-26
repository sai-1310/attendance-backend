const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ✅ LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("Login Request:", req.body);


  let userProfile = {
  name: "Sai Praneeth",
  role: "student",
  email: "saipraneeth@gmail.com",
  phone: "7061717297",
  course: "BTech - AI",
  semester: "Semester 8",
  avatar: ""
};

// GET profile
app.get("/profile", (req, res) => {
  res.json(userProfile);
});

// UPDATE profile
app.post("/profile", (req, res) => {
  userProfile = { ...userProfile, ...req.body };
  res.json({ success: true, userProfile });
});

  // 🔥 SIMPLE HARDCODE LOGIN
  if (username === "admin" && password === "123") {
    return res.json({
      success: true,
      token: "admin-token",
      role: "admin"
    });
  }

  if (username === "student" && password === "123") {
    return res.json({
      success: true,
      token: "student-token",
      role: "student"
    });
  }

  return res.json({
    success: false,
    message: "Invalid credentials"
  });
});

// ✅ SAMPLE ATTENDANCE DATA
app.get("/attendance", (req, res) => {
  const data = [
    { _id: 1, name: "Sai", status: "Present", date: new Date() },
    { _id: 2, name: "Ravi", status: "Absent", date: new Date() },
    { _id: 3, name: "Kiran", status: "Present", date: new Date() },
    { _id: 4, name: "Ajay", status: "Present", date: new Date() },
    { _id: 5, name: "Teja", status: "Absent", date: new Date() },
    { _id: 6, name: "Rahul", status: "Present", date: new Date() },
    { _id: 7, name: "Pavan", status: "Present", date: new Date() },
  ];

  res.json(data);
});

// ✅ START SERVER
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});