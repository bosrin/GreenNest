import React, { useState, useEffect } from "react";
import "./Orders.css";

export default function Profile() {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem("greennest_orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Cancel order
  const handleCancel = (id) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status: "Cancelled" } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("greennest_orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="orders-list">
          {orders.map(order => (
            <li key={order.id} className="order-card">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </p>

              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.quantity} - ${item.price}
                  </li>
                ))}
              </ul>

              <p><strong>Total:</strong> ${order.total}</p>

              {order.status === "Pending" && (
                <button className="cancel-btn" onClick={() => handleCancel(order.id)}>
                  Cancel Order
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
