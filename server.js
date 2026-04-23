const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/attendance");

// MODELS
const User = mongoose.model("User", {
    username: String,
    password: String
});

const Attendance = mongoose.model("Attendance", {
    name: String,
    date: String,
    status: String
});

// ROOT CHECK
app.get('/', (req, res) => {
    res.send("Backend is running");
});

// LOGIN
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) res.json({ success: true });
    else res.json({ success: false });
});

// SAVE ATTENDANCE
app.post('/attendance', async (req, res) => {
    const { name, date, status } = req.body;

    await Attendance.findOneAndUpdate(
        { name, date },
        { status },
        { upsert: true }
    );

    res.json({ success: true });
});

// GET ATTENDANCE
app.get('/attendance/:date', async (req, res) => {
    const data = await Attendance.find({ date: req.params.date });
    res.json(data);
});

// PORT FIX (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running"));