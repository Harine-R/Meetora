import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, Bot } from "lucide-react";

function AiPicks() {

  const [input, setInput] = useState("");

  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text:
        "Hey 👋 I'm Meetora AI. Tell me your mood, interests, city, budget or vibe and I'll discover premium events for you.",
    },
  ]);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // PREMIUM AI ENGINE

  const aiReply = (query) => {

    const lower = query.toLowerCase();

    let mood = "premium";
    let city = "India";
    let category = "events";

    // CITY DETECTION

    if (lower.includes("chennai")) city = "Chennai";
    if (lower.includes("bangalore")) city = "Bangalore";
    if (lower.includes("mumbai")) city = "Mumbai";
    if (lower.includes("delhi")) city = "Delhi";
    if (lower.includes("goa")) city = "Goa";
    if (lower.includes("hyderabad")) city = "Hyderabad";

    // CATEGORY DETECTION

    if (
      lower.includes("music") ||
      lower.includes("concert") ||
      lower.includes("dj") ||
      lower.includes("dance")
    ) {
      category = "music";
    }

    if (
      lower.includes("ai") ||
      lower.includes("tech") ||
      lower.includes("coding") ||
      lower.includes("startup")
    ) {
      category = "tech";
    }

    if (
      lower.includes("food") ||
      lower.includes("dinner") ||
      lower.includes("cafe")
    ) {
      category = "food";
    }

    if (
      lower.includes("business") ||
      lower.includes("network")
    ) {
      category = "business";
    }

    if (
      lower.includes("fashion") ||
      lower.includes("luxury")
    ) {
      category = "fashion";
    }

    if (
      lower.includes("gaming") ||
      lower.includes("esports")
    ) {
      category = "gaming";
    }

    // MOOD DETECTION

    if (
      lower.includes("fun") ||
      lower.includes("party")
    ) {
      mood = "fun";
    }

    if (
      lower.includes("calm") ||
      lower.includes("peace")
    ) {
      mood = "calm";
    }

    if (
      lower.includes("romantic") ||
      lower.includes("date")
    ) {
      mood = "romantic";
    }

    // DATABASE

    const database = {

      music: [
        {
          title: "Neon EDM Festival",
          location: city,
          image:
            "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
          match: "98%",
        },

        {
          title: "Moonlight Concert",
          location: city,
          image:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
          match: "95%",
        },
      ],

      tech: [
        {
          title: "Future AI Summit",
          location: city,
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
          match: "99%",
        },

        {
          title: "Startup Founders Meetup",
          location: city,
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
          match: "96%",
        },
      ],

      food: [
        {
          title: "Luxury Food Carnival",
          location: city,
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
          match: "94%",
        },

        {
          title: "Chef's Dining Experience",
          location: city,
          image:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
          match: "92%",
        },
      ],

      business: [
        {
          title: "Elite Networking Night",
          location: city,
          image:
            "https://images.unsplash.com/photo-1515169067868-5387ec356754",
          match: "97%",
        },

        {
          title: "CEO Leadership Meetup",
          location: city,
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978",
          match: "95%",
        },
      ],

      fashion: [
        {
          title: "Luxury Fashion Week",
          location: city,
          image:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
          match: "98%",
        },

        {
          title: "Premium Brand Showcase",
          location: city,
          image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
          match: "96%",
        },
      ],

      gaming: [
        {
          title: "Esports Arena Championship",
          location: city,
          image:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e",
          match: "97%",
        },

        {
          title: "Gaming Creator Fest",
          location: city,
          image:
            "https://images.unsplash.com/photo-1511512578047-dfb367046420",
          match: "94%",
        },
      ],

      events: [
        {
          title: "Premium City Experience",
          location: city,
          image:
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
          match: "93%",
        },

        {
          title: "VIP Experience Expo",
          location: city,
          image:
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
          match: "91%",
        },
      ],
    };

    let responseText = "";

    if (mood === "fun") {
      responseText =
        `I found high-energy ${category} experiences in ${city} 🔥`;
    }

    else if (mood === "calm") {
      responseText =
        `These peaceful premium ${category} experiences in ${city} match your vibe ✨`;
    }

    else if (mood === "romantic") {
      responseText =
        `I discovered elegant romantic experiences in ${city} ❤️`;
    }

    else {
      responseText =
        `I curated premium ${category} events in ${city} specially for you 🚀`;
    }

    return {
      text: responseText,
      events: database[category] || database.events,
    };
  };

  // SEND MESSAGE

  const sendMessage = () => {

    if (!input.trim()) return;

    const userMessage = {
      type: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    setTyping(true);

    const reply = aiReply(input);

    setTimeout(() => {

      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: reply.text,
          events: reply.events,
        },
      ]);

    }, 1400);

    setInput("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top,#111827,#020617)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        fontFamily: "Inter, sans-serif",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "1500px",
          height: "92vh",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "40px",
          backdropFilter: "blur(24px)",
          display: "flex",
          overflow: "hidden",
          boxShadow:
            "0 25px 80px rgba(0,0,0,0.45)",
        }}
      >

        {/* SIDEBAR */}

        <div
          style={{
            width: "320px",
            background: "rgba(255,255,255,0.03)",
            borderRight:
              "1px solid rgba(255,255,255,0.06)",
            padding: "35px",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "50px",
            }}
          >

            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "18px",
                background:
                  "linear-gradient(135deg,#8b5cf6,#6366f1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              <Bot size={28} />
            </div>

            <div>
              <h2
                style={{
                  color: "white",
                }}
              >
                Meetora AI
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                Smart Event Discovery
              </p>
            </div>

          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg,#8b5cf620,#6366f120)",
              padding: "25px",
              borderRadius: "28px",
              marginBottom: "30px",
            }}
          >

            <Sparkles color="#c4b5fd" size={28} />

            <h3
              style={{
                color: "white",
                marginTop: "18px",
              }}
            >
              AI Powered
            </h3>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "30px",
                marginTop: "12px",
              }}
            >
              Discover premium experiences using intelligent event matching.
            </p>

          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >

            {[
              "Music in Goa",
              "AI Events",
              "Food in Chennai",
              "Gaming",
              "Luxury",
            ].map((item, i) => (

              <button
                key={i}
                onClick={() => setInput(item)}
                style={{
                  border: "none",
                  background:
                    "rgba(255,255,255,0.06)",
                  color: "white",
                  padding: "12px 18px",
                  borderRadius: "999px",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* CHAT */}

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >

          {/* HEADER */}

          <div
            style={{
              padding: "28px 35px",
              borderBottom:
                "1px solid rgba(255,255,255,0.06)",
            }}
          >

            <h1
              style={{
                color: "white",
                fontSize: "38px",
                marginBottom: "10px",
              }}
            >
              AI Event Assistant
            </h1>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              Personalized premium recommendations powered by AI
            </p>

          </div>

          {/* MESSAGES */}

          <div
            ref={chatRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "35px",
            }}
          >

            {messages.map((msg, index) => (

              <div
                key={index}
                style={{
                  marginBottom: "28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    msg.type === "user"
                      ? "flex-end"
                      : "flex-start",
                }}
              >

                <div
                  style={{
                    maxWidth: "70%",
                    background:
                      msg.type === "user"
                        ? "linear-gradient(135deg,#8b5cf6,#6366f1)"
                        : "rgba(255,255,255,0.06)",
                    color: "white",
                    padding: "18px 22px",
                    borderRadius: "24px",
                    lineHeight: "30px",
                  }}
                >
                  {msg.text}
                </div>

                {msg.events && (

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(280px,1fr))",
                      gap: "20px",
                      marginTop: "22px",
                      width: "100%",
                    }}
                  >

                    {msg.events.map((event, i) => (

                      <div
                        key={i}
                        style={{
                          background:
                            "rgba(255,255,255,0.05)",
                          border:
                            "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "28px",
                          overflow: "hidden",
                        }}
                      >

                        <img
                          src={event.image}
                          alt={event.title}
                          style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "cover",
                          }}
                        />

                        <div
                          style={{
                            padding: "24px",
                          }}
                        >

                          <div
                            style={{
                              display: "flex",
                              justifyContent:
                                "space-between",
                              marginBottom: "14px",
                            }}
                          >

                            <span
                              style={{
                                color: "#94a3b8",
                              }}
                            >
                              {event.location}
                            </span>

                            <span
                              style={{
                                color: "#10b981",
                                fontWeight: "700",
                              }}
                            >
                              {event.match}
                            </span>

                          </div>

                          <h2
                            style={{
                              color: "white",
                              fontSize: "28px",
                              marginBottom: "20px",
                            }}
                          >
                            {event.title}
                          </h2>

                          <button
                            style={{
                              width: "100%",
                              padding: "16px",
                              borderRadius: "18px",
                              border: "none",
                              background:
                                "linear-gradient(135deg,#8b5cf6,#6366f1)",
                              color: "white",
                              fontWeight: "600",
                              cursor: "pointer",
                            }}
                          >
                            Explore Experience
                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            ))}

            {typing && (

              <div
                style={{
                  color: "#94a3b8",
                  marginTop: "10px",
                }}
              >
                Meetora AI is thinking...
              </div>

            )}

          </div>

          {/* INPUT */}

          <div
            style={{
              padding: "28px",
              borderTop:
                "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              gap: "18px",
            }}
          >

            <input
              type="text"
              placeholder="Ask AI for events..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              style={{
                flex: 1,
                padding: "22px",
                borderRadius: "22px",
                border: "none",
                outline: "none",
                background:
                  "rgba(255,255,255,0.06)",
                color: "white",
                fontSize: "16px",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                width: "72px",
                borderRadius: "22px",
                border: "none",
                background:
                  "linear-gradient(135deg,#8b5cf6,#6366f1)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Send size={24} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AiPicks;