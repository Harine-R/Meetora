import { useEvents } from "../context/EventContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";

function Organise() {
  const navigate = useNavigate();
  const { events } = useEvents();

  const [currentTime, setCurrentTime] = useState("");

  const user = JSON.parse(localStorage.getItem("meetoraUser"));

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  const allEvents = useMemo(() => {
    return [...events].reverse();
  }, [events]);

  // REAL DATA ONLY

  const totalEvents = allEvents.length;

  const onlineEvents = allEvents.filter(
    (e) => e.event_mode === "Online"
  ).length;

  const offlineEvents = allEvents.filter(
    (e) => e.event_mode === "Offline"
  ).length;

  const totalRevenue = allEvents.reduce(
    (acc, event) =>
      acc + Number(event.general_price || 0),
    0
  );

  const latestEvent =
    allEvents.length > 0 ? allEvents[0] : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right,#f8faff,#eef3ff)",
        display: "flex",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* PREMIUM SIDEBAR */}

      <div
        style={{
          width: "270px",
          height: "100vh",
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(18px)",
          borderRight: "1px solid rgba(255,255,255,0.5)",
          padding: "30px 20px",
          position: "fixed",
          zIndex: 100,
          boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "700",
            marginBottom: "50px",
            color: "#111",
            letterSpacing: "-1px",
          }}
        >
          Meetora
        </h1>

        {[
          {
            title: "Dashboard",
            route: "/organise",
          },
          {
            title: "Create Event",
            route: "/create",
          },
          {
            title: "Explore",
            route: "/explore",
          },
          {
            title: "Categories",
            route: "/categories",
          },
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.route)}
            style={{
              padding: "18px 20px",
              borderRadius: "20px",
              marginBottom: "14px",
              background: "#fff",
              cursor: "pointer",
              transition: "0.4s",
              border: "1px solid #f0f0f0",
              fontWeight: "600",
              color: "#222",
              boxShadow:
                "0 6px 20px rgba(0,0,0,0.03)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateX(8px)";
              e.currentTarget.style.background =
                "#f3f7ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateX(0px)";
              e.currentTarget.style.background =
                "#fff";
            }}
          >
            {item.title}
          </div>
        ))}

        {/* LIVE TIME */}

        <div
          style={{
            marginTop: "60px",
            background:
              "linear-gradient(135deg,#6d8dff,#8f6fff)",
            borderRadius: "28px",
            padding: "28px",
            color: "#fff",
            boxShadow:
              "0 18px 40px rgba(91,124,255,0.25)",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              opacity: 0.9,
              marginBottom: "12px",
            }}
          >
            LIVE DASHBOARD
          </p>

          <h1
            style={{
              fontSize: "42px",
              marginBottom: "8px",
              fontWeight: "700",
            }}
          >
            {currentTime}
          </h1>

          <p
            style={{
              opacity: 0.9,
              lineHeight: "1.6",
            }}
          >
            Real-time organizer analytics
          </p>
        </div>
      </div>

      {/* MAIN */}

      <div
        style={{
          marginLeft: "270px",
          width: "100%",
          padding: "35px",
        }}
      >
        {/* HERO */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#ffffff,#f7f9ff)",
            borderRadius: "40px",
            padding: "45px",
            marginBottom: "35px",
            position: "relative",
            overflow: "hidden",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.04)",
          }}
        >
          {/* FLOATING BACKGROUND */}

          <div
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              background:
                "linear-gradient(135deg,#dbe7ff,#edf2ff)",
              borderRadius: "50%",
              top: "-120px",
              right: "-100px",
              opacity: 0.7,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <p
              style={{
                color: "#6f7cff",
                fontWeight: "600",
                marginBottom: "12px",
                letterSpacing: "1px",
              }}
            >
              ORGANIZER PANEL
            </p>

            <h1
              style={{
                fontSize: "54px",
                color: "#111",
                marginBottom: "16px",
                lineHeight: "1.1",
                letterSpacing: "-2px",
              }}
            >
              Welcome back,
              <br />
              {user?.name}
            </h1>

            <p
              style={{
                color: "#666",
                maxWidth: "650px",
                lineHeight: "1.8",
                fontSize: "17px",
              }}
            >
              Monitor your live events, track
              registrations, manage premium experiences,
              and grow your audience in real time.
            </p>

            <button
              onClick={() => navigate("/create")}
              style={{
                marginTop: "30px",
                border: "none",
                background:
                  "linear-gradient(135deg,#6d8dff,#8f6fff)",
                color: "#fff",
                padding: "16px 28px",
                borderRadius: "18px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",
                boxShadow:
                  "0 14px 30px rgba(91,124,255,0.3)",
              }}
            >
              Launch New Event
            </button>
          </div>
        </div>

        {/* REAL STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {[
            {
              title: "Total Events",
              value: totalEvents,
            },
            {
              title: "Online Events",
              value: onlineEvents,
            },
            {
              title: "Offline Events",
              value: offlineEvents,
            },
            {
              title: "Revenue Base",
              value: `₹${totalRevenue}`,
            },
          ].map((card, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(14px)",
                borderRadius: "32px",
                padding: "30px",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow:
                  "0 14px 40px rgba(0,0,0,0.05)",
                transition: "0.4s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-10px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
              }}
            >
              <p
                style={{
                  color: "#777",
                  marginBottom: "18px",
                  fontSize: "15px",
                }}
              >
                {card.title}
              </p>

              <h1
                style={{
                  fontSize: "52px",
                  color: "#111",
                  marginBottom: "16px",
                  letterSpacing: "-2px",
                }}
              >
                {card.value}
              </h1>

              <div
                style={{
                  height: "10px",
                  borderRadius: "20px",
                  background: "#edf2ff",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "70%",
                    background:
                      "linear-gradient(135deg,#6d8dff,#8f6fff)",
                    height: "100%",
                    borderRadius: "20px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* LATEST EVENT */}

        {latestEvent && (
          <div
            style={{
              background: "#fff",
              borderRadius: "36px",
              overflow: "hidden",
              marginBottom: "40px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
              }}
            >
              {/* IMAGE */}

              <div
                style={{
                  height: "420px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={latestEvent.banner_image}
                  alt={latestEvent.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* CONTENT */}

              <div
                style={{
                  padding: "45px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    background: "#f3f7ff",
                    color: "#6d8dff",
                    padding: "10px 18px",
                    borderRadius: "40px",
                    width: "fit-content",
                    marginBottom: "22px",
                    fontWeight: "600",
                  }}
                >
                  Latest Event
                </span>

                <h1
                  style={{
                    fontSize: "42px",
                    color: "#111",
                    lineHeight: "1.2",
                    marginBottom: "18px",
                    letterSpacing: "-1px",
                  }}
                >
                  {latestEvent.title}
                </h1>

                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.9",
                    marginBottom: "28px",
                  }}
                >
                  {latestEvent.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "25px",
                    marginBottom: "28px",
                    color: "#555",
                  }}
                >
                  <span>{latestEvent.date}</span>
                  <span>{latestEvent.time}</span>
                  <span>{latestEvent.location}</span>
                </div>

                <button
                  onClick={() =>
                    navigate(`/book/${latestEvent.id}`)
                  }
                  style={{
                    width: "fit-content",
                    border: "none",
                    background:
                      "linear-gradient(135deg,#6d8dff,#8f6fff)",
                    color: "#fff",
                    padding: "16px 28px",
                    borderRadius: "18px",
                    cursor: "pointer",
                    fontWeight: "600",
                    boxShadow:
                      "0 12px 30px rgba(91,124,255,0.25)",
                  }}
                >
                  Manage Event
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LIVE EVENT GRID */}

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "28px",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "38px",
                  color: "#111",
                  marginBottom: "10px",
                }}
              >
                Live Event Collection
              </h1>

              <p
                style={{
                  color: "#777",
                }}
              >
                Dynamic real-time organizer content
              </p>
            </div>

            <button
              onClick={() => navigate("/explore")}
              style={{
                border: "none",
                background: "#111",
                color: "#fff",
                padding: "14px 22px",
                borderRadius: "16px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Explore All
            </button>
          </div>

          {allEvents.length === 0 ? (
            <div
              style={{
                background: "#fff",
                padding: "80px",
                borderRadius: "32px",
                textAlign: "center",
                color: "#777",
              }}
            >
              No events available.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(340px,1fr))",
                gap: "24px",
              }}
            >
              {allEvents.map((event, index) => (
                <div
                  key={index}
                  onClick={() =>
                    navigate(`/book/${event.id}`)
                  }
                  style={{
                    background:
                      "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "32px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "0.5s",
                    border:
                      "1px solid rgba(255,255,255,0.6)",
                    boxShadow:
                      "0 12px 40px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-12px)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 60px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 40px rgba(0,0,0,0.04)";
                  }}
                >
                  <div
                    style={{
                      height: "240px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={event.banner_image}
                      alt={event.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      padding: "26px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        marginBottom: "16px",
                      }}
                    >
                      <span
                        style={{
                          background: "#f4f7ff",
                          color: "#6d8dff",
                          padding: "8px 16px",
                          borderRadius: "40px",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {event.category}
                      </span>

                      <span
                        style={{
                          color: "#777",
                          fontSize: "14px",
                        }}
                      >
                        {event.event_mode}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontSize: "30px",
                        color: "#111",
                        lineHeight: "1.3",
                        marginBottom: "14px",
                        letterSpacing: "-1px",
                      }}
                    >
                      {event.title}
                    </h2>

                    <p
                      style={{
                        color: "#666",
                        lineHeight: "1.8",
                        marginBottom: "22px",
                      }}
                    >
                      {event.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        marginBottom: "22px",
                        color: "#555",
                      }}
                    >
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: "#999",
                            fontSize: "13px",
                            marginBottom: "6px",
                          }}
                        >
                          Starting Price
                        </p>

                        <h3
                          style={{
                            fontSize: "28px",
                            color: "#111",
                          }}
                        >
                          ₹{event.general_price}
                        </h3>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/book/${event.id}`
                          );
                        }}
                        style={{
                          border: "none",
                          background:
                            "linear-gradient(135deg,#6d8dff,#8f6fff)",
                          color: "#fff",
                          padding: "14px 22px",
                          borderRadius: "16px",
                          cursor: "pointer",
                          fontWeight: "600",
                          boxShadow:
                            "0 12px 28px rgba(91,124,255,0.22)",
                        }}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Organise;