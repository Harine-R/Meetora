import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Support request submitted 🚀");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f8fafc,#eef2ff)",
        padding: "40px 60px",
        fontFamily: "Inter, sans-serif",
      }}
    >

      {/* TOP BAR */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "35px",
        }}
      >

        <h1
          style={{
            fontSize: "34px",
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          Meetora Support
        </h1>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 20px",
            borderRadius: "14px",
            border: "none",
            background:
              "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Back Home
        </button>

      </div>

      {/* MAIN SECTION */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "28px",
        }}
      >

        {/* LEFT PANEL */}

        <div
          style={{
            background: "white",
            borderRadius: "28px",
            padding: "35px",
            boxShadow:
              "0 15px 40px rgba(15,23,42,0.08)",
          }}
        >

          <p
            style={{
              color: "#6366f1",
              fontWeight: "700",
              marginBottom: "10px",
              letterSpacing: "1px",
              fontSize: "13px",
            }}
          >
            CONTACT SUPPORT
          </p>

          <h2
            style={{
              fontSize: "40px",
              lineHeight: "48px",
              marginBottom: "18px",
              color: "#0f172a",
              fontWeight: "800",
            }}
          >
            Need Help?
            <br />
            We’re Here.
          </h2>

          <p
            style={{
              color: "#64748b",
              lineHeight: "28px",
              marginBottom: "30px",
              fontSize: "15px",
            }}
          >
            Reach out for technical support,
            partnerships, event assistance or
            business enquiries.
          </p>

          {/* SUPPORT CARDS */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >

            {[
              {
                icon: <FaEnvelope />,
                title: "Email Support",
                value: "support@meetora.com",
              },

              {
                icon: <FaPhoneAlt />,
                title: "Call Us",
                value: "+91 9345457537",
              },

              {
                icon: <FaMapMarkerAlt />,
                title: "Office",
                value: "Chennai, India",
              },

            ].map((item, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  padding: "18px",
                  borderRadius: "18px",
                  background: "#f8fafc",
                  border:
                    "1px solid #e2e8f0",
                }}
              >

                <div
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "18px",
                    background:
                      "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  {item.icon}
                </div>

                <div>

                  <h4
                    style={{
                      marginBottom: "4px",
                      color: "#0f172a",
                      fontSize: "16px",
                    }}
                  >
                    {item.title}
                  </h4>

                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    {item.value}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div
          style={{
            background: "white",
            borderRadius: "28px",
            padding: "35px",
            boxShadow:
              "0 15px 40px rgba(15,23,42,0.08)",
          }}
        >

          {/* HEADER */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              marginBottom: "30px",
              padding: "22px",
              borderRadius: "24px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          >

            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "22px",
                background:
                  "linear-gradient(135deg,#6366f1,#8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "28px",
              }}
            >
              <FaHeadset />
            </div>

            <div>

              <h2
                style={{
                  fontSize: "34px",
                  fontWeight: "800",
                  color: "#0f172a",
                  marginBottom: "6px",
                  lineHeight: "40px",
                }}
              >
                Send Message
              </h2>

              <p
                style={{
                  color: "#64748b",
                  fontSize: "17px",
                  lineHeight: "26px",
                }}
              >
                We usually reply within 24 hours.
              </p>

            </div>

          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit}>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />

            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                marginBottom: "16px",
              }}
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                resize: "none",
                marginBottom: "22px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "16px",
                border: "none",
                background:
                  "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "white",
                fontWeight: "700",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Send Support Request
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  outline: "none",
  fontSize: "14px",
  color: "#0f172a",
  boxSizing: "border-box",
};

export default Contact;