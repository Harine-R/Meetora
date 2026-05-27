import { useState, useRef } from "react";
import { loginUser, signupUser } from "../api/auth";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showChoice, setShowChoice] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("meetoraUser");

  return savedUser ? JSON.parse(savedUser) : null;
});
  const [wishlist, setWishlist] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showWishlist, setShowWishlist] = useState(false);
  const [ticketType, setTicketType] = useState("general");

const [quantity, setQuantity] = useState(1);

const [attendeeName, setAttendeeName] = useState("");

const [attendeeEmail, setAttendeeEmail] = useState("");

const [paymentDone, setPaymentDone] = useState(false);

  const categories = [
    "Music",
    "Technology",
    "Business",
    "Food",
    "Workshops",
    "Sports",
  ];
   const handleLogin = async () => {
  try {
    const res = await loginUser({ email, password });

    toast.success(res.data.message || "Login successful");

const loggedInUser = {
  id: res.data.user_id,
  email: email,
  name: res.data.name,
};
setUser(loggedInUser);

localStorage.setItem(
  "meetoraUser",
  JSON.stringify(loggedInUser)
);
    setShowLogin(false);

  } catch (err) {
    toast.error(err.response?.data?.detail || "Login failed");
  }
};
const handleSignup = async () => {
  try {
    const res = await signupUser({ name, email, password });

    toast.success(res.data.message || "Signup successful");

const loggedInUser = {
  id: res.data.user_id,
  email: email,
  name: name,
};

setUser(loggedInUser);

localStorage.setItem(
  "meetoraUser",
  JSON.stringify(loggedInUser)
);
    setShowSignup(false);

  } catch (err) {
    toast.error(err.response?.data?.detail || "Signup failed");
  }
};
const scrollRef = useRef(null);

const scrollLeft = () => {
  scrollRef.current.scrollBy({
    left: -350,
    behavior: "smooth",
  });
};

