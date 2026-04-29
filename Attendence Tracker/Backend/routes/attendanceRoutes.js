const router = require("express").Router();
const Attendance = require("../models/Attendance");
const auth = require("../middleware/authMiddleware");

// MARK ATTENDANCE
router.post("/", auth, async (req, res) => {
  try {
    const { userId, subject, status } = req.body;

    const record = await Attendance.create({
      user: userId,
      subject,
      status, // ✅ FIXED HERE (dynamic)
    });

    res.json(record);
  } catch (err) {
    res.status(500).json("Error ❌");
  }
});

// GET ATTENDANCE
router.get("/", auth, async (req, res) => {
  const data = await Attendance.find().populate("user", "name");
  res.json(data);
});

module.exports = router;