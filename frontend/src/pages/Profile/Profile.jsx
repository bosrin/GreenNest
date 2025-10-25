import React, { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("greennest_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedOrders = localStorage.getItem("greennest_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("greennest_user");
    window.location.href = "/";
  };

  //  Profile picture upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setUser({ ...user, photo: reader.result });
        localStorage.setItem(
          "greennest_user",
          JSON.stringify({ ...user, photo: reader.result })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  //  Save profile edits
  const handleSave = () => {
    localStorage.setItem("greennest_user", JSON.stringify(user));
    setEditMode(false);
  };

  //  Change password
  const handleChangePassword = () => {
    const newPass = prompt("Enter your new password:");
    if (newPass) {
      setUser({ ...user, password: newPass });
      localStorage.setItem(
        "greennest_user",
        JSON.stringify({ ...user, password: newPass })
      );
      alert("✅ Password updated successfully!");
    }
  };

  if (!user) {
    return <p className="profile-message">Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-card">
        {/*  Profile Picture */}
        <div className="profile-image">
          <img
            src={preview || user.photo || "https://via.placeholder.com/100"}
            alt="Profile"
          />
          <label htmlFor="upload-photo" className="upload-btn">📷 Change</label>
          <input
            type="file"
            id="upload-photo"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        {/*  Info Section */}
        <div className="profile-info">
          {editMode ? (
            <>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Your Name"
              />
              <input
                type="text"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                placeholder="Phone Number"
              />
              <input
                type="email"
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email Address"
              />
              <button className="save-btn" onClick={handleSave}> Save</button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>✖ Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Email:</strong> {user.email || "Not added"}</p>

              <div className="profile-actions">
                <button className="edit-btn" onClick={() => setEditMode(true)}>🖊️ Edit Profile</button>
                <button className="password-btn" onClick={handleChangePassword}>🔐 Change Password</button>
                <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/*  Orders Section */}
      <div className="orders-section">
        <h3>My Orders</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul>
            {orders.map((order, idx) => (
              <li key={idx}>
                <span>{order.name}</span> - <span>{order.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
