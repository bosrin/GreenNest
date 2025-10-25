import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import AllPlants from "./pages/AllPlants/AllPlants";
import PlantDetails from "./pages/PlantDetails/PlantDetails";
import About from "./about/about";
import Contact from "./Contact/Contact";
import Cart from "./Cart/Cart";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Orders/Orders";
import AddPlant from "./pages/Admin/AddPlant/AddPlant";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();

  //  Auto login check
  useEffect(() => {
    const savedUser = localStorage.getItem("greennest_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  //  Handle Cart Click
  const handleCart = () => {
    if (!user) return navigate("/login");
    navigate("/cart");
  };

  //  Add / Remove from Cart
  const handleAddRemoveCart = (plant) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === plant.id);
      if (exists) return prev.filter((p) => p.id !== plant.id);
      return [...prev, plant];
    });
  };

  //  Logout
  const handleLogout = () => {
    localStorage.removeItem("greennest_user");
    setUser(null);
    navigate("/");
  };

  //  Protected Route Wrapper
  const ProtectedRoute = ({ element, role }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (role === "admin" && user.role !== "admin") {
      alert("Access denied. Admins only.");
      return <Navigate to="/" replace />;
    }
    return element;
  };

  //  Handle nav link clicks (lock others if not logged in)
  const handleNavClick = (e, path) => {
    e.preventDefault();
    setMenuOpen(false);
    if (!user && path !== "/") navigate("/login");
    else navigate(path);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo-text">
            <b>GreenNest</b>
          </div>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fa-solid fa-bars"></i>
          </div>

          {/* Navbar Links */}
          <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/" onClick={(e) => handleNavClick(e, "/")}>Home</Link>
            <Link to="/plants" onClick={(e) => handleNavClick(e, "/plants")}>All Plants</Link>
            <Link to="/about" onClick={(e) => handleNavClick(e, "/about")}>About</Link>
            <Link to="/contact" onClick={(e) => handleNavClick(e, "/contact")}>Contact</Link>
          </nav>

          <div className="nav-icons">
            {/* Cart */}
            <div className="cart-icon" title="Cart" onClick={handleCart}>
              <i className="fa-solid fa-bag-shopping"></i>
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </div>

            {/* Profile Menu */}
            <div className="profile-menu" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <i className="fa-regular fa-user"></i>
              {showProfileMenu && (
                <div className="dropdown">
                  {user ? (
                    <>
                      <p className="user-info">{user.name}</p>
                      <Link to="/profile">My Profile</Link>
                      <Link to="/orders">My Orders</Link>
                      {user.role === "admin" && <Link to="/addplant">Admin Panel</Link>}
                      <hr />
                      <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <div className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️" : "🌙"}
            </div>
          </div>
        </div>
      </header>

      {/* Routes */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/plants"
            element={<ProtectedRoute element={<AllPlants cart={cart} onAddRemoveCart={handleAddRemoveCart} />} />}
          />
          <Route
            path="/plants/:id"
            element={<ProtectedRoute element={<PlantDetails />} />}
          />
          <Route
            path="/about"
            element={<ProtectedRoute element={<About />} />}
          />
          <Route
            path="/contact"
            element={<ProtectedRoute element={<Contact />} />}
          />
          <Route
            path="/cart"
            element={<ProtectedRoute element={<Cart cart={cart} onRemoveFromCart={handleAddRemoveCart} />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/orders"
            element={<ProtectedRoute element={<Orders />} />}
          />
          <Route
            path="/addplant"
            element={<ProtectedRoute role="admin" element={<AddPlant />} />}
          />
        </Routes>
      </main>
    </div>
  );
}
