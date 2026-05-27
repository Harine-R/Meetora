import { useEvents } from "../context/EventContext";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Explore() {

  const { events } = useEvents();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [showResults, setShowResults] = useState(false);

  const defaultEvents = [

    {
      id: 1001,
      title: "EDM Night Festival",
      category: "Music",
      date: "2026-06-15",
      location: "Chennai Trade Centre",
      banner_image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
      general_price: 499,
    },

    {
      id: 1002,
      title: "Startup Networking Meetup",
      category: "Business",
      date: "2026-07-02",
      location: "Bangalore Tech Park",
      banner_image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865",
      general_price: 299,
    },

    {
      id: 1003,
      title: "AI Future Summit",
      category: "Technology",
      date: "2026-08-10",
      location: "Hyderabad Convention Hall",
      banner_image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      general_price: 999,
    },

    {
      id: 1004,
      title: "Open Mic Night",
      category: "Entertainment",
      date: "2026-06-28",
      location: "Phoenix Mall Chennai",
      banner_image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
      general_price: 199,
    },

    {
      id: 1005,
      title: "Photography Masterclass",
      category: "Workshop",
      date: "2026-07-12",
      location: "Online",
      banner_image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
      general_price: 399,
    },

    {
      id: 1006,
      title: "Food Carnival 2026",
      category: "Food",
      date: "2026-08-20",
      location: "Marina Beach",
      banner_image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      general_price: 149,
    },

    {
      id: 1007,
      title: "Fitness Bootcamp",
      category: "Fitness",
      date: "2026-07-05",
      location: "Besant Nagar Beach",
      banner_image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      general_price: 299,
    },

    {
      id: 1008,
      title: "Anime Cosplay Meetup",
      category: "Anime",
      date: "2026-09-01",
      location: "Express Avenue Mall",
      banner_image:
        "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
      general_price: 249,
    },

    {
      id: 1009,
      title: "Gaming Championship",
      category: "Gaming",
      date: "2026-10-12",
      location: "Bangalore Arena",
      banner_image:
        "https://images.unsplash.com/photo-1542751110-97427bbecf20",
      general_price: 599,
    },

  ];

  const user = localStorage.getItem("meetoraUser");

  if (!user) {
    return <Navigate to="/" />;
  }

  const allEvents = [...events, ...defaultEvents];

  const filteredEvents = allEvents.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8fc",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      {/* HERO SECTION */}

      <div
        style={{
          background:
            "linear-gradient(135deg, #ffffff, #eef2ff)",
          borderRadius: "35px",
          padding: "60px",
          marginBottom: "50px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
        }}
      >

        <h1
          style={{
            fontSize: "58px",
            fontWeight: "700",
            color: "#111",
            marginBottom: "18px",
          }}
        >
          Explore Experiences
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#666",
            maxWidth: "750px",
            lineHeight: "1.7",
          }}
        >
          Discover concerts, AI summits, gaming festivals,
          networking events and premium experiences happening near you.
        </p>

        {/* SEARCH */}

        <div
          style={{
            marginTop: "35px",
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >

          <input
            type="text"
            placeholder="Search events, categories or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "18px 24px",
              width: "420px",
              borderRadius: "18px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "16px",
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          />

          <button
            onClick={() => {
              setShowResults(true);

              const section =
                document.getElementById("results-section");

              if (section) {
                section.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            style={{
              padding: "18px 28px",
              border: "none",
              borderRadius: "18px",
              background: "#111",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Explore Now
          </button>

        </div>

      </div>

      {/* MOVING EVENTS */}

      {!showResults && (

      <div
        style={{
          overflow: "hidden",
          width: "100%",
          position: "relative",
        }}
      >

        <div
          style={{
            display: "flex",
            gap: "28px",
            width: "max-content",
            animation: "scrollEvents 45s linear infinite",
          }}
        >

          {[...allEvents, ...allEvents].map((e, index) => (

            <div
              key={index}
              style={{
                minWidth: "340px",
                background: "rgba(255,255,255,0.85)",
                borderRadius: "32px",
                overflow: "hidden",
                backdropFilter: "blur(20px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                transition: "0.4s",
                cursor: "pointer",
              }}
              onMouseEnter={(x) => {
                x.currentTarget.style.transform =
                  "translateY(-12px) scale(1.03)";
              }}
              onMouseLeave={(x) => {
                x.currentTarget.style.transform =
                  "translateY(0px) scale(1)";
              }}
            >

              <img
                src={e.banner_image}
                alt={e.title}
                style={{
                  width: "100%",
                  height: "230px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "24px" }}>

                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    borderRadius: "30px",
                    background: "#f1f5f9",
                    fontSize: "13px",
                    fontWeight: "600",
                    marginBottom: "18px",
                  }}
                >
                  {e.category}
                </div>

                <h2
                  style={{
                    fontSize: "26px",
                    marginBottom: "12px",
                    color: "#111",
                    fontWeight: "700",
                  }}
                >
                  {e.title}
                </h2>

                <p style={{ color: "#666" }}>
                  📍 {e.location}
                </p>

                <p
                  style={{
                    color: "#666",
                    marginBottom: "18px",
                  }}
                >
                  📅 {e.date}
                </p>

                <button
                  onClick={() =>
                    navigate(`/book/${e.id}`)
                  }
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "none",
                    background: "#111",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Book Experience
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      )}

      {/* SEARCH RESULTS */}

      {showResults && (

        <div
          id="results-section"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "30px",
            marginTop: "40px",
          }}
        >

          {filteredEvents.length > 0 ? (

            filteredEvents.map((e) => (

              <div
                key={e.id}
                style={{
                  background: "white",
                  borderRadius: "28px",
                  overflow: "hidden",
                  boxShadow:
                    "0 10px 35px rgba(0,0,0,0.08)",
                }}
              >

                <img
                  src={e.banner_image}
                  alt={e.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "24px" }}>

                  <h2
                    style={{
                      marginBottom: "12px",
                    }}
                  >
                    {e.title}
                  </h2>

                  <p
                    style={{
                      color: "#666",
                      marginBottom: "8px",
                    }}
                  >
                    {e.category}
                  </p>

                  <p
                    style={{
                      color: "#666",
                      marginBottom: "18px",
                    }}
                  >
                    📍 {e.location}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/book/${e.id}`)
                    }
                    style={{
                      width: "100%",
                      padding: "14px",
                      border: "none",
                      borderRadius: "12px",
                      background: "#111",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    View Event
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div
              style={{
                textAlign: "center",
                width: "100%",
                padding: "80px",
              }}
            >

              <h2>No matching events found</h2>

            </div>

          )}

        </div>

      )}

      {/* ANIMATION */}

      <style>
        {`
          @keyframes scrollEvents {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

    </div>
  );
}

export default Explore;