const scrollRight = () => {
  scrollRef.current.scrollBy({
    left: 350,
    behavior: "smooth",
  });
};


  return (
    <div className="app">
      {/* ---------------- CHOICE MODAL ---------------- */}
{showChoice && (
  <div className="overlay-bg">
    <div className="premium-modal">

      <h2 className="modal-title">What would you like to do?</h2><br />

      <div className="choice-grid">

        <div
          className="choice-card create"
          onClick={() => {
            setShowChoice(false);
            goToCreate();
          }}
        >
          <div className="icon">🎤</div>
          <h3>Create Event</h3>
          <p>Organize and host amazing events</p>
        </div>

        <div
          className="choice-card attend"
          onClick={() => {
            setShowChoice(false);
            console.log("Attend Event");
          }}
        >
          <div className="icon">🎟️</div>
          <h3>Attend Event</h3>
          <p>Discover and book exciting events</p>
        </div>

      </div>

      <br />

      <p className="close-text" onClick={() => setShowChoice(false)}>
        Close
      </p>

    </div>
  </div>
)}

{/* ---------------- EVENT MODAL ---------------- */}
{selectedEvent && (
  <div className="overlay-bg">
    <div className="modal-card">

      <button
        className="close-btn"
        onClick={() => {
          setSelectedEvent(null);
          setPaymentDone(false);
        }}
      >
        ✕
      </button>

      <h2>{selectedEvent.title}</h2>

      <p>📍 {selectedEvent.location}</p>

      <input
        className="input-box"
        placeholder="Your Name"
        value={attendeeName}
        onChange={(e) => setAttendeeName(e.target.value)}
      />

      <input
        className="input-box"
        placeholder="Your Email"
        value={attendeeEmail}
        onChange={(e) => setAttendeeEmail(e.target.value)}
      />

      <select
        className="input-box"
        value={ticketType}
        onChange={(e) => setTicketType(e.target.value)}
      >
        <option value="general">
          General - ₹{selectedEvent.general_price}
        </option>

        <option value="vip">
          VIP - ₹{selectedEvent.vip_price}
        </option>

        <option value="early">
          Early Bird - ₹{selectedEvent.early_bird_price}
        </option>
      </select>

      <input
        className="input-box"
        type="number"
        min="1"
        value={quantity}
        onChange={(e) =>
          setQuantity(Number(e.target.value))
        }
      />

      <div className="price-box">

        Total: ₹
        {(ticketType === "vip"
          ? Number(selectedEvent.vip_price)
          : ticketType === "early"
          ? Number(selectedEvent.early_bird_price)
          : Number(selectedEvent.general_price)
        ) * quantity}

      </div>

      <button
        className="primary-btn"
        onClick={() => {

          const total =
            (ticketType === "vip"
              ? Number(selectedEvent.vip_price)
              : ticketType === "early"
              ? Number(selectedEvent.early_bird_price)
              : Number(selectedEvent.general_price)
            ) * quantity;

          const options = {

            key: "rzp_test_StvMdKuJ03eDTw",

            amount: total * 100,

            currency: "INR",

            name: "Meetora",

            description: selectedEvent.title,

            handler: function (response) {

              setPaymentDone(true);

              console.log(response);
            },

            prefill: {
              name: attendeeName,
              email: attendeeEmail,
            },

            theme: {
              color: "#6c5ce7",
            },
          };

          const razorpay =
            new window.Razorpay(options);

          razorpay.open();
        }}
      >
        Proceed To Pay
      </button>

      {paymentDone && (
        <div className="qr-box">

          <h3>Your Entry Pass</h3>

         <QRCodeCanvas
  value={`
    Event: ${selectedEvent.title}
    Name: ${attendeeName}
    Tickets: ${quantity}
  `}
  size={180}
/>

        </div>
      )}

    </div>
  </div>
)}

      <ToastContainer position="top-right" autoClose={2500} />
      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="Logo">Meetora</h2>

        <div className="nav-links">
          <Link to="/organise">Organise</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/aipicks">AI Picks</Link>
        </div>

<div className="nav-auth">
  {!user ? (
    <>
      <button className="signin-btn" onClick={() => setShowLogin(true)}>
        Login
      </button>

      <button className="signup-btn" onClick={() => setShowSignup(true)}>
        Sign Up
      </button>
    </>
  ) : (
    <div className="profile-box">

      <div className="profile-icon">👤</div>

      <span className="profile-name">
        {user.name || user.email}
      </span>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("meetoraUser");
          window.location.reload();
        }}
      >
        Logout
      </button>

    </div>
  )}
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
          <p>Concerts, Hackathons, Meetups & More</p><br></br><br></br><br></br><br></br><br></br><br></br>
          <button className="button1"
  onClick={() => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    setShowChoice(true);
  }}
>
  Get Started
</button>
        </div>
      </section>
      <section className="stats-section">

  <div className="stat-card">
    <h2>10K+</h2>
    <p>Events Hosted</p>
  </div>

  <div className="stat-card">
    <h2>50K+</h2>
    <p>Active Users</p>
  </div>

  <div className="stat-card">
    <h2>120+</h2>
    <p>Cities Covered</p>
  </div>

  <div className="stat-card">
    <h2>4.9★</h2>
    <p>User Ratings</p>
  </div>

</section>
          {/* ================= TRENDING EVENTS ================= */}

