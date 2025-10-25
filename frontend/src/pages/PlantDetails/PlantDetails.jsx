import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import plants from "../../data/plants";
import "./PlantDetails.css";

export default function PlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDone, setOrderDone] = useState(false); // Track order status
  const [cartSuccess, setCartSuccess] = useState(false); // Track add to cart success

  const plant = plants.find((p) => p.id === id);

  if (!plant) {
    return (
      <main className="plant-details-container">
        <h1>Plant not found</h1>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </main>
    );
  }

  // ✅ Add to Cart
  function handleAddToCart() {
    const savedCart = JSON.parse(localStorage.getItem("greennest_cart")) || [];

    const existingItem = savedCart.find((item) => item.id === plant.id);
    if (existingItem) {
      setCartSuccess(true); // Already in cart
      setTimeout(() => setCartSuccess(false), 2000);
      return;
    }

    const updatedCart = [...savedCart, plant];
    localStorage.setItem("greennest_cart", JSON.stringify(updatedCart));

    // ✅ Show success message
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 2000); // Hide after 2s
  }

  // ✅ Order Now → Save to localStorage and show "Order Done"
  function handleOrderNow() {
    const savedOrders = JSON.parse(localStorage.getItem("greennest_orders")) || [];

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: "Pending",
      items: [
        {
          id: plant.id,
          name: plant.name,
          quantity: 1,
          price: plant.price,
        },
      ],
      total: plant.price,
    };

    const updatedOrders = [...savedOrders, newOrder];
    localStorage.setItem("greennest_orders", JSON.stringify(updatedOrders));

    setOrderDone(true);
  }

  return (
    <main className="plant-details-container">
      <div className="plant-details-card">
        <div className="plant-info">
          <h1>{plant.name}</h1>
          <p className="plant-desc">{plant.description}</p>
          <p><strong>Price:</strong> ${plant.price}</p>
          <p><strong>Category:</strong> {plant.category}</p>
          <p><strong>Stock:</strong> {plant.stock}</p>

          {orderDone ? (
            <p className="order-done">✅ Order Done! Thank you for your purchase.</p>
          ) : (
            <div className="button-group">
              <button className="add-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="order-btn" onClick={handleOrderNow}>
                Order Now
              </button>
              <button className="back-btn" onClick={() => navigate(-1)}>
                Go Back
              </button>
            </div>
          )}

          {cartSuccess && !orderDone && (
            <p className="cart-success">✅ Added to cart successfully!</p>
          )}
        </div>
      </div>
    </main>
  );
}
