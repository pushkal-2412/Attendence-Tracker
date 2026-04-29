import { useState, useEffect } from "react";

const subjects = ["DBMS", "OS", "CN", "Java", "AI"];

function Dashboard() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // ✅ CALCULATE STATS
  const calculateStats = () => {
    const stats = {};

    attendance.forEach((item) => {
      if (!item.subject) return;

      const sub = item.subject;

      if (!stats[sub]) {
        stats[sub] = { total: 0, present: 0, absent: 0 };
      }

      stats[sub].total += 1;

      if (item.status === "present") {
        stats[sub].present += 1;
      } else {
        stats[sub].absent += 1;
      }
    });

    return stats;
  };

  const stats = calculateStats();

  // 🔥 GET ATTENDANCE
  const getAttendance = async () => {
    const res = await fetch("http://localhost:5001/api/attendance", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setAttendance(data);
  };

  // 🔥 GET STUDENTS (FACULTY)
  useEffect(() => {
    if (user?.role === "faculty") {
      fetch("http://localhost:5001/api/auth/users")
        .then((res) => res.json())
        .then((data) => setStudents(data));
    }
  }, []);

  // 🔥 MARK ATTENDANCE (present / absent)
  const markAttendance = async (statusType) => {
    if (!selectedStudentId || !selectedSubject) {
      return alert("Select student & subject ❗");
    }

    const res = await fetch("http://localhost:5001/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: selectedStudentId,
        subject: selectedSubject,
        status: statusType,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data);
    } else {
      setMessage(`Marked ${statusType} for ${selectedSubject} ✅`);
      getAttendance(); // refresh data
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <h2>Attendance System</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="container">
        <div className="card">
          <h3>Welcome, {user?.name} 👋</h3>
          <p>Role: {user?.role}</p>

          {/* 👨‍🏫 FACULTY ONLY */}
          {user?.role === "faculty" && (
            <>
              <select
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                <option value="">Select Student</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <h3>Select Subject</h3>

          <div className="subjects">
            {subjects.map((s) => (
              <button
                key={s}
                className={`subject-btn ${
                  selectedSubject === s ? "active" : ""
                }`}
                onClick={() => setSelectedSubject(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* ROLE CONTROL */}
          {user?.role === "faculty" ? (
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button
                className="mark-btn"
                onClick={() => markAttendance("present")}
              >
                Mark Present ✅
              </button>

              <button
                className="mark-btn"
                style={{ background: "#ef4444" }}
                onClick={() => markAttendance("absent")}
              >
                Mark Absent ❌
              </button>
            </div>
          ) : (
            <p>View Only 📊</p>
          )}

          <p>{message}</p>

          {/* 📊 ATTENDANCE STATS */}
          <h2>Attendance</h2>

          {Object.keys(stats).length === 0 ? (
            <p>No attendance data</p>
          ) : (
            Object.keys(stats).map((sub) => {
              const total = stats[sub].total;
              const present = stats[sub].present;
              const absent = stats[sub].absent;
              const percent = ((present / total) * 100).toFixed(1);

              return (
                <div key={sub} className="history">
                  <strong>{sub}</strong> <br />
                  Total Classes: {total} <br />
                  Present: {present} <br />
                  Absent: {absent} <br />
                  Attendance: {percent}%
                </div>
              );
            })
          )}

          {/* 🕒 RECENT UPDATES (FACULTY ONLY) */}
          {user?.role === "faculty" && (
            <>
              <h3 style={{ marginTop: "20px" }}>Recent Updates 🕒</h3>

              {attendance.length === 0 ? (
                <p>No recent activity</p>
              ) : (
                attendance
                  .slice(-5)
                  .reverse()
                  .map((a) => (
                    <div key={a._id} className="history">
                      <strong>{a.user?.name || "Student"}</strong> <br />
                      Subject: {a.subject} <br />
                      Status:{" "}
                      <span
                        style={{
                          color:
                            a.status === "present" ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {a.status}
                      </span>
                    </div>
                  ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;