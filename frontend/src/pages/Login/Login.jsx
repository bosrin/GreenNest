import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ setUser }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name || !phone || !password) {
      alert("Please fill in all fields (name, phone, and password)!");
      return;
    }

    // Restrict admin login to only BosrinRabeya
    if (role === "admin" && name !== "BosrinRabeya") {
      alert("Access denied! Only can login as admin.");
      return;
    }

    const newUser = { name, phone, password, role, loggedIn: true };
    localStorage.setItem("greennest_user", JSON.stringify(newUser));
    setUser(newUser);
    navigate("/plants"); // redirect after login
  };

  return (
    <div className="login-container">
      <h2>Welcome to GreenNest 🌿</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role selection */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
