import React from "react";
import { Link } from "react-router-dom";
import "./PlantCard.css";

export default function PlantCard({ plant, onAddToCart, inCart }) {
  return (
    <div className="plant-card">
      <div className="plant-info">
        <h3 className="plant-name">{plant.name}</h3>
        <p className="plant-description">{plant.description}</p>
        <p className="plant-price">${plant.price.toFixed(2)}</p>

        <div className="plant-actions">
          <button
            className={`add-to-cart ${inCart ? "remove" : ""}`}
            onClick={() => onAddToCart(plant)}
          >
            {inCart ? "Remove from Cart" : "Add to Cart"}
          </button>
          <Link to={`/plants/${plant.id}`} className="view-details">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
