import React from "react";
import "./about.css"; 

export default function About() {
  return (
    <section className="about">
      <h2>About GreenNest</h2>
      <p>
        At GreenNest, we believe that plants do more than just decorate a space—they transform it. Our mission is to connect people with the calming beauty of nature, helping you create serene and vibrant environments at home, in your office, or anywhere life takes you.
      </p>
      <p>
        Founded by a team of passionate horticulturists and design enthusiasts, GreenNest combines expert knowledge with a love for greenery. Each plant in our collection—whether lush indoor foliage, hardy outdoor plants, flowering beauties, or charming succulents—is handpicked for quality, health, and aesthetics.
      </p>
      <p>
        We offer exclusive collections, seasonal recommendations, and personalized guidance to help you choose the right plants for your space. Sustainability is at the heart of everything we do—from eco-friendly packaging to responsible sourcing—so you can enjoy nature guilt-free.
      </p>
      <p>
        Thousands of happy customers trust GreenNest to bring life, color, and calm into their spaces. Join our community of plant lovers, and discover how even a small pot of greenery can inspire joy, focus, and wellness in everyday life.
      </p>

      <div className="about-highlights">
        <div className="highlight">
          <h3>Expert Guidance</h3>
          <p>Tips, care instructions, and plant support whenever you need it.</p>
        </div>
        <div className="highlight">
          <h3>Exclusive Collections</h3>
          <p>Handpicked varieties and seasonal special editions just for you.</p>
        </div>
        <div className="highlight">
          <h3>Eco-Friendly Promise</h3>
          <p>Sustainable sourcing, eco-conscious packaging, and plant-friendly practices.</p>
        </div>
      </div>

      <button className="shop-btn">Explore Our Plants</button>
    </section>
  );
}
