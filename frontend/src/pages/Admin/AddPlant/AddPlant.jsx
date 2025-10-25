import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddPlant.css";

export default function AddPlant() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const [plants, setPlants] = useState([]);
  const [editId, setEditId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("add"); // add | view | edit | delete | orders

  // 🔹 Fetch all plants
  useEffect(() => {
    fetchPlants();
  }, []);

  async function fetchPlants() {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/plants");
      setPlants(res.data);
    } catch (err) {
      console.error("Failed to fetch plants", err);
    }
  }

  // 🔹 Fetch all orders
  async function fetchOrders() {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  }

  // 🔹 Handle form input
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // 🔹 Add or Update Plant
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editId) {
        const res = await axios.put(
          `http://localhost:5000/api/admin/update-plant/${editId}`,
          formData
        );
        alert(res.data.message);
        setEditId(null);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/admin/add-plant",
          formData
        );
        alert(res.data.message);
      }
      setFormData({ name: "", price: "", category: "", stock: "" });
      fetchPlants();
    } catch (err) {
      alert("Failed to save plant");
      console.error(err);
    }
  }

  // 🔹 Edit a plant
  function handleEdit(plant) {
    setEditId(plant._id);
    setFormData({
      name: plant.name,
      price: plant.price,
      category: plant.category,
      stock: plant.stock,
    });
    setActiveTab("add");
  }

  // 🔹 Delete a plant
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this plant?")) return;
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/delete-plant/${id}`
      );
      alert(res.data.message);
      fetchPlants();
    } catch (err) {
      alert("Failed to delete plant");
      console.error(err);
    }
  }

  return (
    <div className="add-plant-container">
      {/*  Admin Action Tabs */}
      <div className="admin-actions">
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
           Add 
        </button>

        <button
          className={activeTab === "view" ? "active" : ""}
          onClick={() => setActiveTab("view")}
        >
           View
        </button>

        <button
          className={activeTab === "edit" ? "active" : ""}
          onClick={() => setActiveTab("edit")}
        >
           Edit
        </button>

        <button
          className={activeTab === "delete" ? "active" : ""}
          onClick={() => setActiveTab("delete")}
        >
           Delete
        </button>

        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => {
            setActiveTab("orders");
            fetchOrders();
          }}
        >
           Orders
        </button>
      </div>

      {/*  Add / Update Form */}
      {activeTab === "add" && (
        <div>
          <h2>{editId ? " Update Plant" : " Add New Plant"}</h2>
          <form className="add-plant-form" onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Flowering">Flowering</option>
            </select>

            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />

            <button type="submit">
              {editId ? "Update Plant" : "Add Plant"}
            </button>
          </form>
        </div>
      )}

      {/*  View Plants */}
      {activeTab === "view" && (
        <div className="plant-list">
          <h2> All Plants</h2>
          {plants.length === 0 ? (
            <p>No plants found.</p>
          ) : (
            <table className="plant-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((plant) => (
                  <tr key={plant._id}>
                    <td>{plant.name}</td>
                    <td>${plant.price}</td>
                    <td>{plant.category}</td>
                    <td>{plant.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/*  Edit Plants */}
      {activeTab === "edit" && (
        <div className="plant-list">
          <h2> Edit Plants</h2>
          {plants.length === 0 ? (
            <p>No plants found.</p>
          ) : (
            <table className="plant-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((plant) => (
                  <tr key={plant._id}>
                    <td>{plant.name}</td>
                    <td>${plant.price}</td>
                    <td>{plant.category}</td>
                    <td>{plant.stock}</td>
                    <td>
                      <button onClick={() => handleEdit(plant)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/*  Delete Plants */}
      {activeTab === "delete" && (
        <div className="plant-list">
          <h2> Delete Plants</h2>
          {plants.length === 0 ? (
            <p>No plants found.</p>
          ) : (
            <table className="plant-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((plant) => (
                  <tr key={plant._id}>
                    <td>{plant.name}</td>
                    <td>${plant.price}</td>
                    <td>{plant.category}</td>
                    <td>{plant.stock}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(plant._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ✅ View Orders */}
      {activeTab === "orders" && (
        <div className="orders-list">
          <h2> All Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{new Date(order.date).toLocaleString()}</td>
                    <td>
                      {order.items.map((i, idx) => (
                        <div key={idx}>
                          {i.name} × {i.qty} (${i.price})
                        </div>
                      ))}
                    </td>
                    <td>${order.total}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
