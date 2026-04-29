  Attendance Tracker System

---

 Overview

The Smart Attendance Tracker System is a full-stack web application designed to automate and simplify attendance tracking.
It enables faculty to mark attendance digitally and allows students to view their attendance records and performance.

The system ensures:

- Accuracy in attendance tracking
- Real-time updates
- Secure authentication
- Scalable architecture

---

 Problem Statement

Traditional attendance systems are manual, time-consuming, and prone to errors.
This project solves these issues by providing a digital, automated, and reliable attendance management solution.

---

 Objectives

- Digitize attendance management
- Reduce manual errors
- Provide role-based access
- Maintain accurate records
- Generate attendance statistics

---

 Tech Stack

Frontend

- React.js (Vite)
- HTML, CSS, JavaScript

Backend

- Node.js
- Express.js

Database

- MongoDB Atlas
- Mongoose

---

 Project Structure

Smart-Attendance-System/
│
├── frontend/
│   └── React UI
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md

---

 Installation & Setup

 Backend Setup

cd backend
npm install
npm run dev

 Frontend Setup

cd frontend
npm install
npm run dev

---

 Environment Variables

Create a ".env" file inside backend:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5001



 API Endpoints

 Authentication

- POST "/api/auth/register"
- POST "/api/auth/login"
- GET "/api/auth/users"

 Attendance

- POST "/api/attendance"
- GET "/api/attendance"



 System Architecture Diagram

        ┌───────────────┐
        │   Frontend    │
        │   (React)     │
        └──────┬────────┘
               │ HTTP Requests
               ▼
        ┌───────────────┐
        │   Backend     │
        │ Node + Express│
        └──────┬────────┘
               │
               ▼
        ┌───────────────┐
        │   MongoDB     │
        │   Database    │
        └───────────────┘



 MVC Architecture Diagram

         ┌─────────────┐
         │   View      │
         │ (React UI)  │
         └──────┬──────┘
                │
                ▼
         ┌─────────────┐
         │ Controller  │
         │ (Express)   │
         └──────┬──────┘
                │
                ▼
         ┌─────────────┐
         │   Model     │
         │ (MongoDB)   │
         └─────────────┘



 ER Diagram (Conceptual)

User (userId, name, email, role)
        │
        │ places
        ▼
Order / Attendance (attendanceId, subject, status, date)
        │
        │ belongs to
        ▼
Student/User



 Workflow Diagram

User Login
    │
    ▼
Authentication (JWT)
    │
    ▼
Dashboard
    │
    ├── Faculty → Mark Attendance
    │
    └── Student → View Attendance
    │
    ▼
Data Stored in MongoDB



 Functionality

- Faculty selects student and subject
- Marks attendance (Present / Absent)
- Data stored in MongoDB
- Students view attendance records
- System calculates:
  - Total classes
  - Present count
  - Absent count
  - Attendance percentage



 Security

- JWT Authentication
- Protected Routes
- Secure API handling



 Key Features

- Role-based access control
- Real-time updates
- Attendance analytics
- Clean and responsive UI
- Scalable backend design



 Future Enhancements

- QR-based attendance
- Face recognition system
- PDF report generation
- Advanced analytics dashboard



 Advantages

- Saves time
- Reduces manual errors
- Easy to use
- Real-time tracking
- Secure system



 Conclusion

The Smart Attendance Management System provides an efficient and reliable solution for managing attendance digitally.
It improves accuracy, reduces manual effort, and enhances productivity.

The system is scalable, secure, and suitable for real-world implementation in educational institutions.