<section className="featured" id="trending-events">


  <div className="section-header">
    <h2 className="head1">Trending Events</h2>

    <div className="arrow-controls">
      <button onClick={scrollLeft}>❮</button>
      <button onClick={scrollRight}>❯</button>
    </div>
  </div>

  <div className="scroll-container" ref={scrollRef}>

    {/* EVENT 1 */}
    <div
      className="event-card-modern"
       onClick={() => setSelectedEvent({
    id: 2001,
    title: "AI Summit 2026",
    location: "Chennai",
    date: "2026-06-28",
    banner_image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    general_price: 499,
    vip_price: 1499,
    early_bird_price: 299
  })}
    >
      <img
        src="https://images.unsplash.com/photo-1511578314322-379afb476865"
        alt="AI Summit"
      />

      <div className="event-info">

        {/* HEART */}
        <div
          className="heart"
          onClick={(e) => {
            e.stopPropagation();

            setWishlist((prev) =>
              prev.includes("AI Summit 2026")
                ? prev.filter((x) => x !== "AI Summit 2026")
                : [...prev, "AI Summit 2026"]
            );
          }}
        >
          {wishlist.includes("AI Summit 2026") ? "❤️" : "🤍"}
        </div>

        <h3>AI Summit 2026</h3>
        <p>📍 Chennai</p>
        <p>📅 June 28</p>
      </div>
    </div>

    {/* EVENT 2 */}
    <div
      className="event-card-modern"
     onClick={() =>
  setSelectedEvent({
    id: 2002,
    title: "Startup Pitch Fest",
    location: "Bangalore",
    banner_image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    general_price: 599,
    vip_price: 1699,
    early_bird_price: 399,
  })
}
    >
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        alt="Startup Pitch"
      />

      <div className="event-info">

        {/* HEART */}
        <div
          className="heart"
          onClick={(e) => {
            e.stopPropagation();

            setWishlist((prev) =>
              prev.includes("Startup Pitch Fest")
                ? prev.filter((x) => x !== "Startup Pitch Fest")
                : [...prev, "Startup Pitch Fest"]
            );
          }}
        >
          {wishlist.includes("Startup Pitch Fest") ? "❤️" : "🤍"}
        </div>

        <h3>Startup Pitch Fest</h3>
        <p>📍 Bangalore</p>
        <p>📅 July 2</p>
      </div>
    </div>

    {/* EVENT 3 */}
    <div
      className="event-card-modern"
     onClick={() =>
  setSelectedEvent({
    id: 2003,
    title: "Music Night",
    location: "Hyderabad",
    banner_image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    general_price: 799,
    vip_price: 1999,
    early_bird_price: 499,
  })
}
    >
      <img
        src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
        alt="Music Night"
      />

      <div className="event-info">

        {/* HEART */}
        <div
          className="heart"
          onClick={(e) => {
            e.stopPropagation();

            setWishlist((prev) =>
              prev.includes("Music Night")
                ? prev.filter((x) => x !== "Music Night")
                : [...prev, "Music Night"]
            );
          }}
        >
          {wishlist.includes("Music Night") ? "❤️" : "🤍"}
        </div>

        <h3>Music Night</h3>
        <p>📍 Hyderabad</p>
        <p>📅 July 10</p>
      </div>
    </div>
    {/* EVENT 4 */}
<div
  className="event-card-modern"
 onClick={() =>
  setSelectedEvent({
    id: 2004,
    title: "CodeFest Hackathon",
    location: "Bangalore",
    banner_image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    general_price: 699,
    vip_price: 1899,
    early_bird_price: 499,
  })
}
>
  <img
    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    alt="Hackathon"
  />

  <div className="event-info">

    {/* HEART */}
    <div
      className="heart"
      onClick={(e) => {
        e.stopPropagation();

        setWishlist((prev) =>
          prev.includes("CodeFest Hackathon")
            ? prev.filter((x) => x !== "CodeFest Hackathon")
            : [...prev, "CodeFest Hackathon"]
        );
      }}
    >
      {wishlist.includes("CodeFest Hackathon") ? "❤️" : "🤍"}
    </div>

    <h3>CodeFest Hackathon</h3>
    <p>📍 Bangalore</p>
    <p>📅 August 12</p>
  </div>
</div>

{/* EVENT 5 */}
<div
  className="event-card-modern"
 onClick={() =>
  setSelectedEvent({
    id: 2005,
    title: "Networking Night",
    location: "Mumbai",
    banner_image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754",
    general_price: 499,
    vip_price: 1499,
    early_bird_price: 299,
  })
}
>
  <img
    src="https://images.unsplash.com/photo-1515169067868-5387ec356754"
    alt="Networking"
  />

  <div className="event-info">

    {/* HEART */}
    <div
      className="heart"
      onClick={(e) => {
        e.stopPropagation();

        setWishlist((prev) =>
          prev.includes("Networking Night")
            ? prev.filter((x) => x !== "Networking Night")
            : [...prev, "Networking Night"]
        );
      }}
    >
      {wishlist.includes("Networking Night") ? "❤️" : "🤍"}
    </div>

    <h3>Networking Night</h3>
    <p>📍 Mumbai</p>
    <p>📅 August 18</p>
  </div>
