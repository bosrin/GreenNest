import React, { useState } from "react";
import "./Cart.css";

export default function Cart({ cart = [], onRemoveFromCart }) {
  const [orderPlaced, setOrderPlaced] = useState(false); // Track order status
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // ✅ Load previous orders
    const savedOrders = JSON.parse(localStorage.getItem("greennest_orders")) || [];

    // ✅ Create new order object
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: 1,
        price: item.price,
      })),
      total,
      status: "Pending",
      address: "Not provided",
      payment: "Cash on Delivery",
    };

    // ✅ Save updated orders list
    const updatedOrders = [...savedOrders, newOrder];
    localStorage.setItem("greennest_orders", JSON.stringify(updatedOrders));

    // ✅ Clear cart
    localStorage.removeItem("greennest_cart");

    // ✅ Show order done message instead of redirecting
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
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>৳{item.price.toFixed(2)}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveFromCart(item)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ৳{total.toFixed(2)}</h3>
            <button className="order-btn" onClick={handleOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
