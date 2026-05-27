import { useState } from "react";
import "../App.css";
import { createEvent } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";

function CreateEvent() {

  const navigate = useNavigate();

  const { fetchEvents } = useEvents();

  const [event, setEvent] = useState({

    title: "",
    category: "",

    date: "",
    time: "",

    location: "",

    event_mode: "",

    description: "",

    banner_image: "",

    ticket_type: "",

    general_price: "",
    vip_price: "",
    early_bird_price: "",

    general_capacity: "",
    vip_capacity: "",
    early_bird_capacity: "",

    discount_code: "",
    discount_percentage: "",

    early_bird_expiry: "",
  });

  const handleChange = (e) => {

    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const user = JSON.parse(
        localStorage.getItem("meetoraUser")
      );

      await createEvent({
        ...event,
        owner_id: user.id,
      });

      await fetchEvents();

      alert("🎉 Event created successfully!");

      navigate("/organise");

    } catch (err) {

      console.log(err);

      alert("Failed to create event");
    }
  };

  return (
    <div className="create-page">

      <div className="left-panel">

        <h1>Create Your Event</h1>

        <p>
          Host amazing events with Meetora
        </p>

        <ul>
          <li>🎟 Multiple ticket tiers</li>
          <li>📸 Event banner</li>
          <li>💸 Discount coupons</li>
          <li>⚡ Early bird pricing</li>
          <li>📱 QR ticketing</li>
        </ul>

      </div>

      <div className="right-panel">

        <form
  className="event-form"
  onSubmit={handleSubmit}
>

  <h2>Create Event</h2>

  <div className="form-grid">

    <input
      type="text"
      name="title"
      placeholder="Event Title"
      onChange={handleChange}
    />

    <input
      type="text"
      name="category"
      placeholder="Category"
      onChange={handleChange}
    />

    <input
      type="date"
      name="date"
      onChange={handleChange}
    />

    <input
      type="time"
      name="time"
      onChange={handleChange}
    />

    <input
      type="text"
      name="location"
      placeholder="Location"
      onChange={handleChange}
    />

    <select
      name="event_mode"
      onChange={handleChange}
    >
      <option value="">
        Select Event Mode
      </option>

      <option value="Offline">
        Offline
      </option>

      <option value="Online">
        Online
      </option>
    </select>

    <input
      type="text"
      name="banner_image"
      placeholder="Banner Image URL"
      onChange={handleChange}
    />

    <select
      name="ticket_type"
      onChange={handleChange}
    >
      <option value="">
        Select Ticket Type
      </option>

      <option value="Free">
        Free
      </option>

      <option value="Paid">
        Paid
      </option>
    </select>

    <input
      type="number"
      name="general_price"
      placeholder="General Ticket Price"
      onChange={handleChange}
    />

    <input
      type="number"
      name="vip_price"
      placeholder="VIP Ticket Price"
      onChange={handleChange}
    />

    <input
      type="number"
      name="early_bird_price"
      placeholder="Early Bird Price"
      onChange={handleChange}
    />

    <input
      type="number"
      name="general_capacity"
      placeholder="General Capacity"
      onChange={handleChange}
    />

    <input
      type="number"
      name="vip_capacity"
      placeholder="VIP Capacity"
      onChange={handleChange}
    />

    <input
      type="number"
      name="early_bird_capacity"
      placeholder="Early Bird Capacity"
      onChange={handleChange}
    />

    <input
      type="text"
      name="discount_code"
      placeholder="Discount Code"
      onChange={handleChange}
    />

    <input
      type="number"
      name="discount_percentage"
      placeholder="Discount Percentage"
      onChange={handleChange}
    />

    <div className="full-width">
      <label>Early Bird Expiry</label>

      <input
        type="date"
        name="early_bird_expiry"
        onChange={handleChange}
      />
    </div>

    <textarea
      className="full-width"
      name="description"
      placeholder="Description"
      onChange={handleChange}
    />

  </div>

  <button type="submit">
    Publish Event
  </button>

</form>

      </div>

    </div>
  );
}

export default CreateEvent;