const Attendance = require("../models/Attendance");

// ✅ FACULTY MARKS STUDENT ATTENDANCE
exports.markAttendance = async (req, res) => {
  try {
    const { userId, subject, status } = req.body;

    if (!userId || !subject) {
      return res.status(400).json("Missing fields");
    }

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const existing = await Attendance.findOne({
      user: userId,
      subject,
      date: { $gte: start, $lte: end },
    });

    if (existing) {
      return res.status(400).json("Already marked today");
    }

    const record = await Attendance.create({
      user: userId,
      subject,
      status,
    });

    res.json(record);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ STUDENT → only their data
// ✅ FACULTY → all data
exports.getAttendance = async (req, res) => {
  try {
    let data;

    if (req.user.role === "faculty") {
      data = await Attendance.find()
        .populate("user", "name email")
        .sort({ date: -1 });
    } else {
      data = await Attendance.find({ user: req.user.id }).sort({
        date: -1,
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};