</div>

{/* EVENT 6 */}
<div
  className="event-card-modern"
 onClick={() =>
  setSelectedEvent({
    id: 2006,
    title: "Food Carnival 2026",
    location: "Chennai",
    banner_image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    general_price: 399,
    vip_price: 1299,
    early_bird_price: 199,
  })
}
>
  <img
    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
    alt="Food Carnival"
  />

  <div className="event-info">

    {/* HEART */}
    <div
      className="heart"
      onClick={(e) => {
        e.stopPropagation();

        setWishlist((prev) =>
          prev.includes("Food Carnival 2026")
            ? prev.filter((x) => x !== "Food Carnival 2026")
            : [...prev, "Food Carnival 2026"]
        );
      }}
    >
      {wishlist.includes("Food Carnival 2026") ? "❤️" : "🤍"}
    </div>

    <h3>Food Carnival 2026</h3>
    <p>📍 Chennai</p>
    <p>📅 September 2</p>
  </div>
</div>

{/* EVENT 7 */}
<div
  className="event-card-modern"
  onClick={() =>
  setSelectedEvent({
    id: 2007,
    title: "EDM Blast Concert",
    location: "Goa",
    banner_image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    general_price: 999,
    vip_price: 2499,
    early_bird_price: 699,
  })
}
>
  <img
    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
    alt="Concert"
  />

  <div className="event-info">

    {/* HEART */}
    <div
      className="heart"
      onClick={(e) => {
        e.stopPropagation();

        setWishlist((prev) =>
          prev.includes("EDM Blast Concert")
            ? prev.filter((x) => x !== "EDM Blast Concert")
            : [...prev, "EDM Blast Concert"]
        );
      }}
    >
      {wishlist.includes("EDM Blast Concert") ? "❤️" : "🤍"}
    </div>

    <h3>EDM Blast Concert</h3>
    <p>📍 Goa</p>
    <p>📅 September 10</p>
  </div>
</div>

{/* EVENT 8 */}
<div
  className="event-card-modern"
 onClick={() =>
  setSelectedEvent({
    id: 2008,
    title: "AI & Robotics Expo",
    location: "Delhi",
    banner_image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    general_price: 899,
    vip_price: 2199,
    early_bird_price: 599,
  })
}
>
  <img
    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    alt="Robotics Expo"
  />

  <div className="event-info">

    {/* HEART */}
    <div
      className="heart"
      onClick={(e) => {
        e.stopPropagation();

        setWishlist((prev) =>
          prev.includes("AI & Robotics Expo")
            ? prev.filter((x) => x !== "AI & Robotics Expo")
            : [...prev, "AI & Robotics Expo"]
        );
      }}
    >
      {wishlist.includes("AI & Robotics Expo") ? "❤️" : "🤍"}
    </div>

    <h3>AI & Robotics Expo</h3>
    <p>📍 Delhi</p>
    <p>📅 October 1</p>
  </div>
</div>

  </div>
</section>
{/* ================= TESTIMONIALS ================= */}

<section className="testimonials">

  <h2>What People Say About Meetora</h2>

  <div className="testimonial-grid">

    {/* CARD 1 */}
    <div className="testimonial-card">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="user"
      />

      <h3>Priya Sharma</h3>

      <p>
        “Meetora helped me discover amazing tech events and
        network with incredible people.”
      </p>

      <span>⭐ 5.0 Rating</span>
    </div>

    {/* CARD 2 */}
    <div className="testimonial-card">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="user"
      />

      <h3>Rahul Verma</h3>

      <p>
        “The UI is beautiful and booking events feels super smooth.
        Loved the experience!”
      </p>

      <span>⭐ 4.9 Rating</span>
    </div>

    {/* CARD 3 */}
    <div className="testimonial-card">
      <img
        src="https://randomuser.me/api/portraits/women/68.jpg"
        alt="user"
      />

      <h3>Ananya Reddy</h3>

      <p>
        “I hosted my first startup meetup through Meetora and
        got over 300 attendees!”
      </p>

      <span>⭐ 5.0 Rating</span>
    </div>

  </div>

