import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../App.css";

function BookTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();

  const allEvents = [...events];
  const event = allEvents.find((e) => String(e.id) === String(id));

  const [members, setMembers] = useState(1);
  const [ticketType, setTicketType] = useState("general");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [paid, setPaid] = useState(false);

  if (!event) {
    return <h2>Event not found</h2>;
  }

  // 💰 Price logic
  const pricePerPerson =
    ticketType === "vip"
      ? event.vip_price
      : ticketType === "early"
      ? event.early_bird_price
      : event.general_price;

  const totalPrice = pricePerPerson * members;

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Select payment method");
      return;
    }
    if (!agreed) {
      alert("Please agree to the payment terms");
      return;
    }

    const options = {
      key: "rzp_test_StvMdKuJ03eDTw", // ✅ Your Razorpay Test Key
      amount: totalPrice * 100, // amount in paise
      currency: "INR",
      name: event.title,
      description: `Booking for ${members} member(s)`,
      handler: function (response) {
        // Payment successful → show QR
        setPaid(true);
      },
      prefill: {
        name: "Guest",
        email: "test@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        {/* LEFT SIDE - EVENT INFO */}
        <div className="booking-left">
          <img src={event.banner_image} alt={event.title} />
          <h2>{event.title}</h2>
          <p>📍 {event.location}</p>
          <p>📅 {event.date} | ⏰ {event.time}</p>
        </div>

        {/* RIGHT SIDE - BOOKING FORM */}
        <div className="booking-right">
          <h2>🎟 Book Tickets</h2>

          {/* Ticket Type */}
          <label>Ticket Type</label>
          <select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
          >
            <option value="general">General - ₹{event.general_price}</option>
            <option value="vip">VIP - ₹{event.vip_price}</option>
            <option value="early">Early Bird - ₹{event.early_bird_price}</option>
          </select>

          {/* Members */}
          <label>Number of Members</label>
          <input
            type="number"
            min="1"
            value={members}
            onChange={(e) => setMembers(Number(e.target.value))}
          />

          {/* Payment */}
          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="wallet">Wallet</option>
          </select>

          {/* TOTAL */}
          <div className="price-box">
            <h3>Total: ₹{totalPrice}</h3>
          </div>

          {/* Agreement */}
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I agree to pay ₹{totalPrice}
          </label>

          {/* PAY BUTTON */}
          <button className="pay-btn" onClick={handlePayment}>
            Pay & Generate Ticket
          </button>

          {/* QR AFTER PAYMENT */}
          {paid && (
            <div className="qr-box">
              <h3>🎫 Your Ticket</h3>
              <QRCodeCanvas
                value={JSON.stringify({
                  event: event.title,
                  members,
                  ticketType,
                  totalPrice,
                })}
                size={180}
              />
              <p>Show this QR at entry</p>
              <button onClick={() => navigate("/organise")}>
                Back to Events
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookTicket;
