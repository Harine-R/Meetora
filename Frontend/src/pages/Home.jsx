import { useState } from "react";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const categories = [
    "Music",
    "Technology",
    "Business",
    "Food",
    "Workshops",
    "Sports",
  ];

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="Logo">Meetora</h2>

        <div className="nav-links">
          <a href="#">Explore</a>
          <a href="#">Categories</a>
          <a href="#">Organize</a>
          <a href="#">AI Picks</a>
        </div>

        <div className="nav-auth">
          <button className="signin-btn" onClick={() => setShowLogin(true)}>
            Login
          </button>

          <button className="signup-btn" onClick={() => setShowSignup(true)}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-banner">
        <img
          src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
          alt="banner"
        />

        <div className="overlay">
          <h1>Discover Amazing Events Near You</h1>
          <p>Concerts, Hackathons, Meetups & More</p>
          <button>Get Started</button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <h2>Explore Categories</h2>

        <div className="category-grid">
          {categories.map((cat, index) => (
            <div className="category-card" key={index}>
              {cat}
            </div>
          ))}
        </div>
      </section>
      <section className="featured">
        <h2>Trending Events</h2>

        <div className="event-grid">
          <div className="event-card">
            <h3>AI Summit 2026</h3>
            <p>June 28 • Chennai</p>
          </div>

          <div className="event-card">
            <h3>Startup Pitch Fest</h3>
            <p>July 2 • Bangalore</p>
          </div>

          <div className="event-card">
            <h3>Music Night</h3>
            <p>July 10 • Hyderabad</p>
          </div>
        </div>
      </section>


      {/* ---------------- LOGIN MODAL ---------------- */}
      {showLogin && (
        <div className="overlay-bg">
          <div className="modal-card">
            <h2>Login</h2>

            <input placeholder="Email" className="input-box" />
            <input placeholder="Password" type="password" className="input-box" />

            <button className="primary-btn">Login</button>

            <p onClick={() => setShowLogin(false)} className="close-text">
              Close
            </p>
          </div>
        </div>
      )}

      {/* ---------------- SIGNUP MODAL ---------------- */}
      {showSignup && (
        <div className="overlay-bg">
          <div className="modal-card">
            <h2>Sign Up</h2>

            <input placeholder="Full Name" className="input-box" />
            <input placeholder="Email" className="input-box" />
            <input placeholder="Password" type="password" className="input-box" />

            <select className="input-box">
              <option>Attendee</option>
              <option>Organizer</option>
            </select>

            <button className="primary-btn">Create Account</button>

            <p onClick={() => setShowSignup(false)} className="close-text">
              Close
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;