</section>
{/* ================= FOOTER ================= */}
<footer
  className="footer"
  style={{
    marginTop: "80px",
    background:
      "linear-gradient(135deg,#071224,#0f172a)",
    padding: "45px 55px 20px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    position: "relative",
    overflow: "hidden",
  }}
>

  {/* GLOW EFFECT */}

  <div
    style={{
      position: "absolute",
      width: "220px",
      height: "220px",
      borderRadius: "50%",
      background:
        "rgba(99,102,241,0.12)",
      filter: "blur(100px)",
      top: "-80px",
      right: "-80px",
    }}
  />

  <div
    className="footer-top"
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(220px,1fr))",
      gap: "30px",
      position: "relative",
      zIndex: 2,
      alignItems: "start",
    }}
  >

    {/* BRAND */}

    <div className="footer-brand">

      <h2
        style={{
          fontSize: "30px",
          fontWeight: "800",
          color: "white",
          marginBottom: "16px",
          letterSpacing: "-1px",
        }}
      >
        Meetora
      </h2>

      <p
        style={{
          color: "#94a3b8",
          lineHeight: "28px",
          fontSize: "16px",
          maxWidth: "280px",
        }}
      >
        Discover. Connect. Experience premium
        events around you.
      </p>

    </div>

    {/* QUICK LINKS */}

    <div className="footer-links">

      <h3
        style={{
          color: "white",
          fontSize: "20px",
          marginBottom: "18px",
        }}
      >
        Quick Links
      </h3>

      {[
        {
          name: "Explore Events",
          path: "/explore",
        },

        {
          name: "Create Event",
          path: "/create",
        },

        {
          name: "Categories",
          path: "/categories",
        },

        {
          name: "Contact",
          path: "/contact",
        },

      ].map((item) => (

        <div
          key={item.name}

          onClick={() => navigate(item.path)}

          style={{
            marginBottom: "14px",
            color: "#cbd5e1",
            cursor: "pointer",
            transition: "0.3s",
            fontSize: "15px",
          }}

          onMouseEnter={(e) => {
            e.target.style.color = "#8b5cf6";
            e.target.style.transform =
              "translateX(4px)";
          }}

          onMouseLeave={(e) => {
            e.target.style.color = "#cbd5e1";
            e.target.style.transform =
              "translateX(0px)";
          }}
        >
          {item.name}
        </div>

      ))}

    </div>

    {/* SOCIAL ICONS */}

    <div className="footer-social">

      <h3
        style={{
          color: "white",
          fontSize: "20px",
          marginBottom: "18px",
        }}
      >
        Follow Us
      </h3>

      <div
        style={{
          display: "flex",
          gap: "14px",
        }}
      >

        {[
          {
            icon: <FaInstagram />,
            color: "#E1306C",
            link: "https://www.instagram.com/",
          },

          {
            icon: <FaTwitter />,
            color: "#1DA1F2",
            link: "https://twitter.com/",
          },

          {
            icon: <FaLinkedinIn />,
            color: "#0077B5",
            link:
              "https://www.linkedin.com/signup",
          },

        ].map((social, index) => (

          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
            }}
          >

            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: social.color,
                fontSize: "20px",
                cursor: "pointer",
                transition: "0.35s",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.18)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-5px) scale(1.05)";
                e.currentTarget.style.boxShadow =
                  `0 15px 30px ${social.color}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.18)";
              }}
            >
              {social.icon}
            </div>

          </a>

        ))}

      </div>

    </div>

  </div>

  {/* BOTTOM */}

  <div
    className="footer-bottom"
    style={{
      marginTop: "40px",
      borderTop:
        "1px solid rgba(255,255,255,0.08)",
      paddingTop: "18px",
      textAlign: "center",
      color: "#94a3b8",
      fontSize: "14px",
      position: "relative",
      zIndex: 2,
    }}
  >
    © 2026 Meetora. Crafted with premium
    experience.
  </div>

</footer>

{/* ---------------- LOGIN MODAL ---------------- */}
{showLogin && (
  <div className="overlay-bg">
    <div className="modal-card">

      {/* CLOSE BUTTON */}
      <button
        className="close-btn"
        onClick={() => setShowLogin(false)}
      >
        ✕
      </button>

      {/* TITLE */}
      <h2 className="modal-title">Welcome Back</h2>
      <p className="modal-subtitle">Login to continue</p>

      {/* INPUTS */}
      <input
        placeholder="Email Address"
        className="input-box"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        className="input-box"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* BUTTON */}
      <button className="primary-btn" onClick={handleLogin}>
        Login
      </button>
      <p className="switch-text">
  New user?{" "}
  <span
    onClick={() => {
      setShowLogin(false);
      setShowSignup(true);
    }}
  >
    Sign Up
  </span>
</p>
      
    </div>
  </div>
)}


{/* ---------------- SIGNUP MODAL ---------------- */}
{showSignup && (
  <div className="overlay-bg">
    <div className="modal-card">

      {/* CLOSE BUTTON */}
      <button
        className="close-btn"
        onClick={() => setShowSignup(false)}
      >
        ✕
      </button>

      {/* TITLE */}
      <h2 className="modal-title">Create Account</h2>
      <p className="modal-subtitle">Join Meetora and explore events</p>

      {/* INPUTS */}
      <input
        placeholder="Full Name"
        className="input-box"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email Address"
        className="input-box"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        className="input-box"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* BUTTON */}
      <button className="primary-btn" onClick={handleSignup}>
        Create Account
      </button>
      <p className="switch-text">
  Already have an account?{" "}
  <span
    onClick={() => {
      setShowSignup(false);
      setShowLogin(true);
    }}
  >
    Login
  </span>
</p>

    </div>
  </div>
)}
{/* ---------------- CHOICE MODAL ---------------- */}
      {showChoice && (
  <div className="overlay-bg">
    <div className="premium-modal">

      <h2 className="modal-title">What would you like to do?</h2><br></br>

      <div className="choice-grid">

        {/* CREATE EVENT CARD */}
        <div
          className="choice-card create"
          onClick={() => {
  setShowChoice(false);
  navigate("/create");
}}
        >
          <div className="icon">🎤</div>
          <h3>Create Event</h3>
          <p>Organize and host amazing events</p>
        </div>

        {/* ATTEND EVENT CARD */}
        <div
          className="choice-card attend"
          onClick={() => {
  setShowChoice(false);
  const trendingSection = document.getElementById("trending-events");
  if (trendingSection) {
    trendingSection.scrollIntoView({ behavior: "smooth" });
  }
}}

        >
          <div className="icon">🎟️</div>
          <h3>Attend Event</h3>
          <p>Discover and book exciting events</p>
        </div>

      </div><br></br>

      <p className="close-text" onClick={() => setShowChoice(false)}>
        Close
      </p>

    </div>
  </div>
)}
{/* ================= FLOATING WISHLIST ================= */}

<div
  className="floating-wishlist"
  onClick={() => setShowWishlist(!showWishlist)}
>
  ❤️

  {wishlist.length > 0 && (
    <span className="wishlist-count">
      {wishlist.length}
    </span>
  )}
</div>

{/* ================= WISHLIST SIDEBAR ================= */}

<div className={`wishlist-sidebar ${showWishlist ? "open" : ""}`}>

  <div className="wishlist-header">
    <h2>My Wishlist</h2>

    <button onClick={() => setShowWishlist(false)}>
      ✕
    </button>
  </div>

  {wishlist.length === 0 ? (
    <p className="empty-text">No saved events</p>
  ) : (
    wishlist.map((event, i) => (
      <div key={i} className="wishlist-item">
        ❤️ {event}
      </div>
    ))
  )}
</div>

    </div>
  );
}

export default Home;