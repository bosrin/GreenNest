import React from "react";
import "./Home.css";
import PlantCard from "../../components/PlantCard/PlantCard";
import plants from "../../data/plants";


export default function Home() {
  const trending = [...plants]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  const categories = [...new Set(plants.map((p) => p.category))];

  function handleAddToCart(plant) {
    alert(`${plant.name} added to cart!`);
  }

  return (
    <div className="home-container">
      {/* 🌿 Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-content">
            <h1>Welcome to GreenNest 🌿</h1>
            <p>Transform your space with lush greenery and nature’s calm beauty.</p>
            <button className="shop-btn">Shop Now</button>
          </div>
        </div>
      
      </section>

      {/*  Trending Section */}
      <section className="trending">
  <h2>Trending Plants</h2>
  <p className="section-subtitle">Top picks loved by our customers</p>

  <div className="trending-grid">
    {trending.slice(0, 2).map((plant) => (
      <PlantCard
        key={plant.id}
        plant={plant}
        onAddToCart={handleAddToCart}
      />
    ))}
  </div>
</section>


    {/* 🪴 Categories Preview */}
<section className="categories">
  <h2>Explore by Category</h2>
  <p className="section-subtitle">Find your perfect plant</p>
  <div className="categories-grid">
    {[
      {
        name: "Indoor",
        img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Outdoor",
        img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Succulent",
        img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Flowering",
        img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
      },
      {
  name: "Herbs",
  img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
},
{
  name: "Ferns",
  img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
},

    ].map((cat, idx) => (
      <div key={idx} className="category-card">
        <img src={cat.img} alt={cat.name} />
        <h3>{cat.name}</h3>
        <p>{plants.filter((p) => p.category === cat.name).length} plants</p>
        <button className="shop-btn small-btn">Shop {cat.name}</button>
      </div>
    ))}
  </div>
</section>


      {/* 🎁 Offers Section */}
      <section className="offers">
        <h2>Special Offers 🎉</h2>
        <div className="offer-card">
          <img
            src="https://images.unsplash.com/photo-1617196039980-7d2b2c526b95?auto=format&fit=crop&w=800&q=80"
            alt="Special offer plants"
          />
          <p>🌿 Buy 2 Indoor Plants & Get 1 Free!</p>
          <p>✨ Free delivery on orders over $50</p>
          <button className="shop-btn">Grab Offer</button>
        </div>
      </section>

      {/* 🌱 Why Choose Us */}
      <section className="why-us">
        <h2>Why GreenNest?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Premium Quality</h3>
            <p>Only the healthiest and most beautiful plants reach your home.</p>
          </div>
          <div className="feature">
            <h3>Eco-Friendly</h3>
            <p>Our packaging and operations are sustainable and plant-friendly.</p>
          </div>
          <div className="feature">
            <h3>Customer Love</h3>
            <p>Thousands of happy customers and glowing reviews.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
