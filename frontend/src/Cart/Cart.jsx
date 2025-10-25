import React, { useState } from "react";
import "./Cart.css";

export default function Cart({ cart = [], onRemoveFromCart, onClearCart }) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem("greennest_orders")) || [];

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: 1,
        price: item.price
      })),
      total,
      status: "Pending",
      address: "Not provided",
      payment: "Cash on Delivery",
    };

    localStorage.setItem("greennest_orders", JSON.stringify([...savedOrders, newOrder]));

    // Clear cart in localStorage and in App state
    localStorage.removeItem("greennest_cart");
    if (onClearCart) onClearCart();

    setOrderPlaced(true);
  };

  return (
    <div className="cart-container">
      <h1 className="page-title">🛒 Your Cart</h1>

      {orderPlaced ? (
        <p className="order-done">✅ Order Done! Thank you for shopping.</p>
      ) : cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>৳{item.price.toFixed(2)}</p>
                </div>
                <button className="remove-btn" onClick={() => onRemoveFromCart(item)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ৳{total.toFixed(2)}</h3>
            <button className="order-btn" onClick={handleOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}
