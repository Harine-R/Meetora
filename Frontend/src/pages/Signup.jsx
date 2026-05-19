import { useState } from "react";
import "../App.css";

function Signup({ goToHome }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "attendee",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", user);
    alert("Signup successful!");
    if (goToHome) goToHome();
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Meetora</h1>
        <p>Your gateway to events & experiences</p>

        <form onSubmit={handleSubmit}>
          <input
            className="input-box"
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            className="input-box"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <input
            className="input-box"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <select
            className="select-box"
            name="role"
            onChange={handleChange}
          >
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
          </select>

          <button className="signup-btn" type="submit">
            Create Account
          </button>
        </form>

        <p style={{ marginTop: "10px", cursor: "pointer" }} onClick={goToHome}>
          ← Back to Home
        </p>
      </div>
    </div>
  );
}

export default Signup;