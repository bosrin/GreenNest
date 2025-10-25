import React, { useState } from "react";
import "./contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // success message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission
    setTimeout(() => {
      setStatus("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    }, 500); // simulate network delay
  };

  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <p>
        Have questions, suggestions, or just want to say hello? We’d love to hear from you!
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <button type="submit" className="shop-btn">Send Message</button>
      </form>

      {status && <p className="form-status">{status}</p>}
    </section>
  );
}
