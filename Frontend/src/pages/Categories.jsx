import { useEvents } from "../context/EventContext";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Categories() {

  const { events } = useEvents();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [showRecent, setShowRecent] =
    useState(true);

  const defaultEvents = [

    {
      id: 1001,
      title: "EDM Night Festival",
      category: "Music",
      date: "2026-06-15",
      time: "7:00 PM",
      location: "Chennai",
      event_mode: "Offline",
      description: "Live EDM concert experience.",
      banner_image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
      general_price: 499,
    },

    {
      id: 1002,
      title: "AI Future Summit",
      category: "Technology",
      date: "2026-08-10",
      time: "10:00 AM",
      location: "Hyderabad",
      event_mode: "Offline",
      description: "Future AI innovations and networking.",
      banner_image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      general_price: 999,
    },

    {
      id: 1003,
      title: "Street Food Carnival",
      category: "Food",
      date: "2026-07-20",
      time: "4:00 PM",
      location: "Chennai",
      event_mode: "Offline",
      description: "Taste global cuisines.",
      banner_image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      general_price: 299,
    },

    {
      id: 1004,
      title: "Gaming Championship",
      category: "Gaming",
      date: "2026-09-12",
      time: "2:00 PM",
      location: "Bangalore",
      event_mode: "Offline",
      description: "Compete in esports tournaments.",
      banner_image:
        "https://images.unsplash.com/photo-1542751110-97427bbecf20",
      general_price: 599,
    },

    {
      id: 1005,
      title: "Creative Art Workshop",
      category: "Art",
      date: "2026-06-01",
      time: "11:00 AM",
      location: "Online",
      event_mode: "Online",
      description: "Digital painting and sketching.",
      banner_image:
        "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg",
      general_price: 199,
    },

  ];

  const user = localStorage.getItem("meetoraUser");

  if (!user) {
    return <Navigate to="/" />;
  }

  const allEvents = [...defaultEvents, ...events];

  const recentEvents = [...events].reverse();

  const categories = [
    "All",
    ...new Set(allEvents.map((e) => e.category)),
  ];

  const filteredEvents = allEvents.filter((event) => {

    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      event.location
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      event.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        fontFamily: "Inter, sans-serif",
      }}
    >

      {/* SIDEBAR */}

      <div
        style={{
          width: "260px",
          background: "white",
          padding: "40px 24px",
          borderRight: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >

        <h1
          style={{
            fontSize: "38px",
            fontWeight: "700",
            marginBottom: "40px",
          }}
        >
          Meetora
        </h1>

        <button
          onClick={() => setShowRecent(!showRecent)}
          style={{
            width: "100%",
            padding: "18px",
            border: "none",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "white",
            fontWeight: "600",
            marginBottom: "30px",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Recent Events
        </button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              style={{
                padding: "16px",
                borderRadius: "18px",
                border: "none",
                background:
                  selectedCategory === category
                    ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                    : "#f3f4f6",

                color:
                  selectedCategory === category
                    ? "white"
                    : "#111827",

                textAlign: "left",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              {category}
            </button>

          ))}

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >

        {/* TOP */}

        <div
          style={{
            marginBottom: "40px",
          }}
        >

          <h1
            style={{
              fontSize: "58px",
              fontWeight: "700",
              lineHeight: "70px",
              marginBottom: "14px",
              color: "#111827",
            }}
          >
            Discover Premium Experiences
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
              marginBottom: "30px",
            }}
          >
            Curated events designed for creators,
            innovators and communities.
          </p>

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "22px",
              borderRadius: "24px",
              border: "1px solid #e5e7eb",
              background: "white",
              fontSize: "16px",
              outline: "none",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          />

        </div>

        {/* RECENT EVENTS */}

        {showRecent && recentEvents.length > 0 && (

          <div
            style={{
              marginBottom: "50px",
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >

              <h2
                style={{
                  fontSize: "32px",
                  color: "#111827",
                }}
              >
                Recently Added
              </h2>

            </div>

            <div
              style={{
                display: "flex",
                gap: "24px",
                overflowX: "auto",
                paddingBottom: "10px",
              }}
            >

              {recentEvents.map((event) => (

                <div
                  key={event.id}
                  style={{
                    minWidth: "340px",
                    background: "white",
                    borderRadius: "32px",
                    overflow: "hidden",
                    boxShadow:
                      "0 15px 40px rgba(0,0,0,0.06)",
                  }}
                >

                  <img
                    src={event.banner_image}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  <div style={{ padding: "24px" }}>

                    <p
                      style={{
                        color: "#8b5cf6",
                        fontWeight: "600",
                        marginBottom: "10px",
                      }}
                    >
                      {event.category}
                    </p>

                    <h3
                      style={{
                        fontSize: "26px",
                        marginBottom: "10px",
                        color: "#111827",
                      }}
                    >
                      {event.title}
                    </h3>

                    <p
                      style={{
                        color: "#6b7280",
                        marginBottom: "24px",
                      }}
                    >
                      {event.location}
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/book/${event.id}`)
                      }
                      style={{
                        width: "100%",
                        padding: "16px",
                        borderRadius: "18px",
                        border: "none",
                        background:
                          "linear-gradient(135deg,#6366f1,#8b5cf6)",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Explore Event
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* EVENT GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "28px",
          }}
        >

          {filteredEvents.map((event) => (

            <div
              key={event.id}
              style={{
                background: "white",
                borderRadius: "34px",
                overflow: "hidden",
                boxShadow:
                  "0 20px 45px rgba(0,0,0,0.05)",
                transition: "0.4s",
              }}
            >

              <img
                src={event.banner_image}
                alt={event.title}
                style={{
                  width: "100%",
                  height: "240px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "28px" }}>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "18px",
                  }}
                >

                  <span
                    style={{
                      background: "#eef2ff",
                      color: "#6366f1",
                      padding: "8px 16px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {event.category}
                  </span>

                  <span
                    style={{
                      color: "#111827",
                      fontWeight: "700",
                    }}
                  >
                    ₹{event.general_price}
                  </span>

                </div>

                <h2
                  style={{
                    fontSize: "30px",
                    marginBottom: "14px",
                    color: "#111827",
                  }}
                >
                  {event.title}
                </h2>

                <p
                  style={{
                    color: "#6b7280",
                    lineHeight: "28px",
                    marginBottom: "20px",
                  }}
                >
                  {event.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#6b7280",
                    marginBottom: "10px",
                    fontSize: "14px",
                  }}
                >
                  <span>{event.date}</span>
                  <span>{event.time}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#6b7280",
                    marginBottom: "26px",
                    fontSize: "14px",
                  }}
                >
                  <span>{event.location}</span>
                  <span>{event.event_mode}</span>
                </div>

                <button
                  onClick={() =>
                    navigate(`/book/${event.id}`)
                  }
                  style={{
                    width: "100%",
                    padding: "18px",
                    borderRadius: "18px",
                    border: "none",
                    background:
                      "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  Book Experience
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Categories;