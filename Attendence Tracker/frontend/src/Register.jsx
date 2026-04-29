import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "student",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data);
      } else {
        alert("Registered Successfully ✅");
        window.location.href = "/";
      }
    } catch (err) {
      alert("Server error ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Register 📝</h1>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleRegister}>Register</button>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span className="link" onClick={() => (window.location.href = "/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;